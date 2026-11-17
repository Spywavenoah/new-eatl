import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { PageHero, SectionHeading } from "@/components/sections/Shared";
import { LinkedInIcon, MailIcon, PhoneIcon, PinIcon, XSocialIcon } from "@/components/ui/Icons";
import { company, offices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us — Lagos, Port Harcourt, Eket, Houston",
  description: "Contact Engineering Automation Technology Limited. Offices in Lekki Lagos, Port Harcourt, Eket (Operational HQ) and Houston, Texas.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Interested in learning more about our services or wish to lodge feedback? We'd love to hear from you." crumbs={[{ label: "Contact" }]} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading eyebrow="Our Offices" title="Four locations, one point of contact" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {offices.map((o, i) => (
            <Reveal key={o.name} delay={i * 70}>
              <div className="group h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-green hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green-light text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white"><PinIcon /></span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-red">{o.city}</p>
                <h3 className="font-heading text-xl font-bold">{o.name}</h3>
                <p className="mt-2 text-sm text-muted">{o.address}</p>
                {o.phone && <a href={o.phoneHref} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-red"><PhoneIcon width={14} height={14} />{o.phone}</a>}
                <p className="mt-3 border-t border-line pt-3 text-xs text-muted">{o.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Request for Service / Feedback" title="Send us a message" text="Please fill out the form and one of our experts will contact you shortly. For urgent field support, call our operational headquarters directly." />
            <div className="mt-8 space-y-4">
              <a href={company.phoneHref} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-soft transition-colors hover:text-brand-green">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-red text-white"><PhoneIcon /></span>
                <div><p className="text-xs text-muted">Call us</p><p className="font-semibold">{company.phone}</p></div>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-soft transition-colors hover:text-brand-green">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-green text-white"><MailIcon /></span>
                <div><p className="text-xs text-muted">Email us</p><p className="font-semibold">{company.email}</p></div>
              </a>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm font-semibold">Follow us:</span>
                <a href={company.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg bg-white shadow-soft hover:text-brand-green"><LinkedInIcon /></a>
                <a href={company.x} target="_blank" rel="noreferrer" aria-label="X" className="grid h-10 w-10 place-items-center rounded-lg bg-white shadow-soft hover:text-brand-green"><XSocialIcon width={18} height={18} /></a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-soft md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-8 grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/eatl/contact.jpg" alt="EATL technicians carrying out piping fit-up and welding on site" className="h-72 w-full object-cover lg:h-full" />
          <div className="flex flex-col justify-center gap-4 bg-brand-green-dark p-8 text-white lg:p-10">
            <span className="eyebrow !text-brand-gold before:!bg-brand-gold">Talk to an engineer</span>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Operational questions? Our technical team responds fast.</h2>
            <p className="text-sm text-white/75">Metering queries, calibration scopes, urgent field support or vendor registration — one message reaches the right desk.</p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+2348103375124" className="btn btn-red">Call Eket HQ</a>
              <a href="mailto:enquiries@eatlng.com" className="btn btn-outline-white">Email enquiries</a>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-line">
          <iframe
            title="EATL Corporate Office — Lekki Phase 1, Lagos"
            src="https://www.google.com/maps?q=Admiralty+Road,+Lekki+Phase+1,+Lagos,+Nigeria&output=embed"
            className="h-[380px] w-full grayscale transition-all hover:grayscale-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
