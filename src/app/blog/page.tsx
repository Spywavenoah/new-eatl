import Link from "next/link";
import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { posts as postsTable } from "@/db/schema";
import { ensureSeeded } from "@/db/seed-data";
import BlogExplorer, { AgentBadge, PostCover, type BlogCard } from "@/components/blog/BlogExplorer";
import { PageHero, SectionHeading } from "@/components/sections/Shared";
import { ArrowRight, ClockIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Insights — Field Notes, Metering and Engineering",
  description:
    "Technical articles, project notes and AI-agent research from Engineering Automation Technology Limited — flow metering, calibration, HSE, instrumentation and asset integrity.",
};

async function loadPosts() {
  try {
    await ensureSeeded();
    return await db.select().from(postsTable).where(eq(postsTable.status, "published")).orderBy(desc(postsTable.publishedAt)).limit(60);
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const rows = await loadPosts();

  const cards: BlogCard[] = rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    tags: r.tags,
    author: r.author,
    authorType: r.authorType,
    coverImage: r.coverImage,
    readMinutes: r.readMinutes,
    publishedAt: new Date(r.publishedAt).toISOString(),
  }));

  const featured = cards.find((c) => c === cards[0]);
  const rest = featured ? cards.slice(1) : cards;
  const categories = Array.from(new Set(cards.map((c) => c.category)));
  const agentCount = cards.filter((c) => c.authorType === "ai_agent").length;

  return (
    <>
      <PageHero
        title="Blog & Insights"
        subtitle="Field notes from our workshops and laboratories, technical explainers, and research published by AI agents through our open API."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {cards.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface p-8 text-center">
            <p className="font-heading text-xl font-bold">No articles published yet</p>
            <p className="mt-2 text-sm text-muted">Posts can be created in the database or pushed by a Marblism AI agent.</p>
            <Link href="/blog/agent-api" className="btn btn-green mt-5">Agent publishing guide</Link>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <article className="group mb-12 grid overflow-hidden rounded-3xl border border-line bg-white shadow-soft lg:grid-cols-2">
                <Link href={`/blog/${featured.slug}`} className="relative block h-56 overflow-hidden bg-surface lg:h-full">
                  <PostCover post={featured} />
                  <span className="absolute left-4 top-4 rounded-md bg-brand-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Latest</span>
                </Link>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-brand-red-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">{featured.category}</span>
                    <AgentBadge authorType={featured.authorType} />
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted"><ClockIcon width={11} height={11} />{featured.readMinutes} min read</span>
                  </div>
                  <Link href={`/blog/${featured.slug}`}>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight transition-colors group-hover:text-brand-green sm:text-3xl">{featured.title}</h2>
                  </Link>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted sm:text-[15px]">{featured.excerpt}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link href={`/blog/${featured.slug}`} className="btn btn-red">Read article <ArrowRight width={15} height={15} /></Link>
                    <span className="text-xs text-muted">{featured.author} · {formatDate(featured.publishedAt)}</span>
                  </div>
                </div>
              </article>
            )}

            <BlogExplorer posts={rest.length ? rest : cards} categories={categories} />
          </>
        )}
      </section>

      {/* Agent publishing teaser */}
      <section className="border-y border-line bg-surface py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Open publishing API"
              title="AI agents can publish here"
              text="Marblism agents post Markdown articles straight to this blog through a secured REST endpoint. Content is HTML-escaped, deduplicated by slug or externalId, and can be delivered as a draft for review."
            />
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider">
              <span className="rounded-md border border-line bg-white px-2.5 py-1 text-brand-green">POST /api/posts</span>
              <span className="rounded-md border border-line bg-white px-2.5 py-1 text-brand-green">GET /api/posts</span>
              <span className="rounded-md border border-line bg-white px-2.5 py-1 text-brand-green">PATCH /api/posts/[slug]</span>
              <span className="rounded-md border border-line bg-white px-2.5 py-1 text-brand-green">DELETE /api/posts/[slug]</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/blog/agent-api" className="btn btn-green">Integration guide <ArrowRight width={15} height={15} /></Link>
              <span className="text-xs text-muted">{agentCount} article{agentCount === 1 ? "" : "s"} published by agents so far</span>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Example request</p>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-ink p-4 text-[11px] leading-relaxed text-white/85"><code>{`curl -X POST https://<your-domain>/api/posts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $MARBLISM_API_KEY" \\
  -d '{
    "title": "Gravimetric proving explained",
    "content": "## Why it matters\\n\\nPrimary-standard calibration…",
    "category": "Metering & Calibration",
    "authorType": "ai_agent",
    "source": "marblism",
    "status": "published"
  }'`}</code></pre>
          </div>
        </div>
      </section>
    </>
  );
}
