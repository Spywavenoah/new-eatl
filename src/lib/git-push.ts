import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const run = promisify(execFile);

export type PushLog = { step: string; ok: boolean; detail: string };
export type PushResult = { ok: boolean; branch: string; repo: string; commit?: string; files: number; logs: PushLog[]; error?: string };

const EXCLUDED = new Set([".git", "node_modules", ".next", ".env", ".env.local", ".DS_Store", "downloads"]);

export function parseRepo(input: string): { owner: string; name: string; url: string } {
  const cleaned = input.trim().replace(/\.git$/, "").replace(/\/+$/, "");
  const m = cleaned.match(/(?:github\.com[/:])([\w.-]+)\/([\w.-]+)$/i) || cleaned.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (!m) throw new Error("Repository must look like https://github.com/owner/name.git or owner/name");
  return { owner: m[1], name: m[2], url: `https://github.com/${m[1]}/${m[2]}.git` };
}

export function redact(text: string, token: string): string {
  let out = text;
  if (token) out = out.split(token).join("***");
  return out.replace(/https:\/\/[^@\s]+@github\.com/g, "https://***@github.com");
}

async function copyProject(from: string, to: string, logs: PushLog[]) {
  let count = 0;
  await fs.cp(from, to, {
    recursive: true,
    dereference: false,
    filter: (src) => {
      const rel = path.relative(from, src);
      if (!rel) return true;
      const top = rel.split(path.sep)[0];
      if (EXCLUDED.has(top)) return false;
      if (top === "public") {
        const parts = rel.split(path.sep);
        if (parts[1] === "downloads") return false; // do not ship zips into the repo
      }
      if (rel.endsWith(".log") || rel.endsWith(".zip")) return false;
      count++;
      return true;
    },
  });
  logs.push({ step: "Prepare working copy", ok: true, detail: `${count} files staged in a temporary directory (node_modules, .next, .env and downloads excluded)` });
  return count;
}

async function git(cwd: string, args: string[], token: string, logs: PushLog[], step: string) {
  try {
    const { stdout, stderr } = await run("git", args, {
      cwd,
      timeout: 180_000,
      maxBuffer: 20 * 1024 * 1024,
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GIT_ASKPASS: "echo" },
    });
    const detail = redact([stdout, stderr].filter(Boolean).join("\n").trim(), token).slice(-1200);
    logs.push({ step, ok: true, detail: detail || "ok" });
    return detail;
  } catch (err) {
    const e = err as { stdout?: string; stderr?: string; message?: string };
    const detail = redact([e.stdout, e.stderr, e.message].filter(Boolean).join("\n").trim(), token).slice(-1500);
    logs.push({ step, ok: false, detail: detail || "command failed" });
    throw new Error(`${step} failed`);
  }
}

export async function pushToGithub(opts: {
  repo: string;
  branch: string;
  token: string;
  authorName: string;
  authorEmail: string;
  message: string;
  force: boolean;
  sourceDir: string;
}): Promise<PushResult> {
  const logs: PushLog[] = [];
  const target = parseRepo(opts.repo);
  const branch = (opts.branch || "main").replace(/[^\w./-]/g, "") || "main";
  const work = await fs.mkdtemp(path.join(os.tmpdir(), "eatl-push-"));
  let files = 0;

  try {
    files = await copyProject(opts.sourceDir, work, logs);

    await git(work, ["init", "-b", branch], opts.token, logs, "Initialise repository");
    await git(work, ["config", "user.name", opts.authorName || "EATL Build"], opts.token, logs, "Set author");
    await git(work, ["config", "user.email", opts.authorEmail || "builds@eatlng.com"], opts.token, logs, "Set email");
    await git(work, ["add", "-A"], opts.token, logs, "Stage files");
    await git(work, ["commit", "-m", opts.message || "Option B build", "--no-verify"], opts.token, logs, "Commit");

    const authUrl = `https://x-access-token:${encodeURIComponent(opts.token)}@github.com/${target.owner}/${target.name}.git`;
    await git(work, ["remote", "add", "origin", authUrl], opts.token, logs, `Add remote github.com/${target.owner}/${target.name}`);

    // Rebase local commit on top of existing branch history so pushes are fast-forward when possible
    try {
      await git(work, ["fetch", "--depth=1", "origin", branch], opts.token, logs, `Fetch existing ${branch} branch`);
      await git(work, ["reset", "--soft", "FETCH_HEAD"], opts.token, logs, "Rebase onto remote history");
      await git(work, ["commit", "-m", opts.message || "Option B build", "--no-verify", "--allow-empty"], opts.token, logs, "Recommit on remote base");
    } catch {
      logs.push({ step: `Existing ${branch} branch`, ok: true, detail: "No existing branch found — creating it fresh" });
    }

    const pushArgs = ["push", "origin", `HEAD:${branch}`];
    if (opts.force) pushArgs.splice(1, 0, "--force");
    await git(work, pushArgs, opts.token, logs, `Push to origin/${branch}`);

    const commit = await git(work, ["rev-parse", "HEAD"], opts.token, logs, "Resolve commit SHA");

    return { ok: true, branch, repo: target.url, commit: commit.trim().slice(0, 40), files, logs };
  } catch (err) {
    return {
      ok: false,
      branch,
      repo: target.url,
      files,
      logs,
      error: err instanceof Error ? err.message : "Push failed",
    };
  } finally {
    await fs.rm(work, { recursive: true, force: true }).catch(() => undefined);
  }
}
