import { db } from "@/db";
import { quoteRequests } from "@/db/schema";

export const dynamic = "force-dynamic";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = str(body.fullName, 160);
    const email = str(body.email, 200);
    const serviceArea = str(body.serviceArea, 120);
    const details = str(body.details, 5000);

    if (!fullName || !email || !serviceArea || details.length < 10) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!emailRe.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const [row] = await db
      .insert(quoteRequests)
      .values({
        fullName,
        email,
        serviceArea,
        details,
        company: str(body.company, 160) || null,
        phone: str(body.phone, 60) || null,
        location: str(body.location, 160) || null,
        timeline: str(body.timeline, 80) || null,
        budget: str(body.budget, 80) || null,
      })
      .returning({ id: quoteRequests.id });

    const reference = `RFQ-${new Date().getFullYear()}-${String(row.id).padStart(5, "0")}`;
    return Response.json({ ok: true, reference });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Unable to submit request right now." }, { status: 500 });
  }
}
