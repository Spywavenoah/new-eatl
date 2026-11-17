import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { plainText, readingMinutes } from "@/lib/markdown";

export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
  "Cache-Control": "no-store",
};

const ingestKey = () => process.env.MARBLISM_API_KEY || process.env.BLOG_INGEST_KEY || process.env.BLOG_API_KEY || "";

function authorised(req: Request): boolean {
  const key = ingestKey();
  if (!key) return true;
  const header = req.headers.get("authorization") ?? "";
  const bearer = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  const provided = bearer || req.headers.get("x-api-key") || "";
  const a = Buffer.from(provided);
  const b = Buffer.from(key);
  return a.length === b.length && a.equals(b);
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    if (!post) return Response.json({ ok: false, error: "Post not found." }, { status: 404, headers: CORS });
    return Response.json({ ok: true, post: { ...post, url: `/blog/${post.slug}` } }, { headers: CORS });
  } catch {
    return Response.json({ ok: false, error: "Lookup failed." }, { status: 500, headers: CORS });
  }
}

/** Update an existing post (e.g. agent publishes a draft, or corrects copy). */
export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!authorised(req)) return Response.json({ ok: false, error: "Unauthorised." }, { status: 401, headers: CORS });
  const { slug } = await params;
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const patch: Record<string, unknown> = { updatedAt: new Date() };

    if (typeof body.title === "string" && body.title.trim().length >= 5) patch.title = body.title.trim().slice(0, 240);
    if (typeof body.excerpt === "string") patch.excerpt = body.excerpt.trim().slice(0, 400);
    if (typeof body.content === "string" && body.content.trim().length >= 40) {
      patch.content = body.content.trim().slice(0, 60000);
      patch.readMinutes = readingMinutes(body.content);
      if (!patch.excerpt) patch.excerpt = plainText(body.content, 220);
    }
    if (typeof body.coverImage === "string") patch.coverImage = body.coverImage.trim().slice(0, 600) || null;
    if (typeof body.category === "string" && body.category.trim()) patch.category = body.category.trim().slice(0, 80);
    if (typeof body.status === "string" && ["draft", "published", "archived"].includes(body.status)) patch.status = body.status;
    if (body.featured === true || body.featured === false) patch.featured = body.featured;

    const [updated] = await db.update(posts).set(patch).where(eq(posts.slug, slug)).returning({ slug: posts.slug, status: posts.status });
    if (!updated) return Response.json({ ok: false, error: "Post not found." }, { status: 404, headers: CORS });
    return Response.json({ ok: true, post: { ...updated, url: `/blog/${updated.slug}` } }, { headers: CORS });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "Update failed." }, { status: 500, headers: CORS });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!authorised(req)) return Response.json({ ok: false, error: "Unauthorised." }, { status: 401, headers: CORS });
  const { slug } = await params;
  try {
    const [deleted] = await db.delete(posts).where(eq(posts.slug, slug)).returning({ slug: posts.slug });
    if (!deleted) return Response.json({ ok: false, error: "Post not found." }, { status: 404, headers: CORS });
    return Response.json({ ok: true, deleted: deleted.slug }, { headers: CORS });
  } catch {
    return Response.json({ ok: false, error: "Delete failed." }, { status: 500, headers: CORS });
  }
}
