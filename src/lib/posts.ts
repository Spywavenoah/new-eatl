import { db } from "@/db";
import { posts } from "@/db/schema";
import { and, desc, eq, ne, or, sql } from "drizzle-orm";
import { plainText, readingMinutes, slugify } from "@/lib/markdown";

export type Post = typeof posts.$inferSelect;

export const postCategories = ["Insights", "Metering & Calibration", "HSE", "Engineering", "AI & Automation", "Company News"];

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export type NormalisedPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  coverAlt: string | null;
  category: string;
  tags: string;
  author: string;
  authorType: string;
  source: string;
  sourceAgent: string | null;
  externalId: string | null;
  status: string;
  featured: boolean;
  readMinutes: number;
  publishedAt: Date;
};

export type NormaliseResult = { ok: true; value: NormalisedPost } | { ok: false; error: string };

/** Accepts loosely-typed JSON from an AI agent and returns a safe, validated record. */
export function normalisePost(input: unknown): NormaliseResult {
  if (!input || typeof input !== "object") return { ok: false, error: "Each post must be a JSON object." };
  const raw = input as Record<string, unknown>;

  const title = str(raw.title, 240);
  const content = str(raw.content ?? raw.body ?? raw.markdown, 60000);
  if (title.length < 5) return { ok: false, error: "`title` is required (min 5 characters)." };
  if (content.length < 40) return { ok: false, error: "`content` is required (min 40 characters of Markdown or text)." };

  const rawSlug = str(raw.slug, 180);
  const slug = slugify(rawSlug || title);
  const tagsInput = Array.isArray(raw.tags) ? raw.tags.join(", ") : str(raw.tags, 400);
  const tags = tagsInput
    .split(/[,\n]/)
    .map((t) => t.trim().replace(/\s+/g, " ").slice(0, 40))
    .filter(Boolean)
    .slice(0, 8)
    .join(", ");

  const statusRaw = str(raw.status, 20).toLowerCase();
  const status = ["draft", "published", "archived"].includes(statusRaw) ? statusRaw : "published";

  const authorTypeRaw = str(raw.authorType ?? raw.author_type, 30).toLowerCase();
  const authorType = ["human", "ai_agent", "ai"].includes(authorTypeRaw) ? (authorTypeRaw === "ai" ? "ai_agent" : authorTypeRaw) : "ai_agent";

  const source = str(raw.source, 60) || (authorType === "ai_agent" ? "marblism" : "editorial");
  const dateRaw = raw.publishedAt ?? raw.published_at ?? raw.date;
  const parsed = dateRaw ? new Date(String(dateRaw)) : new Date();
  const publishedAt = Number.isNaN(parsed.getTime()) ? new Date() : parsed;

  const excerptInput = str(raw.excerpt ?? raw.summary ?? raw.description, 400);

  return {
    ok: true,
    value: {
      slug,
      title,
      content,
      excerpt: excerptInput || plainText(content, 220),
      coverImage: str(raw.coverImage ?? raw.cover_image ?? raw.image, 600) || null,
      coverAlt: str(raw.coverAlt ?? raw.cover_alt ?? raw.imageAlt, 240) || null,
      category: (str(raw.category, 80) || "Insights").slice(0, 80),
      tags,
      author: str(raw.author ?? raw.authorName, 160) || (authorType === "ai_agent" ? "Marblism AI Agent" : "EATL Editorial"),
      authorType,
      source: source.slice(0, 60),
      sourceAgent: str(raw.agent ?? raw.agentName ?? raw.agentId ?? raw.sourceAgent, 160) || null,
      externalId: str(raw.externalId ?? raw.external_id ?? raw.id, 200) || null,
      status,
      featured: raw.featured === true || raw.featured === "true",
      readMinutes: readingMinutes(content),
      publishedAt,
    },
  };
}

export async function listPublishedPosts(limit = 50): Promise<Post[]> {
  try {
    return await db.select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt)).limit(limit);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const [row] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    return row ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  try {
    return await db
      .select()
      .from(posts)
      .where(and(eq(posts.status, "published"), ne(posts.slug, post.slug), or(eq(posts.category, post.category), ne(posts.category, post.category))))
      .orderBy(sql`case when ${posts.category} = ${post.category} then 0 else 1 end`, desc(posts.publishedAt))
      .limit(limit);
  } catch {
    return [];
  }
}

export const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
