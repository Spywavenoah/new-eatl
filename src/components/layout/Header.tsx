"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, services, labs, partners } from "@/lib/content";
import { ArrowRight, ChevronDown, LinkedInIcon, MailIcon, MenuIcon, PhoneIcon, PinIcon, ShieldIcon, XIcon, XSocialIcon } from "@/components/ui/Icons";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
  mega?: boolean;
};

const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "SBUs",
    mega: true,
    children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}`, desc: s.tagline })),
  },
  {
    label: "Our Labs",
    children: labs.map((l) => ({ label: l.name, href: `/labs/${l.slug}`, desc: l.badge })),
  },
  {
    label: "OEM Products",
    mega: true,
    children: partners.map((p) => ({ label: p.name, href: `/oem-products#${p.slug}`, desc: p.type })),
  },
  { label: "Blog", href: "/blog" },
  {
    label: "About",
    children: [
      { label: "Our Profile", href: "/about" },
      { label: "News & Updates", href: "/news" },
      { label: "FAQ", href: "/faq" },
      { label: "Calibration T&C", href: "/calibration-terms" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar — brand red #ae2832 */}
      <div className={`bg-brand-red text-white transition-all duration-300 ${scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-12 opacity-100"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-1.5 lg:flex">
              <PinIcon width={14} height={14} className="text-white/80" />
              Lagos · Port Harcourt · Eket · Houston
            </span>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-brand-gold hover:underline">
              <MailIcon width={14} height={14} className="text-white/80" />
              {company.email}
            </a>
            <a href={company.phoneHref} className="hidden items-center gap-1.5 hover:text-brand-gold hover:underline sm:flex">
              <PhoneIcon width={14} height={14} className="text-white/80" />
              {company.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Follow us:</span>
            <a href={company.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-brand-gold hover:underline"><LinkedInIcon width={15} height={15} /></a>
            <a href={company.x} target="_blank" rel="noreferrer" aria-label="X" className="hover:text-brand-gold hover:underline"><XSocialIcon width={14} height={14} /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`border-b border-line bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-soft" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 sm:gap-6 sm:px-6">
          <Link href="/" className="flex min-w-0 shrink items-center py-2.5 sm:py-3" aria-label="EATL home">
            <Image src="/images/logo.png" alt="Engineering Automation Technology Limited" width={1004} height={124} priority className="h-6 w-auto sm:h-8 lg:h-10" />
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-6 text-[15px] font-semibold transition-colors hover:text-brand-red ${pathname === item.href ? "text-brand-green" : "text-ink"}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 px-4 py-6 text-[15px] font-semibold text-ink transition-colors group-hover:text-brand-red">
                    {item.label}
                    <ChevronDown width={14} height={14} className="transition-transform group-hover:rotate-180" />
                  </button>
                )}
                {item.children && (
                  <div
                    className={`invisible absolute top-full z-50 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                      item.mega ? "left-1/2 w-[640px] -translate-x-1/2" : "left-0 w-72"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lift">
                      <div className="h-1 bg-brand-red" />
                      <div className={item.mega ? "grid grid-cols-2 gap-1 p-3" : "p-2"}>
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="group/i block rounded-lg px-4 py-3 transition-colors hover:bg-brand-green-light"
                          >
                            <span className="block text-sm font-semibold text-ink group-hover/i:text-brand-green">{c.label}</span>
                            {c.desc && <span className="block text-xs text-muted">{c.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Desktop-only actions */}
            <Link href="/verify-certificate" className="hidden items-center gap-2 rounded-md border border-brand-green px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-green transition-colors hover:bg-brand-green hover:text-white xl:flex">
              <ShieldIcon width={16} height={16} /> Verify Certificate
            </Link>
            <Link href="/request-quote" className="btn btn-red hidden lg:inline-flex lg:!px-4 lg:!py-2.5">
              Request Quote
            </Link>
            {/* Mobile: icon-only menu toggle (logo + toggle only) */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-brand-green transition-colors hover:bg-surface active:bg-brand-green-light lg:hidden"
            >
              {open ? <XIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — slides in from the left */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/60 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute left-0 top-0 flex h-full w-[88%] max-w-[22rem] flex-col bg-white shadow-lift transition-transform duration-300 ease-out will-change-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
            <Image src="/images/logo.png" alt="EATL" width={1004} height={124} className="h-7 w-auto" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 items-center gap-1.5 rounded-lg bg-surface px-3 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-brand-red hover:text-white active:bg-brand-red"
            >
              <XIcon width={17} height={17} /> Close
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3" aria-label="Mobile primary">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-line/70 last:border-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3.5 font-semibold transition-colors active:bg-brand-green-light ${
                      pathname === item.href ? "text-brand-green" : "text-ink"
                    }`}
                  >
                    {item.label}
                    <ArrowRight width={15} height={15} className="text-muted" />
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                      aria-expanded={mobileOpen === item.label}
                      className="flex min-h-12 w-full items-center justify-between rounded-lg px-3 py-3.5 text-left font-semibold text-ink transition-colors active:bg-brand-green-light"
                    >
                      {item.label}
                      <ChevronDown
                        width={17}
                        height={17}
                        className={`shrink-0 transition-transform duration-300 ${mobileOpen === item.label ? "rotate-180 text-brand-red" : "text-muted"}`}
                      />
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: mobileOpen === item.label ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="mb-2 ml-3 border-l-2 border-brand-green/30 pl-2">
                          {item.children?.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:text-brand-green active:bg-brand-green-light active:text-brand-green"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            <Link
              href="/verify-certificate"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center gap-2 rounded-lg bg-brand-green-light px-3 py-3 text-sm font-bold text-brand-green active:bg-brand-green active:text-white"
            >
              <ShieldIcon width={17} height={17} /> Verify Certificate
            </Link>

            <div className="mt-4 space-y-2.5 rounded-xl bg-surface p-4">
              <a href={company.phoneHref} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-green"><PhoneIcon width={15} height={15} /></span>
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-green"><MailIcon width={15} height={15} /></span>
                {company.email}
              </a>
              <p className="flex items-start gap-2.5 text-xs text-muted">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-green"><PinIcon width={15} height={15} /></span>
                Lagos · Port Harcourt · Eket · Houston
              </p>
              <div className="flex gap-2 pt-1">
                <a href={company.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-green"><LinkedInIcon width={16} height={16} /></a>
                <a href={company.x} target="_blank" rel="noreferrer" aria-label="X" className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-green"><XSocialIcon width={14} height={14} /></a>
              </div>
            </div>
          </nav>

          <div className="space-y-2 border-t border-line p-4">
            <Link href="/request-quote" onClick={() => setOpen(false)} className="btn btn-red w-full !py-2.5 !text-[11px]">Request Quote</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-outline-green w-full !py-2.5 !text-[11px]">Contact Us</Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
