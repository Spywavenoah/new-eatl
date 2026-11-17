import type { Metadata } from "next";
import { db } from "@/db";
import { jobOpenings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ensureSeeded } from "@/db/seed-data";
import ApplicationForm from "@/components/forms/ApplicationForm";
import Reveal from "@/components/ui/Reveal";
import { PageHero, SectionHeading } from "@/components/sections/Shared";
import { AwardIcon, ClockIcon, PinIcon, ShieldIcon, UsersIcon } from "@/components/ui/Icons";
import Accordion from "@/components/ui/Accordion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers — Join EATL",
  description: "Build your engineering career with an NCDMB Project 100 company. View open roles in engineering, calibration, instrumentation and HSE.",
};

export default async function CareersPage({ searchParams }: { searchParams: Promise<{ job?: string }> }) {
  const { job } = await searchParams;
  let jobs: (typeof jobOpenings.$inferSelect)[] = [];
  try {
    await ensureSeeded();
    jobs = await db.select().from(jobOpenings).where(eq(jobOpenings.isOpen, true)).orderBy(desc(jobOpenings.postedAt));
  } catch {
    jobs = [];
  }
  const preset = job ? Number(job) : undefined;

  return (
    <>
      <PageHero title="Careers at EATL" subtitle="Grow with an indigenous company that invests in training, certification and first-of-its-kind facilities." crumbs={[{ label: "Careers" }]} image="/images/eatl/ic.jpg" />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading eyebrow="Why EATL" title="A culture of safety, competence and continual improvement" text="EATL takes full responsibility for the training and continuous development of her personnel — because our people are our certification." />
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { i: <AwardIcon />, t: "Sponsored certification", d: "ASNT, OGTAN, ISPON, COREN and OEM factory training." },
            { i: <ShieldIcon />, t: "Goal Zero HSE", d: "Stop-work authority and a genuinely safe workplace." },
            { i: <UsersIcon />, t: "Multidisciplinary teams", d: "Work across engineering, labs, field and automation." },
            { i: <ClockIcon />, t: "Clear progression", d: "Technician → specialist → lead → SBU management." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-line p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green-light text-brand-green">{x.i}</span>
              <p className="mt-4 font-heading text-lg font-bold">{x.t}</p>
              <p className="mt-1 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28" id="openings">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Open Positions" title={`${jobs.length} current opening${jobs.length === 1 ? "" : "s"}`} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {jobs.length === 0 && <p className="rounded-2xl bg-white p-6 text-muted">No open positions right now — submit a general application and we&apos;ll keep your CV on file.</p>}
              {jobs.map((j, i) => (
                <Reveal key={j.id} delay={i * 60}>
                  <details className="group rounded-2xl bg-white shadow-soft open:shadow-lift">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6">
                      <div>
                        <span className="rounded-md bg-brand-red-light px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-red">{j.department}</span>
                        <h3 className="mt-2 font-heading text-xl font-bold group-open:text-brand-green">{j.title}</h3>
                        <p className="mt-1 flex flex-wrap gap-x-4 text-xs text-muted">
                          <span className="inline-flex items-center gap-1"><PinIcon width={12} height={12} />{j.location}</span>
                          <span className="inline-flex items-center gap-1"><ClockIcon width={12} height={12} />{j.type}</span>
                          <span>Posted {new Date(j.postedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface text-brand-green transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-line px-6 pb-6 pt-4 text-sm">
                      <p className="text-ink/85">{j.summary}</p>
                      <p className="mt-4 font-bold">Requirements</p>
                      <ul className="check-list mt-2 space-y-1.5 text-muted">
                        {j.requirements.split("\n").filter(Boolean).map((r) => <li key={r}>{r}</li>)}
                      </ul>
                      <a href={`/careers?job=${j.id}#apply`} className="btn btn-green mt-5">Apply for this role</a>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ApplicationForm jobs={jobs.map((j) => ({ id: j.id, title: j.title }))} presetJobId={preset} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionHeading align="center" eyebrow="Recruitment FAQ" title="Good to know" />
        <div className="mt-8">
          <Accordion
            defaultOpen={null}
            items={[
              { q: "Does EATL charge any recruitment fee?", a: "Never. EATL does not request payment at any stage of recruitment. Report any such request to enquiries@eatlng.com." },
              { q: "Where are roles based?", a: "Most technical roles are based at our Operational HQ in Eket, Akwa Ibom, with project rotations in Port Harcourt and offshore. Commercial roles are in Lekki, Lagos." },
              { q: "Do you take industrial trainees and NYSC members?", a: "Yes — we run structured SIWES/IT and NYSC placements in engineering, laboratory and HSE functions. Use the general application option." },
            ]}
          />
        </div>
      </section>
    </>
  );
}
