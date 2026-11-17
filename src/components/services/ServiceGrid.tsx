"use client";

import { serviceDetails } from "@/lib/services-detail";
import { useServiceModal } from "./ServiceModalProvider";
import { ArrowRight, SearchIcon } from "@/components/ui/Icons";
import { useMemo, useState } from "react";

/**
 * Service listing for an SBU.
 * Intentionally image-free: title + short description + "Read more".
 * Photography lives only inside the modal carousel.
 */
export default function ServiceGrid({ slug }: { slug: string }) {
  const { openService } = useServiceModal();
  const [query, setQuery] = useState("");
  const details = serviceDetails[slug] ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return details;
    return details.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.capabilities.some((c) => c.toLowerCase().includes(q)),
    );
  }, [details, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold sm:text-2xl">Services include</h3>
          <p className="mt-1 text-sm text-muted">
            {details.length} services · tap <span className="font-semibold text-brand-green">Read more</span> for the full explanation and photo gallery.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" width={17} height={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services…"
            aria-label="Search services"
            className="field !py-2.5 !pl-10 text-sm"
          />
        </div>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {filtered.map((d, i) => (
          <li key={d.name}>
            <article className="group flex h-full flex-col rounded-xl border border-line bg-white p-4 transition-all duration-300 hover:border-brand-green hover:shadow-lift sm:p-5">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand-green-light font-heading text-[11px] font-bold text-brand-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="min-w-0 font-heading text-[15px] font-bold leading-snug text-ink group-hover:text-brand-green sm:text-base">
                  {d.name}
                </h4>
              </div>
              <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted sm:text-sm">{d.summary}</p>
              <button
                onClick={() => openService(slug, d.name)}
                aria-label={`Read more about ${d.name}`}
                className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md py-1 text-[11px] font-bold uppercase tracking-wider text-brand-red transition-colors hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                Read more <ArrowRight width={13} height={13} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-6 rounded-xl bg-surface p-5 text-sm text-muted">No services match “{query}”. Try a different term.</p>
      )}
    </div>
  );
}

/** Compact trigger used on the home page SBU cards, lab pages and sidebars. */
export function ServiceModalButton({
  slug,
  service,
  label,
  variant = "link",
  className = "",
}: {
  slug: string;
  service?: string;
  label: string;
  variant?: "link" | "button" | "chip";
  className?: string;
}) {
  const { openSbu, openService } = useServiceModal();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (service) openService(slug, service);
    else openSbu(slug);
  };

  if (variant === "chip") {
    return (
      <button
        onClick={onClick}
        className={`rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink/80 transition-colors hover:border-brand-green hover:bg-brand-green-light hover:text-brand-green ${className}`}
      >
        {label}
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button onClick={onClick} className={`btn btn-outline-green ${className}`}>
        {label}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 text-sm font-bold text-brand-green transition-colors hover:text-brand-red ${className}`}>
      {label} <ArrowRight width={16} height={16} />
    </button>
  );
}
