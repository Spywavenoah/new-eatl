import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, ShieldIcon } from "@/components/ui/Icons";
import { ServiceModalButton } from "@/components/services/ServiceGrid";
import { serviceDetails } from "@/lib/services-detail";
import { labs } from "@/lib/content";

export function generateStaticParams() {
  return labs.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = labs.find((x) => x.slug === slug);
  if (!l) return {};
  return { title: l.name, description: l.intro };
}

const steps = [
  { t: "Request & scope", d: "Share meter type, size, fluid, flow range and required uncertainty. We confirm scope and schedule." },
  { t: "Receive & inspect", d: "Equipment is logged, visually inspected and conditioned in our temperature-controlled lab." },
  { t: "Calibrate", d: "Multi-point calibration against gravimetric / reference standards with traceable uncertainty budgets." },
  { t: "Certify & verify", d: "Digital certificate issued with a unique number — verifiable online 24/7." },
];

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = labs.find((x) => x.slug === slug);
  if (!l) notFound();
  const other = labs.find((x) => x.slug !== slug)!;

  return (
    <>
      <PageHero title={l.name} subtitle={l.badge} crumbs={[{ label: "Our Labs" }, { label: l.name }]} image={l.image} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-red-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-red"><ShieldIcon width={14} height={14} /> {l.badge}</span>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">About our {l.name.replace("Multifaceted ", "").toLowerCase()} services</h2>
            <p className="mt-5 text-muted md:text-lg">{l.intro}</p>
            <h3 className="mt-8 font-heading text-xl font-bold">Services include:</h3>
            <ul className="check-list mt-4 space-y-3">
              {l.services.map((s) => <li key={s} className="text-[15px] text-ink/85">{s}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/request-quote?service=${encodeURIComponent(slug === "flow-metering-lab" ? "Flow Meter Calibration" : "Electrical & Instrumentation Calibration")}`} className="btn btn-red">Get Quote <ArrowRight width={16} height={16} /></Link>
              <Link href="/verify-certificate" className="btn btn-outline-green">Verify a Certificate</Link>
            </div>
            <div className="mt-10 rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Related services — tap for photos & detail</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(serviceDetails["testing-and-calibration"] ?? [])
                  .filter((d) =>
                    slug === "flow-metering-lab"
                      ? /Flow Meter|Metering|Instrumentation System|Technical Personnel/i.test(d.name)
                      : /17025|OEM Authorised|Instrumentation System|Calibration/i.test(d.name),
                  )
                  .map((d) => (
                    <ServiceModalButton key={d.name} slug="testing-and-calibration" service={d.name} label={d.name} variant="chip" className="!bg-white" />
                  ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt={l.name} className="h-[420px] w-full object-cover lg:h-[520px]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specs */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="At a glance" title="Laboratory capabilities" />
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {l.specs.map((s) => (
              <div key={s.k} className="bg-white p-6">
                <dt className="text-xs font-bold uppercase tracking-wider text-muted">{s.k}</dt>
                <dd className="mt-1 font-heading text-lg font-bold text-brand-green">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading align="center" eyebrow="How it works" title="From request to verified certificate" />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 90}>
              <div className="relative h-full rounded-2xl border border-line p-6 pt-10">
                <span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full bg-brand-red font-heading text-lg font-bold text-white shadow-lift">{i + 1}</span>
                <p className="font-heading text-lg font-bold">{s.t}</p>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBand title="Get a Customized Solution for Your Project Needs" text="For industry-compliant measurement solutions with guaranteed accuracy, contact our metering specialists today." service={slug === "flow-metering-lab" ? "Flow Meter Calibration" : "Electrical & Instrumentation Calibration"} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Link href={`/labs/${other.slug}`} className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-line p-6 transition-colors hover:border-brand-green sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Also see</p>
            <p className="font-heading text-xl font-bold group-hover:text-brand-green">{other.name}</p>
          </div>
          <span className="btn btn-outline-green">View lab <ArrowRight width={16} height={16} /></span>
        </Link>
      </section>
    </>
  );
}
