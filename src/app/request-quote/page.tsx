import type { Metadata } from "next";
import QuoteForm from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/sections/Shared";
import { ClockIcon, MailIcon, PhoneIcon, ShieldIcon } from "@/components/ui/Icons";
import { company, serviceAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request For Quote",
  description: "Get a customised quote for engineering, construction, instrumentation, calibration, asset integrity or OEM products from EATL.",
};

export default async function RequestQuotePage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const preset = service && serviceAreas.includes(service) ? service : undefined;

  return (
    <>
      <PageHero
        title="Request For Quote"
        subtitle="Whether you're looking for precision Engineering, Construction & Maintenance, Instrumentation & Control, Testing & Calibration, Asset Integrity Management or high-quality OEM products — we're here to deliver."
        crumbs={[{ label: "Request Quote" }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <QuoteForm presetService={preset} />
          <aside className="space-y-6">
            <div className="rounded-2xl bg-brand-green p-6 text-white">
              <p className="font-heading text-xl font-bold">What happens next?</p>
              <ol className="mt-4 space-y-3 text-sm text-white/85">
                {["We acknowledge your request with a reference number.", "A commercial engineer reviews scope and may request drawings or data sheets.", "You receive a tailored technical & commercial proposal within 3–5 business days.", "On approval we mobilise from Lagos, Port Harcourt or Eket."].map((t, i) => (
                  <li key={t} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 text-xs font-bold">{i + 1}</span>{t}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <p className="font-heading text-lg font-bold">Prefer to talk?</p>
              <a href={company.phoneHref} className="mt-3 flex items-center gap-3 text-sm font-semibold hover:text-brand-green"><PhoneIcon width={18} height={18} className="text-brand-red" />{company.phone}</a>
              <a href={`mailto:${company.email}`} className="mt-2 flex items-center gap-3 text-sm font-semibold hover:text-brand-green"><MailIcon width={18} height={18} className="text-brand-red" />{company.email}</a>
              <p className="mt-3 flex items-center gap-3 text-sm text-muted"><ClockIcon width={18} height={18} className="text-brand-red" />Mon – Fri, 8:00 – 17:00 WAT</p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-surface p-5 text-sm text-muted">
              <ShieldIcon className="shrink-0 text-brand-green" />
              <p>Your information is handled under our ISO 9001 document-control procedures and is never shared with third parties.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
