import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight } from "@/components/ui/Icons";
import { news } from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news from Engineering Automation Technology Limited — facilities, certifications, HSE milestones and partnerships.",
};

export default function NewsPage() {
  const [lead, ...rest] = news;
  return (
    <>
      <PageHero title="News & Updates" subtitle="Facilities, certifications, HSE milestones and partnerships." crumbs={[{ label: "News" }]} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <a href={lead.href} target="_blank" rel="noreferrer" className="group grid overflow-hidden rounded-3xl bg-brand-green-dark text-white lg:grid-cols-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/eatl/gmc.png" alt="" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-full" />
            <div className="p-8 lg:p-12">
              <span className="rounded-md bg-brand-red px-2.5 py-1 text-xs font-bold">{lead.tag}</span>
              <time className="ml-3 text-xs text-white/60">{new Date(lead.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight group-hover:text-brand-gold">{lead.title}</h2>
              <p className="mt-4 text-white/80">{lead.excerpt}</p>
              <p className="mt-4 text-sm text-white/70">The facility, located at EATL&apos;s operational headquarters in Eket, Akwa Ibom State, uses the gravimetric method — the primary reference standard for liquid flow — to calibrate custody-transfer and allocation meters in-country. Previously, operators shipped meters overseas, incurring months of downtime and significant foreign-exchange costs.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-brand-gold">Read the full story <ArrowRight width={16} height={16} /></span>
            </div>
          </a>
        </Reveal>
        <div className="mt-16">
          <SectionHeading eyebrow="More updates" title="Recent announcements" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((n, i) => (
              <Reveal key={n.slug} delay={i * 80}>
                <a href={n.href} className="group flex h-full flex-col rounded-2xl border border-line p-7 transition-all hover:-translate-y-1 hover:border-brand-green hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-brand-red-light px-2.5 py-1 text-xs font-bold text-brand-red">{n.tag}</span>
                    <time className="text-xs text-muted">{new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold leading-snug group-hover:text-brand-green">{n.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted">{n.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-red">Read more <ArrowRight width={14} height={14} /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
