import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq, or } from "drizzle-orm";
import { normalisePost } from "@/lib/posts";
import { plainText } from "@/lib/markdown";

export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
  "Cache-Control": "no-store",
};

const ingestKey = () => process.env.MARBLISM_API_KEY || process.env.BLOG_INGEST_KEY || process.env.BLOG_API_KEY || "";

function authorised(req: Request): { ok: boolean; required: boolean } {
  const key = ingestKey();
  if (!key) return { ok: true, required: false }; // unlocked demo mode
  const header = req.headers.get("authorization") ?? "";
  const bearer = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  const provided = bearer || req.headers.get("x-api-key") || new URL(req.url).searchParams.get("key") || "";
  // constant-time-ish comparison
  const a = Buffer.from(provided);
  const b = Buffer.from(key);
  const ok = a.length === b.length && a.equals(b);
  return { ok, required: true };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

/** Public list of posts — lets an agent check what already exists before publishing. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "published";
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);

  try {
    const rows = await db
      .select({
        slug: posts.slug,
        title: posts.title,
        excerpt: posts.excerpt,
        category: posts.category,
        tags: posts.tags,
        author: posts.author,
        authorType: posts.authorType,
        source: posts.source,
        status: posts.status,
        coverImage: posts.coverImage,
        readMinutes: posts.readMinutes,
        publishedAt: posts.publishedAt,
      })
      .from(posts)
      .where(status === "all" ? or(eq(posts.status, "published"), eq(posts.status, "draft"), eq(posts.status, "archived")) : eq(posts.status, status))
      .orderBy(desc(posts.publishedAt))
      .limit(limit);

    return Response.json(
      { ok: true, count: rows.length, posts: rows.map((r) => ({ ...r, url: `/blog/${r.slug}` })) },
      { headers: CORS },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "Unable to list posts." }, { status: 500, headers: CORS });
  }
}

/**
 * Ingest endpoint for Marblism AI agents.
 * Accepts a single post object, an array, or `{ posts: [...] }`.
 * Existing posts (matched by slug or externalId) are updated, so re-runs are idempotent.
 */
export async function POST(req: Request) {
  const auth = authorised(req);
  if (!auth.ok) {
    return Response.json(
      { ok: false, error: "Unauthorised. Send the ingest key as `Authorization: Bearer <MARBLISM_API_KEY>` or `x-api-key`." },
      { status: 401, headers: CORS },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Request body must be valid JSON." }, { status: 400, headers: CORS });
  }

  const raw = body as Record<string, unknown>;
  const items: unknown[] = Array.isArray(body)
    ? body
    : Array.isArray(raw?.posts)
      ? (raw.posts as unknown[])
      : [body];

  if (items.length === 0) return Response.json({ ok: false, error: "No posts supplied." }, { status: 400, headers: CORS });
  if (items.length > 25) return Response.json({ ok: false, error: "Maximum 25 posts per request." }, { status: 400, headers: CORS });

  const results: { slug: string; action: "created" | "updated"; url: string; status: string }[] = [];
  const errors: { index: number; error: string }[] = [];

  for (let i = 0; i < items.length; i++) {
    const parsed = normalisePost(items[i]);
    if (!parsed.ok) {
      errors.push({ index: i, error: parsed.error });
      continue;
    }
    const p = parsed.value;
    try {
      const [existing] = await db
        .select({ id: posts.id })
        .from(posts)
        .where(p.externalId ? or(eq(posts.slug, p.slug), eq(posts.externalId, p.externalId))! : eq(posts.slug, p.slug))
        .limit(1);

      if (existing) {
        await db
          .update(posts)
          .set({ ...p, excerpt: p.excerpt || plainText(p.content, 220), updatedAt: new Date() })
          .where(eq(posts.id, existing.id));
        results.push({ slug: p.slug, action: "updated", url: `/blog/${p.slug}`, status: p.status });
      } else {
        await db.insert(posts).values(p);
        results.push({ slug: p.slug, action: "created", url: `/blog/${p.slug}`, status: p.status });
      }
    } catch (err) {
      console.error(err);
      errors.push({ index: i, error: "Database error while saving this post." });
    }
  }

  const status = results.length === 0 ? 422 : errors.length ? 207 : 201;
  return Response.json(
    {
      ok: results.length > 0,
      authRequired: auth.required,
      received: items.length,
      created: results.filter((r) => r.action === "created").length,
      updated: results.filter((r) => r.action === "updated").length,
      results,
      errors,
    },
    { status, headers: CORS },
  );
}
