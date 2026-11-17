import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Tabs from "@/components/ui/Tabs";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, AwardIcon, CheckIcon, PhoneIcon, PinIcon, ShieldIcon } from "@/components/ui/Icons";
import { certifications, company, coreValues, leadership, memberships, milestones, offices, partners, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Profile — Company Overview, Mission, Vision, Certifications",
  description: "Learn about Engineering Automation Technology Limited: 17+ years of indigenous oil & gas engineering excellence, ISO-certified management systems, NCDMB Project 100 recognition and global OEM partnerships.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Profile"
        subtitle="An indigenous technological engineering company delivering quality oil & gas services since 2007."
        crumbs={[{ label: "About" }, { label: "Our Profile" }]}
        image="/images/eatl/gmc.png"
      />

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading eyebrow="About" title="Engineering Automation Technology Limited" />
            <div className="prose-eatl mt-6 space-y-5 text-[15px] leading-relaxed text-muted md:text-base">
              <p>
                <strong className="text-ink">Engineering Automation Technology Limited (EATL)</strong> is an indigenous oil and gas servicing company incorporated in 2007 under the laws of the Federal Republic of Nigeria. Inspired by her vision and a commitment to corporate governance code and best practices, EATL provides quality services delivered by a team of qualified, certified and experienced professionals. EATL takes full responsibility for the training and continuous development of her personnel to maintain exceptional levels of competence and performance across all operations.
              </p>
              <p>
                EATL is dedicated to customer satisfaction through periodic reviews, innovative technologies and adherence to industry standards, while also meeting statutory and regulatory requirements. EATL is recognised as a <strong className="text-ink">Project 100 member company</strong> by the Nigerian Content Development and Monitoring Board (NCDMB) and a live member of the Oil and Gas Trainers Association of Nigeria (OGTAN), the Institute of Safety Professionals of Nigeria (ISPON), the American Society for Non-Destructive Testing (ASNT) and the Council for the Regulation of Engineering in Nigeria (COREN).
              </p>
              <p>
                EATL has local partnerships and in-country authorised service centres for various Original Equipment Manufacturers (OEMs) across the globe — Emerson FZE, Wrapmaster Global LLC, Cygnus Instruments, Megger Limited, Ocean Pipe, Shandong, LenelS2, Lauris Technology, Imenco Corrosion Technology, Technofink and BlackPearl.
              </p>
              <p>
                EATL&apos;s commitment to quality, health, safety and environmental management is validated by our certifications to ISO 9001:2015, ISO 45001:2018 and ISO 14001:2015 standards. Our Electrical and Instrumentation Laboratory is accredited to ISO/IEC 17025:2017 — General Requirements for the Competence of Testing and Calibration Laboratories — and in 2026 we commissioned <strong className="text-ink">Africa&apos;s first gravimetric flow metering facility</strong> in Eket, Akwa Ibom State.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-quote" className="btn btn-red">Work with us <ArrowRight width={16} height={16} /></Link>
              <a href={company.phoneHref} className="btn btn-outline-green"><PhoneIcon width={16} height={16} /> {company.phone}</a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <Image src="/images/eatl/about.jpg" alt="EATL calibration laboratory — mass work bench" width={1200} height={800} className="h-80 w-full rounded-3xl object-cover lg:h-[440px]" />
              <div className="mt-4 grid grid-cols-2 gap-4">
                {stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line bg-white p-5">
                    <p className="font-heading text-3xl font-bold text-brand-green"><Counter value={s.value} suffix={s.suffix} /></p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision / Values — interactive tabs */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="center" eyebrow="Who We Are" title="Mission, Vision & Core Values" />
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-soft md:p-10">
            <Tabs
              items={[
                {
                  id: "mission",
                  label: "Our Mission",
                  content: (
                    <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
                      <span className="font-heading text-8xl font-bold text-brand-green/15">01</span>
                      <div>
                        <h3 className="font-heading text-2xl font-bold md:text-3xl">To analyse, monitor and improve our clients&apos; present and future needs for high-quality services and products.</h3>
                        <p className="mt-4 text-muted">We embed ourselves in our clients&apos; operations — understanding not just today&apos;s scope but tomorrow&apos;s integrity, metering and automation challenges — and respond with certified people, proven technology and measurable outcomes.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "vision",
                  label: "Our Vision",
                  content: (
                    <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
                      <span className="font-heading text-8xl font-bold text-brand-red/15">02</span>
                      <div>
                        <h3 className="font-heading text-2xl font-bold md:text-3xl">To be a world-class engineering service provider through technical leadership, consistency, integrity and capacity building through a continual improvement approach.</h3>
                        <p className="mt-4 text-muted">Our investments in West Africa&apos;s first gravimetric flow metering facility and an ISO/IEC 17025 accredited laboratory are direct expressions of this vision — building in-country capacity that was previously only available abroad.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "values",
                  label: "Core Values",
                  content: (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {coreValues.map((v, i) => (
                        <div key={v.name} className="group rounded-2xl border border-line p-5 transition-all hover:border-brand-green hover:bg-brand-green-light">
                          <span className="font-heading text-sm font-bold text-brand-red">0{i + 1}</span>
                          <p className="mt-1 font-heading text-xl font-bold group-hover:text-brand-green">{v.name}</p>
                          <p className="mt-1 text-sm text-muted">{v.desc}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading eyebrow="Our Journey" title="Milestones since 2007" text="From a small indigenous engineering outfit to a multi-SBU company operating Africa's first gravimetric flow metering facility." />
        <ol className="relative mt-12 space-y-10 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-line md:before:left-1/2">
          {milestones.map((m, i) => (
            <Reveal as="li" key={m.year} className={`relative pl-12 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"}`}>
              <span className={`absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border-4 border-white bg-brand-red shadow-lift md:left-auto ${i % 2 === 0 ? "md:-right-4" : "md:-left-4"}`} />
              <div className="rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow hover:shadow-lift">
                <span className="font-heading text-3xl font-bold text-brand-green">{m.year}</span>
                <h3 className="mt-1 font-heading text-xl font-bold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Certifications & memberships */}
      <section className="bg-brand-green-dark py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading light eyebrow="Certifications / Accreditation" title="Certified. Accredited. Audited." text="Our management system conforms to the following standards, verified annually by independent certification bodies." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {certifications.map((c) => (
                  <div key={c.code} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:bg-white/10">
                    <AwardIcon className="text-brand-gold" />
                    <p className="mt-3 font-heading text-xl font-bold">{c.code}</p>
                    <p className="text-sm text-white/80">{c.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading light eyebrow="Memberships & Recognition" title="Industry bodies we belong to" />
              <ul className="mt-8 space-y-3">
                {memberships.map((m) => (
                  <li key={m.abbr} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                    <span className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-white font-heading text-sm font-bold text-brand-green">{m.abbr}</span>
                    <span className="text-sm text-white/85">{m.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28" id="hse">
        <SectionHeading eyebrow="Governance" title="Quality, HSE & Nigerian Content policies" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <AwardIcon />,
              t: "Quality Policy",
              d: "The management and staff of Engineering Automation Technology Ltd are committed to meeting all applicable requirements in the provision of quality Oil and Gas Engineering/Technical Services through the use of certified/qualified personnel, improved processes and periodic review for continual improvement. This policy complies with the requirements of the ISO 9001:2015 QMS Standard.",
            },
            {
              icon: <ShieldIcon />,
              t: "HSE Policy — Goal Zero",
              d: "EATL is committed to maintaining the highest HSE standards across all operations with a goal of ZERO fatality, ZERO lost-time injuries and ZERO impact to the environment. Employees and contractors are empowered to take responsibility for their safety and the safety of those around them through proactive risk management, training, a strong safety culture and provision of resources, in line with ISO 45001:2018 and ISO 14001:2015.",
            },
            {
              icon: <CheckIcon />,
              t: "Nigerian Content Policy",
              d: "As an NCDMB Project 100 company, EATL prioritises Nigerian personnel, local fabrication and in-country facilities — including our flow metering and calibration laboratories — to retain value in Nigeria, reduce capital flight and build sustainable indigenous capacity in line with the NOGICD Act.",
            },
          ].map((p) => (
            <Reveal key={p.t}>
              <div className="h-full rounded-2xl border-l-4 border-brand-red bg-surface p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-green shadow-soft">{p.icon}</span>
                <h3 className="mt-5 font-heading text-xl font-bold">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="center" eyebrow="Leadership" title="Experienced management across every discipline" text="Our leadership team combines decades of IOC, OEM and indigenous service-company experience." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((l, i) => (
              <Reveal key={l.role} delay={i * 60}>
                <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-green font-heading text-lg font-bold text-white">{l.initials}</span>
                  <div>
                    <p className="font-heading text-lg font-bold leading-tight">{l.role}</p>
                    <p className="mt-1 text-sm text-muted">{l.focus}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners + Offices */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Global OEM Partnerships" title="In-country authorised service centres" />
            <div className="mt-8 flex flex-wrap gap-2">
              {partners.map((p) => (
                <Link key={p.slug} href={`/oem-products#${p.slug}`} className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:border-brand-green hover:bg-brand-green-light hover:text-brand-green">{p.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Where We Are" title="Four offices, one standard" />
            <ul className="mt-8 space-y-4">
              {offices.map((o) => (
                <li key={o.name} className="flex gap-4 rounded-xl border border-line p-4">
                  <PinIcon className="mt-0.5 shrink-0 text-brand-red" />
                  <div>
                    <p className="font-heading font-bold">{o.name} <span className="font-normal text-muted">· {o.city}</span></p>
                    <p className="text-sm text-muted">{o.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Field gallery — exact photography from eatlng.com */}
      <section className="bg-brand-green-dark py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading light eyebrow="Field Gallery" title="Our work, in our own workshops and on our clients' facilities" text="Fabrication in Eket, instrumentation on live flow stations, composite repair offshore and calibration in our laboratories." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/images/eatl/engineering.jpg", t: "Design review", d: "Piping, structural and instrumentation interfaces resolved before fabrication" },
              { src: "/images/eatl/ec.jpg", t: "Fabrication workshop", d: "Coded CS/SS welding at our Eket yard" },
              { src: "/images/eatl/ic.jpg", t: "Field instrumentation", d: "Installation and commissioning on a live facility" },
              { src: "/images/eatl/aim.png", t: "Composite repair", d: "Engineered Wrapmaster repair applied offshore" },
              { src: "/images/eatl/contact.jpg", t: "Piping fit-up", d: "Flange and pipe spool installation" },
              { src: "/images/eatl/welding.jpg", t: "Surface preparation", d: "Controlled grinding and coating prep" },
              { src: "/images/eatl/lap.png", t: "Flow metering hall", d: "Gravimetric calibration facility, Eket" },
              { src: "/images/eatl/about.jpg", t: "Calibration laboratory", d: "Mass work bench, ISO/IEC 17025 accredited" },
            ].map((g) => (
              <figure key={g.src + g.t} className="group relative overflow-hidden rounded-2xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.t} loading="lazy" className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/20 to-transparent opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-heading text-base font-bold text-white">{g.t}</p>
                  <p className="text-xs text-white/70">{g.d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
