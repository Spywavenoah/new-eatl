"use client";

import { useState } from "react";
import { CheckIcon, SearchIcon, ShieldIcon, XIcon } from "@/components/ui/Icons";

type Cert = {
  certificateNo: string;
  clientName: string;
  instrument: string;
  serialNo: string;
  laboratory: string;
  calibrationDate: string;
  dueDate: string;
  technician: string;
  status: "valid" | "expired" | "revoked";
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function VerifyCertificate({ samples }: { samples: string[] }) {
  const [no, setNo] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "found" | "missing" | "err">("idle");
  const [cert, setCert] = useState<Cert | null>(null);
  const [err, setErr] = useState("");

  async function lookup(value: string) {
    const v = value.trim();
    if (!v) return;
    setState("loading");
    setCert(null);
    try {
      const res = await fetch(`/api/certificates/verify?no=${encodeURIComponent(v)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.found) {
        setCert(data.certificate);
        setState("found");
      } else setState("missing");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Verification failed");
      setState("err");
    }
  }

  const badge = {
    valid: { label: "Valid", cls: "bg-brand-green text-white", icon: <CheckIcon width={16} height={16} /> },
    expired: { label: "Expired — recalibration due", cls: "bg-brand-gold text-ink", icon: <ShieldIcon width={16} height={16} /> },
    revoked: { label: "Revoked", cls: "bg-brand-red text-white", icon: <XIcon width={16} height={16} /> },
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(no);
        }}
        className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 shadow-lift sm:flex-row"
      >
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width={20} height={20} />
          <input
            value={no}
            onChange={(e) => setNo(e.target.value.toUpperCase())}
            placeholder="Enter certificate number, e.g. EATL/CAL/2026/00123"
            className="field !py-4 !pl-12 font-mono text-sm uppercase"
            aria-label="Certificate number"
            required
          />
        </div>
        <button type="submit" disabled={state === "loading"} className="btn btn-green !py-4 disabled:opacity-60">
          {state === "loading" ? "Verifying…" : "Verify"}
        </button>
      </form>

      <p className="mt-3 text-xs text-muted">
        Try a sample:{" "}
        {samples.map((s) => (
          <button key={s} type="button" onClick={() => { setNo(s); lookup(s); }} className="mr-2 font-mono text-brand-green underline-offset-2 hover:underline">{s}</button>
        ))}
      </p>

      <div className="mt-8">
        {state === "found" && cert && (
          <div className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <div className={`flex items-center justify-between gap-4 px-6 py-4 ${badge[cert.status].cls}`}>
              <div className="flex items-center gap-2 font-bold">{badge[cert.status].icon} Certificate {badge[cert.status].label}</div>
              <span className="font-mono text-xs opacity-90">{cert.certificateNo}</span>
            </div>
            <dl className="grid gap-px bg-line sm:grid-cols-2">
              {[
                ["Client", cert.clientName],
                ["Instrument", cert.instrument],
                ["Serial number", cert.serialNo],
                ["Laboratory", cert.laboratory],
                ["Calibration date", fmt(cert.calibrationDate)],
                ["Recalibration due", fmt(cert.dueDate)],
                ["Authorised by", cert.technician],
                ["Issued by", "Engineering Automation Technology Limited"],
              ].map(([k, v]) => (
                <div key={k} className="bg-white px-6 py-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {state === "missing" && (
          <div className="animate-fade-up rounded-2xl border border-brand-red/30 bg-brand-red-light p-6">
            <p className="flex items-center gap-2 font-heading text-xl font-bold text-brand-red"><XIcon /> No record found</p>
            <p className="mt-2 text-sm text-ink/80">We could not find a certificate with number <span className="font-mono font-bold">{no}</span>. Check the number printed on your certificate and try again. If the problem persists, email <a href="mailto:enquiries@eatlng.com" className="font-semibold text-brand-green">enquiries@eatlng.com</a> with a scan of the certificate.</p>
          </div>
        )}
        {state === "err" && <p className="rounded-xl bg-brand-red-light px-4 py-3 text-sm text-brand-red">{err}</p>}
      </div>
    </div>
  );
}
