import Link from "next/link";
import Image from "next/image";
import { company, services, offices, labs } from "@/lib/content";
import { LinkedInIcon, MailIcon, PhoneIcon, PinIcon, XSocialIcon } from "@/components/ui/Icons";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  return (
    <footer className="relative bg-brand-green-dark text-white/80">
      <div className="pattern-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6">
        {/* Newsletter band */}
        <div className="mb-14 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-[1.2fr_1fr] md:items-center md:p-8">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">Stay updated on EATL projects & capabilities</h3>
            <p className="mt-1 text-sm text-white/70">Quarterly updates on facilities, certifications, OEM partnerships and HSE milestones. No spam.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="inline-block rounded-lg bg-white px-3 py-2">
              <Image src="/images/logo.png" alt="EATL" width={1004} height={124} className="h-8 w-auto" />
            </div>
            <p className="mt-5 text-sm leading-relaxed">
              We deliver specialised services in Engineering, Construction & Maintenance, Instrumentation & Control, Testing & Metering and Asset Integrity Management. We are also proud distributors of Wrapmaster composite repair systems and authorised Emerson, Cygnus and Megger service partners.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5"><PhoneIcon width={16} height={16} className="text-brand-gold" /><a href={company.phoneHref} className="hover:text-white">{company.phone}</a></li>
              <li className="flex items-center gap-2.5"><MailIcon width={16} height={16} className="text-brand-gold" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
              <li className="flex items-start gap-2.5"><PinIcon width={16} height={16} className="mt-0.5 shrink-0 text-brand-gold" /><span>Where we are: Lagos | Port Harcourt | Akwa Ibom | Houston</span></li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a href={company.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-md bg-white/10 transition-colors hover:bg-brand-red hover:text-white"><LinkedInIcon width={18} height={18} /></a>
              <a href={company.x} target="_blank" rel="noreferrer" aria-label="X" className="grid h-10 w-10 place-items-center rounded-md bg-white/10 transition-colors hover:bg-brand-red hover:text-white"><XSocialIcon width={16} height={16} /></a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="footer-title mb-5 font-heading text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["About Us", "/about"],
                ["Blog & Insights", "/blog"],
                ["News & Updates", "/news"],
                ["FAQ's", "/faq"],
                ["Calibration T&C", "/calibration-terms"],
                ["Verify Certificate", "/verify-certificate"],
                ["Request Quote", "/request-quote"],
                ["Careers", "/careers"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <li key={h}><Link href={h} className="transition-colors hover:text-brand-gold">› {l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 font-heading text-lg font-bold text-white">Strategic Business Units</h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="transition-colors hover:text-brand-gold">› {s.name}</Link></li>
              ))}
              {labs.map((l) => (
                <li key={l.slug}><Link href={`/labs/${l.slug}`} className="transition-colors hover:text-brand-gold">› {l.name.replace("Multifaceted ", "")}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 font-heading text-lg font-bold text-white">Our Offices</h4>
            <ul className="space-y-4 text-sm">
              {offices.map((o) => (
                <li key={o.name}>
                  <span className="block font-semibold text-white">{o.name}</span>
                  <span className="block text-white/60">{o.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Engineering Automation Technology Limited (EATL). All rights reserved. RC 2007.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>ISO 9001:2015</span><span>ISO 45001:2018</span><span>ISO 14001:2015</span><span>ISO/IEC 17025:2017</span><span>NCDMB Project 100</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
