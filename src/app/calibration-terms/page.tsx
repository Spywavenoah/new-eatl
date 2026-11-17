import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: "Calibration Terms & Conditions",
  description: "Terms and conditions governing calibration and testing services performed by EATL laboratories.",
};

const sections = [
  { h: "1. Scope", p: "These terms apply to all calibration, testing and metering services performed by Engineering Automation Technology Limited (EATL) at its Flow Metering Laboratory and ISO/IEC 17025:2017 accredited Electrical & Instrumentation Laboratory in Eket, Akwa Ibom State, or on client sites." },
  { h: "2. Quotation & Acceptance", p: "Quotations are valid for 30 days unless otherwise stated. A purchase order or signed quotation constitutes acceptance of these terms. Scope changes identified upon receipt of equipment will be communicated and agreed before work proceeds." },
  { h: "3. Equipment Handling", p: "Clients are responsible for safe packaging and delivery of instruments. EATL will inspect equipment on receipt and record any pre-existing damage. Equipment is insured while on EATL premises up to the declared value stated on the job request." },
  { h: "4. Calibration Method & Traceability", p: "Calibrations are performed in accordance with documented procedures using reference standards traceable to national or international standards. Measurement uncertainty is estimated and reported in line with ISO/IEC Guide 98-3 (GUM)." },
  { h: "5. Adjustment & Repair", p: "Unless instructed otherwise, instruments found out of tolerance will be reported 'as found'. Adjustment or repair is performed only with client authorisation and 'as left' data is then recorded. OEM authorised repairs (Megger, Seta, Koehler, Cygnus) are covered by OEM warranty terms." },
  { h: "6. Certificates", p: "A calibration certificate bearing a unique number is issued for each instrument. Certificates may be verified at any time via the Verify Certificate tool on this website. Certificates are not statements of conformity unless explicitly requested and a decision rule agreed in advance." },
  { h: "7. Recalibration Intervals", p: "Recommended recalibration intervals are provided for guidance. The client remains responsible for determining intervals appropriate to the instrument's use, criticality and regulatory requirements." },
  { h: "8. Turnaround & Collection", p: "Standard turnaround is 5–10 working days from receipt. Expedited service is available on request. Equipment not collected within 60 days of notification may attract storage charges." },
  { h: "9. Confidentiality", p: "All client information and results are treated as confidential in accordance with ISO/IEC 17025 clause 4.2 and are released only to the client or as required by law." },
  { h: "10. Complaints & Appeals", p: "Complaints regarding laboratory activities may be submitted via the Contact page. Each complaint is logged, investigated and responded to within 10 working days under our ISO 9001 complaint-handling procedure." },
  { h: "11. Liability", p: "EATL's liability for any claim arising from calibration services is limited to the value of the service provided. EATL is not liable for consequential losses arising from the use of calibrated equipment." },
  { h: "12. Governing Law", p: "These terms are governed by the laws of the Federal Republic of Nigeria." },
];

export default function TermsPage() {
  return (
    <>
      <PageHero title="Calibration Terms & Conditions" subtitle="Terms governing testing, calibration and metering services performed by EATL laboratories." crumbs={[{ label: "Calibration T&C" }]} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <nav className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Contents</p>
            <ul className="mt-3 space-y-2 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.h}><a href={`#s${i + 1}`} className="-ml-px block border-l-2 border-transparent pl-4 text-sm text-muted transition-colors hover:border-brand-red hover:text-ink">{s.h}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-10">
            <p className="rounded-2xl bg-surface p-6 text-sm text-muted">Last revised: January 2026 · Document ref: EATL-LAB-TC-04. For queries contact <a href="mailto:enquiries@eatlng.com" className="font-semibold text-brand-green">enquiries@eatlng.com</a>.</p>
            {sections.map((s, i) => (
              <article key={s.h} id={`s${i + 1}`} className="scroll-mt-28">
                <h2 className="font-heading text-2xl font-bold text-brand-green">{s.h}</h2>
                <p className="mt-3 leading-relaxed text-ink/85">{s.p}</p>
              </article>
            ))}
            <div className="flex flex-wrap gap-3 border-t border-line pt-8">
              <Link href="/verify-certificate" className="btn btn-green">Verify a certificate</Link>
              <Link href="/request-quote?service=Flow%20Meter%20Calibration" className="btn btn-outline-green">Request calibration quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
