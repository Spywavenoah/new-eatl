import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, CheckIcon } from "@/components/ui/Icons";
import { partners } from "@/lib/content";
import { partnerLogos } from "@/lib/partner-media";

export const metadata: Metadata = {
  title: "OEM Products & Partners — Emerson, Wrapmaster, Cygnus, Megger, LenelS2",
  description: "EATL is an authorised distributor and in-country service centre for leading OEMs including Emerson, Wrapmaster, Cygnus Instruments, Megger and LenelS2.",
};

export default function OemPage() {
  return (
    <>
      <PageHero title="OEM Products & Partners" subtitle="Authorised distribution, installation, repair and calibration for world-leading original equipment manufacturers." crumbs={[{ label: "OEM Products" }]} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading eyebrow="Partner Catalogue" title="High-quality OEM products with local support" text="In-country authorised service centres mean faster turnaround, warranty-backed repairs and genuine spares — without the overseas shipping delays." />

        {/* Jump nav */}
        <div className="sticky top-[64px] z-20 -mx-4 mt-10 overflow-x-auto border-y border-line bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-3">
          <div className="flex gap-2">
            {partners.map((p) => (
              <a key={p.slug} href={`#${p.slug}`} className="shrink-0 rounded-full border border-line px-4 py-1.5 text-xs font-bold transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white">{p.name}</a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {partners.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <article id={p.slug} className="group flex h-full scroll-mt-40 flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-brand-green">{p.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-red">{p.type}</p>
                  </div>
                  {partnerLogos[p.slug] ? (
                    <span className="grid h-14 w-24 shrink-0 place-items-center rounded-xl border border-line bg-white p-2">
                      <Image src={partnerLogos[p.slug]} alt={`${p.name} logo`} width={200} height={90} className="max-h-10 w-auto object-contain" />
                    </span>
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-green-light font-heading text-xl font-bold text-brand-green">{p.name.slice(0, 1)}</span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.desc}</p>
                <ul className="mt-5 grid flex-1 gap-2 sm:grid-cols-2">
                  {p.products.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm"><CheckIcon width={14} height={14} className="mt-1 shrink-0 text-brand-green" />{x}</li>
                  ))}
                </ul>
                <Link href={`/request-quote?service=${encodeURIComponent("OEM Products (Emerson, Wrapmaster, Cygnus, Megger…)")}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green group-hover:text-brand-red">Enquire about {p.name} <ArrowRight width={14} height={14} /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Product Focus" title="Wrapmaster composite repair systems" text="PermaWrap™, PermaSeal™, PermaSleevz™, WeldWrap™, PermaTuffCote™ and PermaGlass™ — supplied and applied by EATL's trained technicians." />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              ["PermaWrapTM.png", "PermaWrap™"],
              ["PermaSealTM.png", "PermaSeal™"],
              ["PermaSleevzTM.png", "PermaSleevz™"],
              ["WeldWrapTM.png", "WeldWrap™"],
              ["PermaTuffCoteTM.png", "PermaTuffCote™"],
              ["permaglasstm.png", "PermaGlass™"],
            ].map(([file, label]) => (
              <div key={file} className="group rounded-2xl border border-line bg-white p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/products/${file}`} alt={label} className="mx-auto h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <p className="mt-3 font-heading text-sm font-bold text-brand-green">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/products/Energy_emerson.jpg" alt="Emerson" className="h-16 w-16 object-contain" />
              <div><p className="font-heading font-bold">Emerson Process Measurement</p><p className="text-xs text-muted">Flow measurement, LACT units and DeltaV automation</p></div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/products/Delta_v.png" alt="Emerson DeltaV" className="h-16 w-auto object-contain" />
              <div><p className="font-heading font-bold">Emerson DeltaV DCS</p><p className="text-xs text-muted">Configuration, migration and commissioning support</p></div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Need genuine OEM products or authorised repairs?" text="Tell us the model, quantity and application — we'll confirm availability, lead time and in-country support options." service="OEM Products (Emerson, Wrapmaster, Cygnus, Megger…)" />
    </>
  );
}
