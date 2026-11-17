import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = str(body.fullName, 160);
    const email = str(body.email, 200);
    const subject = str(body.subject, 200);
    const message = str(body.message, 5000);

    if (!fullName || !email || !subject || message.length < 10) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!emailRe.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    await db.insert(contactMessages).values({
      fullName,
      email,
      subject,
      message,
      phone: str(body.phone, 60) || null,
      category: str(body.category, 60) || "enquiry",
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Unable to send message right now." }, { status: 500 });
  }
}
