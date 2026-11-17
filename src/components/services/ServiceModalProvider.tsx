"use client";

import Link from "next/link";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { serviceDetails, type ServiceDetail } from "@/lib/services-detail";
import { services } from "@/lib/content";
import { ArrowRight, CheckIcon, ChevronDown, PhoneIcon, ServiceIcon, XIcon } from "@/components/ui/Icons";

type OpenArgs = { sbu: string; service?: string };

type Ctx = {
  openSbu: (sbuSlug: string) => void;
  openService: (sbuSlug: string, serviceName: string) => void;
};

const ServiceModalContext = createContext<Ctx | null>(null);

export function useServiceModal() {
  const ctx = useContext(ServiceModalContext);
  if (!ctx) throw new Error("useServiceModal must be used inside ServiceModalProvider");
  return ctx;
}

export default function ServiceModalProvider({ children }: { children: ReactNode }) {
  const [sbu, setSbu] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const returnFocus = useRef<Element | null>(null);

  const open = useCallback(({ sbu: s, service }: OpenArgs) => {
    returnFocus.current = document.activeElement;
    setSbu(s);
    setActive(service ?? null);
    setSlide(0);
    setMounted(true);
  }, []);

  const ctx = useMemo<Ctx>(
    () => ({
      openSbu: (s) => open({ sbu: s }),
      openService: (s, service) => open({ sbu: s, service }),
    }),
    [open],
  );

  const close = useCallback(() => {
    setMounted(false);
    window.setTimeout(() => {
      setSbu(null);
      setActive(null);
      (returnFocus.current as HTMLElement | null)?.focus?.();
    }, 200);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, close]);

  const sbuMeta = services.find((s) => s.slug === sbu);
  const details = sbu ? serviceDetails[sbu] ?? [] : [];
  const detail: ServiceDetail | undefined = active ? details.find((d) => d.name === active) : undefined;

  const next = useCallback(
    (dir: number) => {
      if (!detail) return;
      setSlide((s) => (s + dir + detail.gallery.length) % detail.gallery.length);
    },
    [detail],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next(1);
      if (e.key === "ArrowLeft") next(-1);
    };
    if (mounted && detail) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, detail, next]);

  return (
    <ServiceModalContext.Provider value={ctx}>
      {children}
      {mounted && sbuMeta && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center" role="presentation">
          <button aria-label="Close dialog" onClick={close} className="absolute inset-0 cursor-default bg-ink/70 backdrop-blur-sm animate-fade-up" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-dialog-title"
            className="relative flex max-h-[90svh] w-full max-w-3xl animate-fade-up flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:max-h-[84vh] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">
                  {sbuMeta.name} SBU
                </p>
                <h2 id="service-dialog-title" className="line-clamp-2 font-heading text-[15px] font-bold leading-snug sm:truncate sm:text-xl">
                  {detail ? detail.name : "Services under this SBU"}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {detail && (
                  <button onClick={() => setActive(null)} className="hidden items-center gap-1.5 rounded-md border border-line px-3 py-2 text-xs font-bold text-muted transition-colors hover:border-brand-green hover:text-brand-green sm:flex">
                    <ChevronDown width={14} height={14} className="rotate-90" /> All services
                  </button>
                )}
                <button ref={closeRef} onClick={close} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-ink transition-colors hover:bg-brand-red hover:text-white">
                  <XIcon width={18} height={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto overscroll-contain">
              {detail ? (
                <div>
                  {/* Full-width photo slide (photography lives only here) */}
                  <div className="bg-brand-green-dark">
                    <div
                      className="relative w-full overflow-hidden"
                      onTouchStart={(e) => { const t = e.touches[0]; swipe.current = { x: t.clientX, y: t.clientY }; }}
                      onTouchEnd={(e) => {
                        if (!swipe.current) return;
                        const t = e.changedTouches[0];
                        const dx = t.clientX - swipe.current.x;
                        const dy = t.clientY - swipe.current.y;
                        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) next(dx < 0 ? 1 : -1);
                        swipe.current = null;
                      }}
                    >
                      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] sm:max-h-[32vh]">
                        <Image
                          key={detail.gallery[slide].src}
                          src={detail.gallery[slide].src}
                          alt={detail.gallery[slide].caption}
                          fill
                          sizes="(max-width: 1024px) 100vw, 768px"
                          className="animate-fade-up object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent px-4 pb-3 pt-16 sm:px-6 sm:pb-4">
                          <p className="max-w-3xl text-[11px] leading-snug text-white/90 sm:text-sm">{detail.gallery[slide].caption}</p>
                        </div>
                        <span className="absolute right-3 top-3 rounded-full bg-ink/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                          {slide + 1} / {detail.gallery.length}
                        </span>
                        <button
                          onClick={() => next(-1)}
                          aria-label="Previous image"
                          className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink transition-colors hover:bg-brand-red hover:text-white sm:left-4 sm:h-11 sm:w-11"
                        >
                          <ArrowRight className="rotate-180" width={16} height={16} />
                        </button>
                        <button
                          onClick={() => next(1)}
                          aria-label="Next image"
                          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink transition-colors hover:bg-brand-red hover:text-white sm:right-4 sm:h-11 sm:w-11"
                        >
                          <ArrowRight width={16} height={16} />
                        </button>
                      </div>
                      <div className="flex gap-2 px-3 py-2.5 sm:px-4">
                        {detail.gallery.map((im, i) => (
                          <button
                            key={im.src + i}
                            onClick={() => setSlide(i)}
                            aria-label={`View image ${i + 1}`}
                            aria-current={i === slide}
                            className={`relative h-11 flex-1 overflow-hidden rounded-md border-2 transition-all sm:h-14 ${i === slide ? "border-brand-red" : "border-transparent opacity-60 hover:opacity-100"}`}
                          >
                            <Image src={im.src} alt="" fill sizes="200px" className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content sits under the slide */}
                  <div className="px-4 py-4 sm:px-5 sm:py-5">
                    <div className="grid gap-4">
                      <div>
                        <p className="text-[13px] leading-relaxed text-ink/85 sm:text-sm">{detail.summary}</p>
                        <h3 className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-muted sm:text-[11px]">Capabilities</h3>
                        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                          {detail.capabilities.map((c) => (
                            <li key={c} className="flex items-start gap-2 text-[12.5px] leading-snug text-ink/85 sm:text-[13px]">
                              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-green text-white"><CheckIcon width={11} height={11} /></span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <dl className="grid grid-cols-2 gap-2">
                          {detail.meta.map((m) => (
                            <div key={m.label} className="rounded-lg bg-surface px-2.5 py-2">
                              <dt className="text-[9.5px] font-bold uppercase tracking-wider text-muted">{m.label}</dt>
                              <dd className="text-[12px] font-semibold text-brand-green sm:text-[13px]">{m.value}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <Link
                            href={`/request-quote?service=${encodeURIComponent(sbuMeta.name === "Testing & Metering" ? "Flow Meter Calibration" : sbuMeta.name)}`}
                            onClick={close}
                            className="btn btn-red flex-1"
                          >
                            Request this service <ArrowRight width={14} height={14} />
                          </Link>
                          <Link href={`/services/${sbuMeta.slug}`} onClick={close} className="btn btn-outline-green flex-1">
                            Full SBU details
                          </Link>
                        </div>
                        <button onClick={() => setActive(null)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-muted transition-colors hover:text-brand-green">
                          <ChevronDown width={14} height={14} className="rotate-90" /> Back to all {sbuMeta.name} services
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-5">
                  <p className="max-w-2xl text-[13px] leading-relaxed text-muted sm:text-sm">
                    {sbuMeta.intro} Select any service below for a detailed explanation and photographs of the work in progress.
                  </p>
                  {/* Text-only list: photography is reserved for the carousel view */}
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {details.map((d, i) => (
                      <li key={d.name}>
                        <button
                          onClick={() => { setActive(d.name); setSlide(0); }}
                          className="group flex h-full w-full flex-col rounded-lg border border-line p-3 text-left transition-all hover:border-brand-green hover:bg-brand-green-light/40 hover:shadow-lift"
                        >
                          <span className="flex items-start gap-2.5">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-brand-green-light font-heading text-[10px] font-bold text-brand-green">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 text-[13px] font-bold leading-snug group-hover:text-brand-green">{d.name}</span>
                          </span>
                          <span className="mt-1 line-clamp-2 flex-1 text-[11.5px] leading-relaxed text-muted">{d.summary}</span>
                          <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-red">
                            Read more <ArrowRight width={11} height={11} className="transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                    <span className="flex items-center gap-2 text-xs text-muted"><ServiceIcon name={sbuMeta.icon} className="h-4 w-4 text-brand-green" /> {details.length} documented services</span>
                    <a href="tel:+2349010336048" className="ml-auto inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:text-brand-red"><PhoneIcon width={14} height={14} /> +234-901-033-6048</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ServiceModalContext.Provider>
  );
}
