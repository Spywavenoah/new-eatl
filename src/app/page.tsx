import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/sections/HeroSlider";
import Testimonials from "@/components/sections/Testimonials";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { CtaBand, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, AwardIcon, CheckIcon, ClockIcon, GlobeIcon, ServiceIcon, ShieldIcon, UsersIcon } from "@/components/ui/Icons";
import { certifications, company, memberships, news, partners, services, stats } from "@/lib/content";
import { serviceDetails, totalServiceCount } from "@/lib/services-detail";
import { ServiceModalButton } from "@/components/services/ServiceGrid";
import { partnerLogos } from "@/lib/partner-media";
import { listPublishedPosts, formatDate } from "@/lib/posts";
import { AgentBadge } from "@/components/blog/BlogExplorer";

export const metadata = {
  title: "Engineering Automation Technology Limited (EATL) — Delivering Excellence in Oil & Gas Services",
};

export default async function HomePage() {
  const latestPosts = (await listPublishedPosts(3)).map((p) => ({
    slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category,
    authorType: p.authorType, coverImage: p.coverImage, readMinutes: p.readMinutes,
    publishedAt: new Date(p.publishedAt).toISOString(),
  }));

  return (
    <>
      <HeroSlider />

      {/* Trust strip */}
      <section className="relative z-10 mt-6 px-4 sm:px-6 lg:-mt-12">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl bg-line shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <ClockIcon />, t: "Since 2007", d: "17+ years of indigenous excellence" },
            { icon: <AwardIcon />, t: "4 ISO Standards", d: "9001 · 45001 · 14001 · 17025" },
            { icon: <ShieldIcon />, t: "NCDMB Project 100", d: "Recognised Nigerian content champion" },
            { icon: <GlobeIcon />, t: "10 OEM Partners", d: "Emerson, Wrapmaster, Cygnus, Megger…" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-4 bg-white px-6 py-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-green-light text-brand-green">{x.icon}</span>
              <div>
                <p className="font-heading text-lg font-bold leading-tight">{x.t}</p>
                <p className="text-xs text-muted">{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <Image src="/images/eatl/gmc.png" alt="EATL gravimetric flow metering facility, Eket" width={1200} height={800} className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-[520px]" />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-brand-red p-6 text-white shadow-lift sm:right-8">
                <p className="font-heading text-5xl font-bold leading-none"><Counter value={17} suffix="+" /></p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider">Years of Quality Service</p>
              </div>
              <div className="absolute -left-4 top-8 hidden rounded-xl border border-line bg-white px-4 py-3 shadow-lift sm:block">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Accredited</p>
                <p className="font-heading font-bold text-brand-green">ISO/IEC 17025:2017</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="About EATL" title="Delivering Excellence in Oil & Gas Services." text={company.summary} />
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Certified, qualified & experienced personnel", "Full lifecycle: design → build → test → sustain", "In-country OEM authorised service centres", "Zero-harm HSE culture across all sites"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-green text-white"><CheckIcon width={12} height={12} /></span>{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/about" className="btn btn-green">Our Company Profile <ArrowRight width={16} height={16} /></Link>
              <div className="flex flex-wrap gap-2">
                {memberships.map((m) => (
                  <span key={m.abbr} title={m.name} className="rounded-md border border-line px-2.5 py-1 text-xs font-bold text-brand-green">{m.abbr}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Strategic Business Units" title="Five integrated SBUs. One accountable partner." text={`From conceptual engineering to calibration certificates, every stage of your asset lifecycle is covered by certified EATL teams. Tap any service chip to open its photo gallery and capability summary — ${totalServiceCount} services documented.`} />
            <Link href="/request-quote" className="btn btn-red hidden shrink-0 sm:inline-flex">Request a Quote</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const items = (serviceDetails[s.slug] ?? []).slice(0, 3);
              return (
                <Reveal key={s.slug} delay={i * 80}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                    <Link href={`/services/${s.slug}`} className="relative block h-52 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/80 to-transparent" />
                      <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-green shadow-lift transition-colors group-hover:bg-brand-red group-hover:text-white"><ServiceIcon name={s.icon} /></span>
                      <span className="absolute bottom-4 right-5 font-heading text-5xl font-bold text-white/20">0{i + 1}</span>
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <Link href={`/services/${s.slug}`} className="font-heading text-xl font-bold hover:text-brand-green">{s.name}</Link>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-red">{s.tagline}</p>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{s.intro}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {items.map((d) => (
                          <ServiceModalButton key={d.name} slug={s.slug} service={d.name} label={d.name.length > 26 ? d.name.slice(0, 26) + "…" : d.name} variant="chip" />
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                        <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-green transition-colors hover:text-brand-red">
                          Explore <ArrowRight width={15} height={15} />
                        </Link>
                        <ServiceModalButton slug={s.slug} label={`All ${(serviceDetails[s.slug] ?? []).length} services`} variant="link" className="!text-xs" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
            <Reveal delay={400}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-brand-green p-7 text-white">
                <div className="pattern-grid absolute inset-0" aria-hidden />
                <div className="relative">
                  <span className="eyebrow !text-brand-gold before:!bg-brand-gold">OEM Products</span>
                  <h3 className="mt-3 font-heading text-2xl font-bold">Authorised distributor & service partner</h3>
                  <p className="mt-3 text-sm text-white/80">High-quality OEM products and in-country support from Wrapmaster, Emerson, Cygnus, Megger, LenelS2 and more.</p>
                </div>
                <div className="relative mt-6 flex flex-wrap gap-2">
                  {partners.slice(0, 5).map((p) => <span key={p.slug} className="rounded-md bg-white/15 px-2.5 py-1 text-xs font-semibold">{p.name}</span>)}
                </div>
                <Link href="/oem-products" className="btn btn-red relative mt-6 self-start">View catalogue</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-brand-green-dark py-16 text-white">
        <div className="pattern-grid absolute inset-0" aria-hidden />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-white md:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flow lab spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Multifaceted Flow Calibration Laboratory</span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">Discover precision you can trust — the first of its kind in West Africa.</h2>
            <p className="mt-5 text-muted md:text-lg">Our state-of-the-art gravimetric flow metering laboratory offers high-precision calibration for oil and gas meters of all types. With advanced technology, expert technicians and fast turnaround, we ensure unmatched accuracy, traceability and reliability — now in-country.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[["Gravimetric", "Primary standard method"], ["All meter types", "Turbine · PD · Coriolis · USM"], ["Days", "Not months — no overseas shipping"]].map(([a, b]) => (
                <div key={a} className="rounded-xl border border-line p-4">
                  <p className="font-heading text-xl font-bold text-brand-green">{a}</p>
                  <p className="text-xs text-muted">{b}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/labs/flow-metering-lab" className="btn btn-green">Explore the Lab <ArrowRight width={16} height={16} /></Link>
              <Link href="/request-quote?service=Flow%20Meter%20Calibration" className="btn btn-outline-green">Get Quote</Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl">
              <Image src="/images/eatl/lap.png" alt="EATL gravimetric flow metering hall" width={1200} height={800} className="h-[420px] w-full object-cover lg:h-[520px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/80 via-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
                <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-red" /><span className="relative inline-flex h-3 w-3 rounded-full bg-brand-red" /></span>
                <p className="text-sm font-semibold text-white">NCDMB-backed facility now operational in Eket, Akwa Ibom</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-surface py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="center" eyebrow="Certifications / Accreditation" title="Our management system conforms to international standards" text="Independent certification and accreditation underpin every service we deliver." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c, i) => (
              <Reveal key={c.code} delay={i * 80}>
                <div className="group h-full rounded-2xl border-t-4 border-brand-red bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green-light text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white"><AwardIcon /></span>
                  <p className="mt-5 font-heading text-2xl font-bold text-brand-green">{c.code}</p>
                  <p className="font-semibold">{c.title}</p>
                  <p className="mt-2 text-sm text-muted">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {/* HSE */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28" id="hse">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="grid grid-cols-3 gap-4">
              {[["0", "Fatalities"], ["0", "Lost Time Injuries"], ["0", "Environmental Impact"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-brand-green p-6 text-center text-white">
                  <p className="font-heading text-5xl font-bold">{n}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-line p-6">
              <div className="flex items-center gap-3"><UsersIcon className="text-brand-red" /><p className="font-heading text-lg font-bold">Empowered workforce</p></div>
              <p className="mt-2 text-sm text-muted">Employees and contractors are empowered to take responsibility for their safety and the safety of those around them — with stop-work authority on every site.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="Safety in Perspective" title="Goal ZERO: Zero fatality, zero lost-time injury, zero environmental impact." text="EATL is committed to maintaining the highest HSE standards across all operations. We achieve this through proactive risk management, training, a strong safety culture and provision of resources. EATL strives to prevent environmental pollution in line with ISO 14001:2015, while ensuring compliance to ISO 45001:2018 with respect to the health of the workforce." />
            <Link href="/about#hse" className="mt-6 inline-flex items-center gap-2 font-bold text-brand-green hover:text-brand-red">Read our HSE & Quality policies <ArrowRight width={16} height={16} /></Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface py-14 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Client Commendations" title="Trusted by IOCs and regulators" text="Our track record on complex turnarounds, fuel-gas piping installations and metering assurance speaks for itself." />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="flex h-16 w-28 items-center justify-center rounded-lg border border-line bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/eatl/client-shell.png" alt="Shell" className="max-h-11 w-auto object-contain" loading="lazy" />
              </span>
              <span className="flex h-16 w-28 items-center justify-center rounded-lg border border-line bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/eatl/client-exon.png" alt="ExxonMobil" className="max-h-11 w-auto object-contain" loading="lazy" />
              </span>
              {["NCDMB", "NNPC", "TotalEnergies", "Seplat"].map((c) => (
                <span key={c} className="rounded-lg border border-line bg-white px-4 py-3 font-heading text-sm font-bold text-ink/70">{c}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}><Testimonials /></Reveal>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="border-y border-line bg-white py-10">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted">OEM Partners & Authorisations</p>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white" />
          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((p, i) => (
              <Link key={`${p.slug}-${i}`} href={`/oem-products#${p.slug}`} className="flex w-56 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-4 transition-colors hover:border-brand-green">
                {partnerLogos[p.slug] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={partnerLogos[p.slug]} alt={`${p.name} logo`} className="h-10 w-auto max-w-[150px] object-contain" loading="lazy" />
                ) : (
                  <span className="font-heading text-lg font-bold text-brand-green">{p.name}</span>
                )}
                <span className="text-center text-[10px] uppercase tracking-wider text-muted">{p.type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="News & Updates" title="Latest from EATL" />
          <Link href="/news" className="inline-flex items-center gap-2 font-bold text-brand-green hover:text-brand-red">All updates <ArrowRight width={16} height={16} /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.slug} delay={i * 80}>
              <a href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-all hover:-translate-y-1 hover:border-brand-green hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-brand-red-light px-2.5 py-1 text-xs font-bold text-brand-red">{n.tag}</span>
                  <time className="text-xs text-muted">{new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold leading-snug group-hover:text-brand-green">{n.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted">{n.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-red">Read more <ArrowRight width={14} height={14} /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* From the blog */}
      {latestPosts.length > 0 && (
        <section className="border-t border-line bg-surface py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Blog & Insights" title="Field notes from our labs and workshops" />
              <div className="flex flex-wrap gap-2">
                <Link href="/blog" className="btn btn-outline-green">All articles <ArrowRight width={15} height={15} /></Link>
                <Link href="/blog/agent-api" className="btn btn-green">Agent API</Link>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:border-brand-green hover:shadow-lift">
                  <Link href={`/blog/${post.slug}`} className="block h-40 overflow-hidden bg-surface">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImage} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-green to-brand-green-dark font-heading text-sm font-bold text-white/90">{post.category}</div>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-brand-red-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">{post.category}</span>
                      <AgentBadge authorType={post.authorType} />
                    </div>
                    <Link href={`/blog/${post.slug}`}><h3 className="mt-2 font-heading text-base font-bold leading-snug group-hover:text-brand-green">{post.title}</h3></Link>
                    <p className="mt-2 line-clamp-2 flex-1 text-[13px] text-muted">{post.excerpt}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-muted">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{post.readMinutes} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
