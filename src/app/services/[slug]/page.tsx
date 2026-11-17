import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, CheckIcon, ServiceIcon } from "@/components/ui/Icons";
import ServiceGrid, { ServiceModalButton } from "@/components/services/ServiceGrid";
import { services, labs } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.name} — ${s.tagline}`, description: s.intro };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== slug);
  const isTesting = slug === "testing-and-calibration";

  return (
    <>
      <PageHero title={s.name} subtitle={s.tagline} crumbs={[{ label: "SBUs" }, { label: s.name }]} image={s.image} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-green text-white"><ServiceIcon name={s.icon} /></span>
                <SectionHeading eyebrow="About" title={`${s.name} SBU`} />
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">{s.intro}</p>
            </Reveal>

            <Reveal className="mt-10">
              <div className="overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.name} className="h-72 w-full object-cover md:h-96" />
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <ServiceGrid slug={s.slug} />
            </Reveal>

            <Reveal className="mt-12">
              <div className="grid gap-5 md:grid-cols-3">
                {s.highlights.map((h, i) => (
                  <div key={h.title} className="rounded-2xl border border-line p-6 transition-all hover:-translate-y-1 hover:border-brand-green hover:shadow-lift">
                    <span className="font-heading text-sm font-bold text-brand-red">0{i + 1}</span>
                    <p className="mt-1 font-heading text-lg font-bold">{h.title}</p>
                    <p className="mt-2 text-sm text-muted">{h.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {isTesting && (
              <Reveal className="mt-12">
                <h3 className="font-heading text-2xl font-bold">Our laboratories</h3>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {labs.map((l) => (
                    <Link key={l.slug} href={`/labs/${l.slug}`} className="group overflow-hidden rounded-2xl border border-line transition-all hover:-translate-y-1 hover:shadow-lift">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.image} alt={l.name} className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="p-5">
                        <span className="rounded-md bg-brand-red-light px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-red">{l.badge}</span>
                        <p className="mt-3 font-heading text-lg font-bold group-hover:text-brand-green">{l.name}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand-green">View lab <ArrowRight width={14} height={14} /></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal className="mt-12">
              <h3 className="font-heading text-2xl font-bold">Sectors served</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.sectors.map((x) => <span key={x} className="rounded-full bg-surface px-4 py-2 text-sm font-semibold">{x}</span>)}
              </div>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-2 shadow-soft">
              <p className="px-4 pb-2 pt-3 text-xs font-bold uppercase tracking-wider text-muted">All Business Units</p>
              <ul>
                {services.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/services/${x.slug}`} className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${x.slug === slug ? "bg-brand-green text-white" : "hover:bg-brand-green-light hover:text-brand-green"}`}>
                      {x.name} <ArrowRight width={14} height={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-brand-red p-6 text-white">
              <div className="pattern-grid absolute inset-0" aria-hidden />
              <div className="relative">
                <p className="font-heading text-2xl font-bold">Need {s.short.toLowerCase()} support?</p>
                <p className="mt-2 text-sm text-white/85">{s.cta}</p>
                <Link href={`/request-quote?service=${encodeURIComponent(s.name)}`} className="btn btn-green mt-5 w-full">Request For Quote</Link>
                <ServiceModalButton slug={s.slug} label="Browse all services" variant="link" className="mt-3 !text-white/90 hover:!text-white" />
              </div>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <p className="font-heading font-bold">Why EATL</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {["ISO 9001 / 45001 / 14001 certified", "NCDMB Project 100 company", "Certified, experienced personnel", "Lagos · PH · Eket · Houston"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckIcon width={14} height={14} className="text-brand-green" />{t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand title={`Get a Customized Solution for Your ${s.short} Needs`} text={s.cta} service={s.name} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">Explore other business units</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((x) => (
            <Link key={x.slug} href={`/services/${x.slug}`} className="group flex items-center gap-3 rounded-xl border border-line p-4 transition-colors hover:border-brand-green">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-green-light text-brand-green group-hover:bg-brand-green group-hover:text-white"><ServiceIcon name={x.icon} className="h-5 w-5" /></span>
              <span className="text-sm font-semibold group-hover:text-brand-green">{x.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
