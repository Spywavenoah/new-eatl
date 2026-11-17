import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/Shared";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about EATL services, laboratories, certifications and locations.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about working with EATL." crumbs={[{ label: "FAQ" }]} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Help Centre" title="Have questions? We have answers." text="Can't find what you're looking for? Our team is one message away." />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-green">Contact us</Link>
              <Link href="/calibration-terms" className="btn btn-outline-green">Calibration T&amp;C</Link>
            </div>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
