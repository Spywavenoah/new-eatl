import type { Metadata } from "next";
import { db } from "@/db";
import { certificates } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureSeeded } from "@/db/seed-data";
import VerifyCertificate from "@/components/forms/VerifyCertificate";
import { PageHero, SectionHeading } from "@/components/sections/Shared";
import { ShieldIcon, CheckIcon, SearchIcon } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Calibration Certificate",
  description: "Authenticate an EATL calibration certificate instantly by entering its certificate number.",
};

export default async function VerifyPage() {
  let samples: string[] = [];
  try {
    await ensureSeeded();
    const rows = await db.select({ no: certificates.certificateNo }).from(certificates).orderBy(asc(certificates.id)).limit(3);
    samples = rows.map((r) => r.no);
  } catch {
    samples = [];
  }

  return (
    <>
      <PageHero title="Verify Calibration Certificate" subtitle="Instantly authenticate certificates issued by EATL's ISO/IEC 17025 accredited laboratory and flow metering facility." crumbs={[{ label: "Verify Certificate" }]} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <VerifyCertificate samples={samples} />
      </section>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="center" eyebrow="Why verify?" title="Every EATL certificate is unique, traceable and tamper-evident" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { i: <SearchIcon />, t: "Unique numbering", d: "Each certificate carries a unique number linked to the instrument serial, calibration date and authorising technician." },
              { i: <ShieldIcon />, t: "Traceable results", d: "Measurements are traceable to national and international standards through an unbroken chain of comparisons." },
              { i: <CheckIcon />, t: "Audit ready", d: "Verified records support your ISO 9001, API and regulatory audits — no paperwork chase required." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl bg-white p-7 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green-light text-brand-green">{x.i}</span>
                <p className="mt-4 font-heading text-xl font-bold">{x.t}</p>
                <p className="mt-2 text-sm text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
