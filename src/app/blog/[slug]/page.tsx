import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getRelatedPosts, formatDate } from "@/lib/posts";
import { ensureSeeded } from "@/db/seed-data";
import { renderMarkdown } from "@/lib/markdown";
import { AgentBadge, PostCover } from "@/components/blog/BlogExplorer";
import { CtaBand } from "@/components/sections/Shared";
import { ArrowRight, ClockIcon, LinkedInIcon, MailIcon, XSocialIcon } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await ensureSeeded();
  const post = await getPostBySlug(slug);
  if (!post || post.status === "archived") notFound();

  const related = await getRelatedPosts(post, 3);
  const html = renderMarkdown(post.content);
  const tags = post.tags.split(",").map((t) => t.trim()).filter(Boolean);
  const shareUrl = `https://eatlng.com/blog/${post.slug}`;

  return (
    <>
      {/* Article header */}
      <section className="relative overflow-hidden bg-brand-green-dark text-white">
        <div className="pattern-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/95 to-brand-green/70" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-3 inline-flex flex-wrap items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/75 sm:text-[11px]">
            <Link href="/" className="hover:text-brand-gold">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/blog" className="hover:text-brand-gold">Blog</Link>
            <span className="text-white/40">/</span>
            <span className="text-brand-gold">{post.category}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-brand-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{post.category}</span>
            <AgentBadge authorType={post.authorType} />
            {post.status === "draft" && <span className="rounded-md bg-brand-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">Draft preview</span>}
          </div>
          <h1 className="mt-3 font-heading text-2xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem]">{post.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/70">
            <span className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 font-heading text-xs font-bold text-white">
                {post.author.slice(0, 1).toUpperCase()}
              </span>
              {post.author}
              {post.authorType === "ai_agent" && <span className="text-white/50">· {post.source}</span>}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1"><ClockIcon width={12} height={12} />{post.readMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {post.coverImage && (
              <figure className="mb-8 overflow-hidden rounded-2xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.coverAlt || post.title} className="max-h-[420px] w-full object-cover" />
              </figure>
            )}
            <div className="max-w-3xl [&>*:first-child]:mt-0" dangerouslySetInnerHTML={{ __html: html }} />

            {tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">Tags</span>
                {tags.map((t) => (
                  <Link key={t} href="/blog" className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink/75 transition-colors hover:bg-brand-green-light hover:text-brand-green">{t}</Link>
                ))}
              </div>
            )}

            {/* Author / provenance */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-surface p-5 sm:flex-row sm:items-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-green font-heading text-lg font-bold text-white">{post.author.slice(0, 1).toUpperCase()}</span>
              <div className="min-w-0">
                <p className="font-heading font-bold">{post.author}</p>
                <p className="text-xs text-muted">
                  {post.authorType === "ai_agent"
                    ? `Automatically published by an AI agent via the ${post.source} integration${post.sourceAgent ? ` · ${post.sourceAgent}` : ""}. Reviewed against EATL editorial standards.`
                    : "Engineering Automation Technology Limited — technical editorial team."}
                </p>
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-green hover:bg-brand-green hover:text-white"><LinkedInIcon width={15} height={15} /></a>
                <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" aria-label="Share on X" className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-green hover:bg-brand-green hover:text-white"><XSocialIcon width={13} height={13} /></a>
                <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`} aria-label="Share by email" className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-green hover:bg-brand-green hover:text-white"><MailIcon width={15} height={15} /></a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">In this article</p>
              <ul className="mt-2 space-y-1.5 text-[13px]">
                {(post.content.match(/^##\s+.+$/gm) ?? []).slice(0, 6).map((h) => (
                  <li key={h} className="truncate text-muted">
                    <span className="mr-1.5 text-brand-red">›</span>{h.replace(/^##\s+/, "")}
                  </li>
                ))}
                {!(post.content.match(/^##\s+.+$/gm) ?? []).length && <li className="text-muted">Overview</li>}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-brand-red p-5 text-white">
              <div className="pattern-grid absolute inset-0" aria-hidden />
              <div className="relative">
                <p className="font-heading text-lg font-bold">Need this capability on your asset?</p>
                <p className="mt-1.5 text-[13px] text-white/85">Talk to the EATL team about metering, calibration, instrumentation or integrity scopes.</p>
                <Link href="/request-quote" className="btn btn-green mt-4 w-full">Request a Quote</Link>
              </div>
            </div>
            <Link href="/blog" className="flex items-center justify-between rounded-2xl border border-line bg-white p-4 text-sm font-bold transition-colors hover:border-brand-green hover:text-brand-green">
              All articles <ArrowRight width={15} height={15} />
            </Link>
          </aside>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-heading text-2xl font-bold">Continue reading</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const card = {
                  slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category, tags: r.tags,
                  author: r.author, authorType: r.authorType, coverImage: r.coverImage,
                  readMinutes: r.readMinutes, publishedAt: new Date(r.publishedAt).toISOString(),
                };
                return (
                  <article key={r.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lift">
                    <Link href={`/blog/${r.slug}`} className="block h-36 overflow-hidden bg-surface"><PostCover post={card} /></Link>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red">{r.category}</span>
                      <Link href={`/blog/${r.slug}`}><h3 className="mt-1.5 font-heading text-base font-bold leading-snug group-hover:text-brand-green">{r.title}</h3></Link>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-xs text-muted">{r.excerpt}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
