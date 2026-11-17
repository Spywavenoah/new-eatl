"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/Icons";

const initial = { fullName: "", email: "", phone: "", subject: "", category: "enquiry", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const set = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setState("ok");
      setForm(initial);
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-2xl border border-brand-green/20 bg-brand-green-light p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-green text-white"><CheckIcon width={28} height={28} /></div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-brand-green">Message sent</h3>
        <p className="mt-2 text-muted">Thank you for reaching out. One of our experts will contact you shortly.</p>
        <button onClick={() => setState("idle")} className="btn btn-outline-green mt-6">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="label">Full name *</label><input className="field" required value={form.fullName} onChange={set("fullName")} /></div>
        <div><label className="label">Mobile</label><input className="field" value={form.phone} onChange={set("phone")} placeholder="+234…" /></div>
        <div><label className="label">Email address *</label><input type="email" className="field" required value={form.email} onChange={set("email")} /></div>
        <div>
          <label className="label">Category</label>
          <select className="field" value={form.category} onChange={set("category")}>
            <option value="enquiry">Service enquiry</option>
            <option value="quote">Request for quote</option>
            <option value="calibration">Calibration / certificate</option>
            <option value="oem">OEM product enquiry</option>
            <option value="vendor">Vendor registration</option>
            <option value="complaint">Feedback / complaint</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div><label className="label">Subject *</label><input className="field" required value={form.subject} onChange={set("subject")} /></div>
      <div><label className="label">Message *</label><textarea className="field min-h-36" required minLength={10} value={form.message} onChange={set("message")} /></div>
      {msg && <p className="rounded-lg bg-brand-red-light px-4 py-3 text-sm text-brand-red">{msg}</p>}
      <button type="submit" disabled={state === "loading"} className="btn btn-green justify-self-start disabled:opacity-60">
        {state === "loading" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
