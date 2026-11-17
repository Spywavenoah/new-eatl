"use client";

import { useState } from "react";
import { serviceAreas } from "@/lib/content";
import { CheckIcon } from "@/components/ui/Icons";

const initial = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  serviceArea: "",
  location: "",
  timeline: "",
  budget: "",
  details: "",
};

export default function QuoteForm({ presetService }: { presetService?: string }) {
  const [form, setForm] = useState({ ...initial, serviceArea: presetService ?? "" });
  const [step, setStep] = useState(1);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const [ref, setRef] = useState("");

  const set = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const step1Valid = form.serviceArea && form.details.trim().length >= 10;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setState("ok");
      setRef(data.reference);
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-2xl border border-brand-green/20 bg-brand-green-light p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-green text-white"><CheckIcon width={32} height={32} /></div>
        <h3 className="mt-5 font-heading text-2xl font-bold text-brand-green">Request received</h3>
        <p className="mt-2 text-muted">Your reference number is <strong className="text-ink">{ref}</strong>. A member of our commercial team will contact you within one business day.</p>
        <button onClick={() => { setForm(initial); setStep(1); setState("idle"); }} className="btn btn-outline-green mt-6">Submit another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-4 shadow-soft sm:p-6 md:p-8">
      {/* Stepper */}
      <ol className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider sm:mb-8 sm:gap-3 sm:text-xs">
        {["Project scope", "Your details"].map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <li key={label} className="flex flex-1 items-center gap-3">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 sm:h-8 sm:w-8 ${active ? "border-brand-red bg-brand-red text-white" : done ? "border-brand-green bg-brand-green text-white" : "border-line text-muted"}`}>
                {done ? <CheckIcon width={14} height={14} /> : n}
              </span>
              <span className={`whitespace-nowrap ${active ? "text-brand-red" : done ? "text-brand-green" : "text-muted"}`}>{label}</span>
              {i === 0 && <span className={`hidden h-0.5 flex-1 sm:block ${done ? "bg-brand-green" : "bg-line"}`} />}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <div className="grid gap-5 animate-fade-up">
          <div>
            <label className="label">Service area *</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {serviceAreas.map((s) => (
                <label key={s} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all ${form.serviceArea === s ? "border-brand-green bg-brand-green-light font-semibold text-brand-green" : "border-line hover:border-brand-green/50"}`}>
                  <input type="radio" name="serviceArea" value={s} checked={form.serviceArea === s} onChange={set("serviceArea")} className="accent-brand-green" />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="label">Project location</label>
              <input className="field" placeholder="e.g. Bonny, Rivers State" value={form.location} onChange={set("location")} />
            </div>
            <div>
              <label className="label">Timeline</label>
              <select className="field" value={form.timeline} onChange={set("timeline")}>
                <option value="">Select…</option>
                <option>Urgent (within 2 weeks)</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>6+ months / planning</option>
              </select>
            </div>
            <div>
              <label className="label">Indicative budget</label>
              <select className="field" value={form.budget} onChange={set("budget")}>
                <option value="">Select…</option>
                <option>Under ₦10m</option>
                <option>₦10m – ₦50m</option>
                <option>₦50m – ₦250m</option>
                <option>Above ₦250m</option>
                <option>USD-denominated</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Project details *</label>
            <textarea className="field min-h-36" placeholder="Describe scope, equipment, quantities, standards, site conditions…" value={form.details} onChange={set("details")} required minLength={10} />
            <p className="mt-1 text-xs text-muted">Minimum 10 characters. Attach drawings later by replying to our acknowledgement email.</p>
          </div>
          <div className="flex justify-end">
            <button type="button" disabled={!step1Valid} onClick={() => setStep(2)} className="btn btn-green disabled:cursor-not-allowed disabled:opacity-50">Continue</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5 animate-fade-up">
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label className="label">Full name *</label><input className="field" required value={form.fullName} onChange={set("fullName")} /></div>
            <div><label className="label">Company</label><input className="field" value={form.company} onChange={set("company")} /></div>
            <div><label className="label">Email *</label><input type="email" className="field" required value={form.email} onChange={set("email")} /></div>
            <div><label className="label">Phone</label><input className="field" value={form.phone} onChange={set("phone")} placeholder="+234…" /></div>
          </div>
          {msg && <p className="rounded-lg bg-brand-red-light px-4 py-3 text-sm text-brand-red">{msg}</p>}
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-muted hover:text-ink">← Back</button>
            <button type="submit" disabled={state === "loading"} className="btn btn-red disabled:opacity-60">{state === "loading" ? "Submitting…" : "Submit Request"}</button>
          </div>
        </div>
      )}
    </form>
  );
}
