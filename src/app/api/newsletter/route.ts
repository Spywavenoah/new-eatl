import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export const dynamic = "force-dynamic";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
    if (!emailRe.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    const inserted = await db
      .insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoNothing()
      .returning({ id: newsletterSubscribers.id });

    return Response.json({
      ok: true,
      message: inserted.length ? "You're subscribed. Welcome aboard!" : "You're already on our list.",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Unable to subscribe right now." }, { status: 500 });
  }
}
