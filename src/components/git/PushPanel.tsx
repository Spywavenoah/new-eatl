"use client";

import { useState } from "react";
import { CheckIcon, XIcon } from "@/components/ui/Icons";

type Log = { step: string; ok: boolean; detail: string };
type Result = { ok: boolean; branch?: string; repo?: string; commit?: string; files?: number; logs?: Log[]; error?: string };

export default function PushPanel({ defaultRepo }: { defaultRepo: string }) {
  const [form, setForm] = useState({
    repo: defaultRepo,
    branch: "main",
    token: "",
    authorName: "Noah Spywave",
    authorEmail: "spywavenoah@users.noreply.github.com",
    message: "feat: Option B build — EATL website (blog + AI agent publishing API)",
    force: false,
  });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function push() {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/git/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setResult(await res.json());
    } catch (err) {
      setResult({ ok: false, error: err instanceof Error ? err.message : "Request failed" });
    } finally {
      setBusy(false);
      setForm((f) => ({ ...f, token: "" })); // never keep the token in memory after a run
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
        <h2 className="font-heading text-xl font-bold">Push this build to GitHub</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          Creates a commit of the current project (excluding <code className="rounded bg-surface px-1 font-mono text-[11px]">node_modules</code>,{" "}
          <code className="rounded bg-surface px-1 font-mono text-[11px]">.next</code>, <code className="rounded bg-surface px-1 font-mono text-[11px]">.env</code> and downloads) and pushes it to the branch you choose.
        </p>

        <div className="mt-4 grid gap-3">
          <div>
            <label className="label">Repository</label>
            <input className="field !py-2 font-mono text-[12.5px]" value={form.repo} onChange={set("repo")} placeholder="https://github.com/owner/repo.git" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Branch</label>
              <input className="field !py-2 font-mono text-[12.5px]" value={form.branch} onChange={set("branch")} />
            </div>
            <div>
              <label className="label">Author name</label>
              <input className="field !py-2 text-[13px]" value={form.authorName} onChange={set("authorName")} />
            </div>
          </div>
          <div>
            <label className="label">Author email</label>
            <input className="field !py-2 text-[13px]" value={form.authorEmail} onChange={set("authorEmail")} />
          </div>
          <div>
            <label className="label">Commit message</label>
            <textarea className="field min-h-16 text-[13px]" value={form.message} onChange={set("message")} />
          </div>
          <div>
            <label className="label">GitHub token <span className="font-normal text-muted">(classic PAT with <code className="font-mono text-[11px]">repo</code> scope, or fine-grained with Contents: write)</span></label>
            <input
              type="password"
              className="field !py-2 font-mono text-[12.5px]"
              value={form.token}
              onChange={set("token")}
              placeholder="ghp_… or github_pat_…"
              autoComplete="off"
            />
            <p className="mt-1 text-[11px] text-muted">Used only for this request, passed to git via a temporary remote, and cleared from the form immediately afterwards. It is never written to the database or returned in logs.</p>
          </div>
          <label className="flex items-start gap-2 text-[12.5px] text-ink/80">
            <input type="checkbox" checked={form.force} onChange={set("force")} className="mt-0.5 accent-brand-red" />
            <span>Force push (overwrite remote history). Use this if the repository already has unrelated commits.</span>
          </label>
          <button onClick={push} disabled={busy || !form.token} className="btn btn-red disabled:cursor-not-allowed disabled:opacity-50">
            {busy ? "Pushing…" : "Push to GitHub"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
        <h3 className="font-heading text-lg font-bold">Result</h3>
        {!result && !busy && <p className="mt-2 text-[13px] text-muted">Run a push to see step-by-step output here.</p>}
        {busy && <p className="mt-2 animate-pulse text-[13px] text-brand-green">Copying files, committing and pushing…</p>}

        {result && (
          <div className="mt-3">
            <div className={`flex items-start gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold ${result.ok ? "bg-brand-green-light text-brand-green" : "bg-brand-red-light text-brand-red"}`}>
              {result.ok ? <CheckIcon width={16} height={16} /> : <XIcon width={16} height={16} />}
              <span>
                {result.ok
                  ? `Pushed ${result.files} files to ${result.repo} (${result.branch}) — commit ${result.commit?.slice(0, 7)}`
                  : result.error || "Push failed"}
              </span>
            </div>
            {result.logs && (
              <ol className="mt-3 space-y-2">
                {result.logs.map((l, i) => (
                  <li key={`${l.step}-${i}`} className="rounded-lg border border-line p-2.5">
                    <p className={`flex items-center gap-1.5 text-[12px] font-bold ${l.ok ? "text-brand-green" : "text-brand-red"}`}>
                      {l.ok ? <CheckIcon width={12} height={12} /> : <XIcon width={12} height={12} />} {l.step}
                    </p>
                    <pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] leading-relaxed text-muted">{l.detail}</pre>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
