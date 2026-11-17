"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ClockIcon, SearchIcon } from "@/components/ui/Icons";

export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  author: string;
  authorType: string;
  coverImage: string | null;
  readMinutes: number;
  publishedAt: string;
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function PostCover({ post, className = "" }: { post: BlogCard; className?: string }) {
  if (post.coverImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={post.coverImage} alt={post.title} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`} />
    );
  }
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-green to-brand-green-dark ${className}`}>
      <span className="px-6 text-center font-heading text-lg font-bold text-white/90">{post.category}</span>
    </div>
  );
}

export function AgentBadge({ authorType }: { authorType: string }) {
  if (authorType !== "ai_agent") return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-green" title="Published automatically by an AI agent">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.4 6.2L21 10l-5.2 3.9L17.5 21 12 17.3 6.5 21l1.7-7.1L3 10l6.6-1.8z" /></svg>
      AI agent
    </span>
  );
}

export default function BlogExplorer({ posts, categories }: { posts: BlogCard[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [agentOnly, setAgentOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (agentOnly && p.authorType !== "ai_agent") return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    });
  }, [posts, query, category, agentOnly]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    posts.forEach((p) => { map[p.category] = (map[p.category] ?? 0) + 1; });
    return map;
  }, [posts]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories.filter((c) => counts[c])].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                category === c ? "bg-brand-green text-white shadow-soft" : "bg-white text-ink/70 hover:bg-brand-green-light hover:text-brand-green"
              }`}
            >
              {c} <span className={category === c ? "text-white/60" : "text-muted"}>{counts[c] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            onClick={() => setAgentOnly((v) => !v)}
            aria-pressed={agentOnly}
            className={`inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-bold transition-colors ${
              agentOnly ? "border-brand-green bg-brand-green text-white" : "border-line bg-white text-muted hover:border-brand-green hover:text-brand-green"
            }`}
          >
            ✦ Agent-written
          </button>
          <div className="relative sm:w-60">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" width={16} height={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="field !py-2 !pl-9 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-xl bg-surface p-6 text-sm text-muted">No articles match those filters yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:border-brand-green hover:shadow-lift">
              <Link href={`/blog/${p.slug}`} className="block h-44 overflow-hidden bg-surface">
                <PostCover post={p} />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-brand-red-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">{p.category}</span>
                  <AgentBadge authorType={p.authorType} />
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted"><ClockIcon width={11} height={11} />{p.readMinutes} min</span>
                </div>
                <Link href={`/blog/${p.slug}`} className="mt-2.5">
                  <h3 className="font-heading text-lg font-bold leading-snug transition-colors group-hover:text-brand-green">{p.title}</h3>
                </Link>
                <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[11px] text-muted">{fmt(p.publishedAt)}</span>
                  <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-green transition-colors hover:text-brand-red">
                    Read <ArrowRight width={12} height={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
