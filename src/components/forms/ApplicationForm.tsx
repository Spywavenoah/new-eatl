"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/Icons";

type Job = { id: number; title: string };

export default function ApplicationForm({ jobs, presetJobId }: { jobs: Job[]; presetJobId?: number }) {
  const [form, setForm] = useState({
    jobId: presetJobId ? String(presetJobId) : "",
    fullName: "",
    email: "",
    phone: "",
    position: "",
    yearsExperience: "",
    linkedin: "",
    coverLetter: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setState("ok");
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-2xl border border-brand-green/20 bg-brand-green-light p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-green text-white"><CheckIcon width={28} height={28} /></div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-brand-green">Application submitted</h3>
        <p className="mt-2 text-muted">Thank you for your interest in EATL. Our HR team reviews every application and will reach out if your profile matches.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} id="apply" className="grid gap-5 rounded-2xl border border-line bg-white p-6 shadow-soft md:p-8">
      <h3 className="font-heading text-2xl font-bold">Apply now</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Position</label>
          <select className="field" value={form.jobId} onChange={(e) => {
            const job = jobs.find((j) => String(j.id) === e.target.value);
            setForm((f) => ({ ...f, jobId: e.target.value, position: job ? job.title : f.position }));
          }}>
            <option value="">General application / unsolicited</option>
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        </div>
        {!form.jobId && (
          <div className="sm:col-span-2"><label className="label">Desired role *</label><input className="field" required value={form.position} onChange={set("position")} placeholder="e.g. Calibration Technician" /></div>
        )}
        <div><label className="label">Full name *</label><input className="field" required value={form.fullName} onChange={set("fullName")} /></div>
        <div><label className="label">Email *</label><input type="email" className="field" required value={form.email} onChange={set("email")} /></div>
        <div><label className="label">Phone</label><input className="field" value={form.phone} onChange={set("phone")} /></div>
        <div><label className="label">Years of experience</label><input type="number" min={0} max={60} className="field" value={form.yearsExperience} onChange={set("yearsExperience")} /></div>
        <div className="sm:col-span-2"><label className="label">LinkedIn / portfolio URL</label><input className="field" value={form.linkedin} onChange={set("linkedin")} placeholder="https://" /></div>
        <div className="sm:col-span-2"><label className="label">Cover letter / summary of experience *</label><textarea className="field min-h-36" required minLength={30} value={form.coverLetter} onChange={set("coverLetter")} /></div>
      </div>
      {msg && <p className="rounded-lg bg-brand-red-light px-4 py-3 text-sm text-brand-red">{msg}</p>}
      <button type="submit" disabled={state === "loading"} className="btn btn-red justify-self-start disabled:opacity-60">
        {state === "loading" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
