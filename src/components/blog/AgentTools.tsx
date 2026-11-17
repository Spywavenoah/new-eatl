"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/Icons";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
      className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/20 hover:text-white"
    >
      {copied ? <CheckIcon width={11} height={11} /> : null}
      {copied ? "Copied" : label}
    </button>
  );
}

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-ink">
      {title && <p className="border-b border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white/50">{title}</p>}
      <CopyButton text={code} />
      <pre className="overflow-x-auto p-4 text-[11.5px] leading-relaxed text-white/90"><code>{code}</code></pre>
    </div>
  );
}

const sample = (agent: string) =>
  JSON.stringify(
    {
      title: "Gravimetric proving: what changed for Nigerian custody transfer",
      excerpt: "Why in-country primary-standard flow calibration matters for allocation accuracy and audit readiness.",
      content:
        "## Why gravimetric proving matters\n\nCustody-transfer meters are only as good as the standard they are proved against.\n\n- Primary standard: mass, not a reference meter\n- Traceable uncertainty budget\n- Days, not months of downtime\n\n> In-country proving removes the shipping cycle from the calibration loop.",
      category: "Metering & Calibration",
      tags: ["flow metering", "custody transfer", "ISO 17025"],
      author: agent,
      authorType: "ai_agent",
      source: "marblism",
      status: "published",
      coverImage: "/images/eatl/lap.png",
      externalId: `marblism-${Date.now()}`,
    },
    null,
    2,
  );

export function AgentTestPanel({ keyRequired }: { keyRequired: boolean }) {
  const [key, setKey] = useState("");
  const [agent, setAgent] = useState("Marblism Research Agent");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [result, setResult] = useState<string>("");

  async function send() {
    setState("loading");
    setResult("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(key ? { Authorization: `Bearer ${key}` } : {}) },
        body: JSON.stringify({ posts: [JSON.parse(sample(agent))] }),
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      setState(res.ok ? "ok" : "err");
    } catch (e) {
      setResult(e instanceof Error ? e.message : "Request failed");
      setState("err");
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
      <h3 className="font-heading text-lg font-bold">Test the endpoint live</h3>
      <p className="mt-1 text-[13px] text-muted">
        Sends a sample AI-agent post to this site&apos;s own <code className="rounded bg-surface px-1 font-mono text-[11px]">POST /api/posts</code>. Published drafts appear on /blog instantly.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <label className="label">Agent name</label>
          <input className="field !py-2 text-sm" value={agent} onChange={(e) => setAgent(e.target.value)} />
        </div>
        <div>
          <label className="label">Ingest key {keyRequired ? "(required)" : "(optional)"}</label>
          <input className="field !py-2 text-sm" value={key} onChange={(e) => setKey(e.target.value)} placeholder={keyRequired ? "MARBLISM_API_KEY" : "not configured — open mode"} />
        </div>
        <button onClick={send} disabled={state === "loading"} className="btn btn-green !py-2.5 disabled:opacity-60">
          {state === "loading" ? "Sending…" : "Send test post"}
        </button>
      </div>
      {result && (
        <pre className={`mt-4 max-h-56 overflow-auto rounded-xl p-4 text-[11px] leading-relaxed ${state === "ok" ? "bg-brand-green-dark text-white/90" : "bg-brand-red-light text-brand-red"}`}>
          <code>{result}</code></pre>
      )}
    </div>
  );
}
