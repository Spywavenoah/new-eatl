"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";
import { ArrowRight, QuoteIcon } from "@/components/ui/Icons";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lift md:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <QuoteIcon className="absolute -right-4 -top-4 text-brand-green/10" width={180} height={180} />
      <div className="relative" key={i}>
        <QuoteIcon className="text-brand-red" width={40} height={40} />
        <blockquote className="mt-5 font-heading text-lg leading-relaxed text-ink md:text-2xl animate-fade-up">
          “{t.quote}”
        </blockquote>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-green font-heading text-xl font-bold text-white">
              {t.author.slice(0, 1)}
            </div>
            <div>
              <p className="font-heading text-lg font-bold">{t.author}</p>
              <p className="text-sm text-muted">{t.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white"><ArrowRight className="rotate-180" width={18} height={18} /></button>
            <button onClick={() => setI((i + 1) % testimonials.length)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white"><ArrowRight width={18} height={18} /></button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-2">
        {testimonials.map((_, n) => (
          <button key={n} aria-label={`Testimonial ${n + 1}`} onClick={() => setI(n)} className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-brand-red" : "w-2 bg-line hover:bg-brand-green/40"}`} />
        ))}
      </div>
    </div>
  );
}
