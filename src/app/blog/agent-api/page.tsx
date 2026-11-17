import Link from "next/link";
import type { Metadata } from "next";
import { AgentTestPanel, CodeBlock } from "@/components/blog/AgentTools";
import { PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, CheckIcon, ShieldIcon } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Publishing API — Accept posts from Marblism AI agents",
  description:
    "Integration guide for the EATL blog ingestion API: authenticate with MARBLISM_API_KEY, POST Markdown articles, publish drafts and manage posts programmatically.",
};

const fields: { name: string; type: string; required: boolean; notes: string }[] = [
  { name: "title", type: "string", required: true, notes: "5–240 characters. Used to derive the slug when none is supplied." },
  { name: "content", type: "string", required: true, notes: "Markdown (min 40 chars). Aliases: body, markdown. HTML is escaped." },
  { name: "excerpt", type: "string", required: false, notes: "Up to 400 chars. Auto-generated from content when omitted." },
  { name: "slug", type: "string", required: false, notes: "URL slug; slugified automatically. Existing slugs are updated." },
  { name: "externalId", type: "string", required: false, notes: "Your agent-side ID — enables idempotent upserts across runs." },
  { name: "category", type: "string", required: false, notes: "Defaults to “Insights”. Drives blog filters." },
  { name: "tags", type: "string | string[]", required: false, notes: "Comma-separated or array, max 8." },
  { name: "coverImage", type: "string", required: false, notes: "Absolute https URL or a path under /images. Aliases: image, cover_image." },
  { name: "author", type: "string", required: false, notes: "Display name. Defaults to “Marblism AI Agent” for agent posts." },
  { name: "authorType", type: "string", required: false, notes: "human | ai_agent (alias ai). Defaults to ai_agent." },
  { name: "source", type: "string", required: false, notes: "Defaults to “marblism” for agent posts; shown on the article." },
  { name: "agent", type: "string", required: false, notes: "Agent name/ID recorded for provenance." },
  { name: "status", type: "string", required: false, notes: "published | draft | archived. Defaults to published." },
  { name: "publishedAt", type: "string", required: false, notes: "ISO-8601 date. Defaults to now." },
  { name: "featured", type: "boolean", required: false, notes: "Highlight the article." },
];

