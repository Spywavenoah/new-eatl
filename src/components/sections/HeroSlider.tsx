"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/lib/content";
import { ArrowRight } from "@/components/ui/Icons";

const INTERVAL = 8000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const [allowVideo, setAllowVideo] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const [videoReady, setVideoReady] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const slide = heroSlides[index];
  const hasVideo = Boolean(slide.video) && allowVideo && motionOn;

  const go = useCallback((i: number) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
    setTick((t) => t + 1);
  }, []);

  /* Only opt into video on capable connections and when motion is welcome */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = conn?.saveData || /2g/.test(conn?.effectiveType ?? "");
    setAllowVideo(!reduced && !slow);
    setMotionOn(!reduced);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, go, tick]);

  /* Play the active clip, pause and release the others */
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, el]) => {
      if (!el) return;
      if (Number(i) === index && motionOn) void el.play().catch(() => undefined);
      else el.pause();
    });
  }, [index, motionOn, allowVideo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  /* Touch swipe for phones */
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  return (
    <section
      className="relative h-[62svh] min-h-[420px] max-h-[620px] overflow-hidden bg-brand-green-dark text-white sm:h-[68svh] sm:min-h-[480px] sm:max-h-[680px] lg:h-[72svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="EATL capabilities"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {heroSlides.map((s, i) => {
        const active = i === index;
        const showVideo = active && hasVideo && s.video;
        return (
          <div key={s.title} className={`absolute inset-0 transition-opacity duration-1000 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!active}>
            {/* Poster / still from eatlng.com — always present for LCP and fallback */}
            <Image
              src={s.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${active && !showVideo ? "animate-ken-burns" : ""}`}
            />

            {/* Lightweight background footage — mounted only for the active slide */}
            {showVideo && s.video && (
              <video
                key={s.video.src}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady[i] ? "opacity-100" : "opacity-0"}`}
                poster={s.image}
                preload="metadata"
                muted
                loop
                playsInline
                autoPlay
                disablePictureInPicture
                onCanPlay={() => setVideoReady((v) => ({ ...v, [i]: true }))}
                aria-hidden
              >
                <source src={s.video.src} type={s.video.type} />
              </video>
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green-dark/70 to-brand-green-dark/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/85 via-transparent to-transparent" />
          </div>
        );
      })}

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
        <div className="max-w-2xl pb-20 sm:pb-14" key={index}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow !text-brand-gold before:!bg-brand-red animate-fade-up">{slide.eyebrow}</span>
            {hasVideo && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-red" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red" />
                </span>
                Facility footage
              </span>
            )}
          </div>
          <h1 className="mt-3 font-heading text-[1.8rem] font-bold leading-[1.08] sm:mt-4 sm:text-4xl lg:text-5xl xl:text-6xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            {slide.title}
          </h1>
          <p className="mt-3 line-clamp-3 max-w-xl text-[14px] leading-relaxed text-white/85 sm:mt-4 sm:text-base animate-fade-up" style={{ animationDelay: "200ms" }}>
            {slide.text}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Link href={slide.cta.href} className="btn btn-red">{slide.cta.label} <ArrowRight width={16} height={16} /></Link>
            {/* Secondary CTA (option B) is hidden on phones — primary CTA only */}
            <Link href="/request-quote" className="btn btn-outline-white hidden sm:inline-flex">Request a Quote</Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 pb-6 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-2" role="tablist" aria-label="Slides">
              {heroSlides.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                  onClick={() => go(i)}
                  className="relative h-1.5 w-9 overflow-hidden rounded-full bg-white/30 transition-all hover:bg-white/50 sm:w-16"
                >
                  {i === index && (
                    <span
                      key={tick}
                      className="absolute inset-y-0 left-0 bg-brand-red"
                      style={{ animation: paused ? "none" : `progress ${INTERVAL}ms linear forwards`, width: paused ? "100%" : undefined }}
                    />
                  )}
                </button>
              ))}
            </div>
            {allowVideo && (
              <button
                onClick={() => setMotionOn((m) => !m)}
                aria-pressed={!motionOn}
                className="flex items-center gap-1.5 rounded-full border border-white/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/90 transition-colors hover:border-brand-red hover:bg-brand-red"
                title={motionOn ? "Pause background video" : "Play background video"}
              >
                {motionOn ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                )}
                Motion
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => go(index - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition-colors hover:border-brand-red hover:bg-brand-red"><ArrowRight className="rotate-180" width={18} height={18} /></button>
            <button onClick={() => go(index + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition-colors hover:border-brand-red hover:bg-brand-red"><ArrowRight width={18} height={18} /></button>
            <span className="ml-2 hidden font-heading text-sm tabular-nums text-white/70 sm:inline">
              <span className="text-2xl font-bold text-white">{String(index + 1).padStart(2, "0")}</span> / {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes progress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
