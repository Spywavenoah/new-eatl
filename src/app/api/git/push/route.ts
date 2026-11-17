import { pushToGithub, parseRepo } from "@/lib/git-push";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const repo = str(body.repo, 300) || "https://github.com/Spywavenoah/new-eatl.git";
    const token = str(body.token, 400);
    const branch = str(body.branch, 80) || "main";

    if (!token) {
      return Response.json({ ok: false, error: "A GitHub token is required to push." }, { status: 400 });
    }
    try {
      parseRepo(repo);
    } catch (e) {
      return Response.json({ ok: false, error: e instanceof Error ? e.message : "Invalid repository." }, { status: 400 });
    }

    const result = await pushToGithub({
      repo,
      branch,
      token,
      authorName: str(body.authorName, 120) || "EATL Build",
      authorEmail: str(body.authorEmail, 160) || "builds@eatlng.com",
      message: str(body.message, 300) || `Option B build — ${new Date().toISOString()}`,
      force: body.force === true,
      sourceDir: process.cwd(),
    });

    return Response.json(result, { status: result.ok ? 200 : 502 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Push failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
