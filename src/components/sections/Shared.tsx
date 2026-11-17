import Link from "next/link";
import { ArrowRight, PhoneIcon } from "@/components/ui/Icons";
import { company } from "@/lib/content";

export function PageHero({
  title,
  subtitle,
  crumbs,
  image,
}: {
  title: string;
  subtitle?: string;
  crumbs: { label: string; href?: string }[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-green-dark text-white">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      )}
      <div className="pattern-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/90 to-brand-green/70" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 md:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-2.5 inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/75 backdrop-blur-sm sm:text-[11px]"
        >
          <Link href="/" className="transition-colors hover:text-brand-gold">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span className="text-white/40">/</span>
              {c.href ? <Link href={c.href} className="transition-colors hover:text-brand-gold">{c.label}</Link> : <span className="text-brand-gold">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-[2.6rem] lg:text-5xl animate-fade-up">{title}</h1>
        {subtitle && <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-white/80 sm:text-sm md:text-base animate-fade-up" style={{ animationDelay: "120ms" }}>{subtitle}</p>}
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-brand-red" />
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</span>}
      <h2 className={`mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-white/75" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

export function CtaBand({ title, text, service }: { title?: string; text?: string; service?: string }) {
  const href = service ? `/request-quote?service=${encodeURIComponent(service)}` : "/request-quote";
  return (
    <section className="relative overflow-hidden bg-brand-green text-white">
      <div className="pattern-grid absolute inset-0" aria-hidden />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-red/30 blur-3xl" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow !text-brand-gold before:!bg-brand-gold">Get Quote</span>
          <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl">{title ?? "Get a Customized Solution for Your Project Needs"}</h2>
          <p className="mt-3 text-white/80">
            {text ?? "Our team of experienced professionals are ready to assess your unique requirements and provide a tailored quote that aligns with your requirement and budget."}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
          <Link href={href} className="btn btn-red">Request For Quote <ArrowRight width={16} height={16} /></Link>
          <a href={company.phoneHref} className="btn btn-outline-white"><PhoneIcon width={16} height={16} /> {company.phone}</a>
        </div>
      </div>
    </section>
  );
}
