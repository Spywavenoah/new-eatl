"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setState("ok");
      setMsg(data.message);
      setEmail("");
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your work email"
        className="field flex-1 !border-white/20 !bg-white/10 text-white placeholder:text-white/50"
      />
      <button type="submit" disabled={state === "loading"} className="btn btn-red disabled:opacity-60">
        {state === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {msg && (
        <p className={`basis-full text-xs ${state === "ok" ? "text-brand-gold" : "text-red-300"}`}>{msg}</p>
      )}
    </form>
  );
}
