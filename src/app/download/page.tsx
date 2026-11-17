import Link from "next/link";
import type { Metadata } from "next";
import PushPanel from "@/components/git/PushPanel";
import { PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import { pushTarget } from "@/lib/project";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Download & Deploy — Option B build",
  description: "Download the complete Option B source archive or push it straight to GitHub.",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        title="Download & Deploy"
        subtitle="Get the complete Option B source as a zip, or push the current build to your GitHub repository."
        crumbs={[{ label: "Download" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-soft lg:col-span-1">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-green-light text-brand-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
            </span>
            <h2 className="mt-3 font-heading text-lg font-bold">Zip archive</h2>
            <p className="mt-1 text-[13px] text-muted">21 MB · 135 files · source, images, hero clips, README and config.</p>
            <a href="/downloads/eatl-option-b.zip" download className="btn btn-red mt-4 w-full">Download .zip</a>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-green-light text-brand-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" /></svg>
            </span>
            <h2 className="mt-3 font-heading text-lg font-bold">Target repository</h2>
            <p className="mt-1 text-[13px] text-muted">Configured for this delivery:</p>
            <a href={pushTarget.repo} target="_blank" rel="noreferrer" className="mt-2 block break-all font-mono text-[12px] font-semibold text-brand-green underline underline-offset-2">{pushTarget.repo.replace(/\.git$/, "")}</a>
            <p className="mt-2 text-[12px] text-muted">Branch <code className="rounded bg-surface px-1 font-mono">{pushTarget.branch}</code></p>
            <Link href="https://github.com/new" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-brand-green hover:text-brand-red">Create repo if missing <ArrowRight width={12} height={12} /></Link>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-green-light text-brand-green"><ShieldIcon width={20} height={20} /></span>
            <h2 className="mt-3 font-heading text-lg font-bold">Token safety</h2>
            <ul className="mt-2 space-y-1.5 text-[12.5px] text-muted">
              {["Classic PAT with `repo` scope, or fine-grained with Contents: write", "Used only for the push request", "Cleared from the form after each run", "Redacted from all command output", "Never stored in the database"].map((t) => (
                <li key={t} className="flex items-start gap-1.5"><CheckIcon width={12} height={12} className="mt-0.5 shrink-0 text-brand-green" />{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="GitHub" title="Push the build" text="Provide a token with write access and the current project will be committed and pushed. Nothing is stored after the request completes." />
          <div className="mt-6"><PushPanel defaultRepo={pushTarget.repo} /></div>
        </div>

        <div className="mt-12 rounded-2xl bg-brand-green-dark p-6 text-white sm:p-8">
          <h3 className="font-heading text-xl font-bold">Prefer the command line?</h3>
          <p className="mt-1 text-[13px] text-white/75">Download the zip, unzip it, then run inside the folder:</p>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-4 text-[11.5px] leading-relaxed text-white/90"><code>{`git init -b main
git add .
git commit -m "feat: Option B build — EATL website"
git remote add origin ${pushTarget.repo}
git push -u origin main`}</code></pre>
          <p className="mt-3 text-[12px] text-white/60">GitHub will prompt for a username and your personal access token as the password.</p>
        </div>
      </section>
    </>
  );
}