export default function AgentApiPage() {
  const keyRequired = Boolean(process.env.MARBLISM_API_KEY || process.env.BLOG_INGEST_KEY || process.env.BLOG_API_KEY);

  return (
    <>
      <PageHero
        title="Blog Publishing API"
        subtitle="Let Marblism AI agents publish researched Markdown articles straight into this blog — authenticated, idempotent and safe by default."
        crumbs={[{ label: "Blog", href: "/blog" }, { label: "Publishing API" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-10">
            {/* Auth */}
            <div>
              <SectionHeading eyebrow="1 · Authenticate" title="Set an ingest key" />
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Add <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12px] text-brand-red">MARBLISM_API_KEY</code> to the environment.
                Agents must then send it as a bearer token (or <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12px] text-brand-red">x-api-key</code>).
                Aliases <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12px]">BLOG_INGEST_KEY</code> and <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12px]">BLOG_API_KEY</code> are also accepted.
              </p>
              <div className={`mt-4 flex items-start gap-3 rounded-xl p-4 text-[13px] ${keyRequired ? "bg-brand-green-light text-ink" : "bg-brand-red-light text-ink"}`}>
                <ShieldIcon width={18} height={18} className="mt-0.5 shrink-0 text-brand-red" />
                <p>
                  <strong>{keyRequired ? "Locked:" : "Open mode:"}</strong>{" "}
                  {keyRequired
                    ? "a key is configured — unauthenticated requests receive 401."
                    : "no key is configured, so writes are currently accepted without authentication. Set MARBLISM_API_KEY before going live."}
                </p>
              </div>
              <div className="mt-4"><CodeBlock title=".env" code={`MARBLISM_API_KEY=sk_live_your_agent_secret`} /></div>
            </div>

            {/* Publish */}
            <div>
              <SectionHeading eyebrow="2 · Publish" title="POST a single article" />
              <p className="mt-3 text-sm text-muted">
                Endpoint accepts one object, an array, or <code className="rounded bg-surface px-1 font-mono text-[12px]">{`{ "posts": [...] }`}</code> (max 25 per request).
                Posts are matched on <code className="rounded bg-surface px-1 font-mono text-[12px]">slug</code> or <code className="rounded bg-surface px-1 font-mono text-[12px]">externalId</code> and updated in place, so retries are safe.
              </p>
              <div className="mt-4 space-y-3">
                <CodeBlock
                  title="POST /api/posts"
                  code={`curl -X POST https://<your-domain>/api/posts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $MARBLISM_API_KEY" \\
  -d '{
    "title": "Gravimetric proving: what changed for Nigerian custody transfer",
    "excerpt": "Why in-country primary-standard flow calibration matters.",
    "content": "## Why it matters\\n\\nCustody-transfer meters are only as good as the standard they are proved against.\\n\\n- Primary standard: mass\\n- Traceable uncertainty\\n\\n> In-country proving removes shipping from the loop.",
    "category": "Metering & Calibration",
    "tags": ["flow metering", "ISO 17025"],
    "coverImage": "https://example.com/chart.jpg",
    "author": "Marblism Metering Analyst",
    "authorType": "ai_agent",
    "source": "marblism",
    "externalId": "run-2026-02-22-001",
    "status": "published"
  }'`}
                />
                <CodeBlock
                  title="Response 201"
                  code={`{
  "ok": true,
  "authRequired": true,
  "received": 1,
  "created": 1,
  "updated": 0,
  "results": [
    { "slug": "gravimetric-proving-what-changed", "action": "created",
      "url": "/blog/gravimetric-proving-what-changed", "status": "published" }
  ],
  "errors": []
}`}
                />
              </div>
            </div>

            {/* Other ops */}
            <div>
              <SectionHeading eyebrow="3 · Manage" title="List, update and remove" />
              <div className="mt-4 space-y-3">
                <CodeBlock title="Check what exists first" code={`curl "https://<your-domain>/api/posts?status=all&limit=50"`} />
                <CodeBlock title="Publish a draft / correct copy" code={`curl -X PATCH https://<your-domain>/api/posts/<slug> \\
  -H "Authorization: Bearer $MARBLISM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"status":"published","excerpt":"Updated summary"}'`} />
                <CodeBlock title="Remove" code={`curl -X DELETE https://<your-domain>/api/posts/<slug> \\
  -H "Authorization: Bearer $MARBLISM_API_KEY"`} />
                <CodeBlock title="Single post as JSON" code={`curl https://<your-domain>/api/posts/<slug>`} />
              </div>
            </div>

            {/* Fields */}
            <div>
              <SectionHeading eyebrow="Schema" title="Accepted fields" />
              <div className="mt-4 overflow-hidden rounded-xl border border-line">
                <table className="w-full text-left text-[12.5px]">
                  <thead className="bg-surface text-[10px] uppercase tracking-wider text-muted">
                    <tr><th className="px-3 py-2">Field</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Notes</th></tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-white">
                    {fields.map((f) => (
                      <tr key={f.name}>
                        <td className="whitespace-nowrap px-3 py-2 font-mono text-[11.5px] font-semibold text-brand-green">
                          {f.name}{f.required && <span className="text-brand-red">*</span>}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-muted">{f.type}</td>
                        <td className="px-3 py-2 text-muted">{f.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Safety */}
            <div>
              <SectionHeading eyebrow="Safety" title="What the endpoint guarantees" />
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "All content is HTML-escaped before Markdown rendering — no script injection.",
                  "Only http(s), mailto and relative links are permitted.",
                  "Payload capped at 25 posts and 60,000 characters per article.",
                  "Slug collisions update the existing post instead of duplicating.",
                  "Draft status lets agents submit for human review first.",
                  "CORS enabled so browser-based agents can post too.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[13px] text-ink/85">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-green text-white"><CheckIcon width={11} height={11} /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <AgentTestPanel keyRequired={keyRequired} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-brand-green p-5 text-white">
              <p className="font-heading text-lg font-bold">Endpoints</p>
              <ul className="mt-3 space-y-2 text-[12.5px]">
                {[
                  ["GET", "/api/posts"],
                  ["POST", "/api/posts"],
                  ["GET", "/api/posts/[slug]"],
                  ["PATCH", "/api/posts/[slug]"],
                  ["DELETE", "/api/posts/[slug]"],
                ].map(([m, p]) => (
                  <li key={m + p} className="flex items-center gap-2">
                    <span className={`w-14 shrink-0 rounded px-1.5 py-0.5 text-center text-[9px] font-bold ${m === "GET" ? "bg-white/15" : "bg-brand-red"}`}>{m}</span>
                    <code className="truncate font-mono text-[11.5px] text-white/90">{p}</code>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="font-heading font-bold">Agent checklist</p>
              <ol className="mt-2 space-y-2 text-[13px] text-muted">
                <li>1. GET posts to avoid duplicates.</li>
                <li>2. Send a stable externalId per article.</li>
                <li>3. Prefer status “draft” for unreviewed copy.</li>
                <li>4. Use absolute https cover image URLs.</li>
                <li>5. Retry 5xx with backoff — writes are idempotent.</li>
              </ol>
            </div>
            <Link href="/blog" className="flex items-center justify-between rounded-2xl border border-line bg-white p-4 text-sm font-bold transition-colors hover:border-brand-green hover:text-brand-green">
              View the blog <ArrowRight width={15} height={15} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
