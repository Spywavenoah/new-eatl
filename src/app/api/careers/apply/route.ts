import { db } from "@/db";
import { jobApplications, jobOpenings } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = str(body.fullName, 160);
    const email = str(body.email, 200);
    const coverLetter = str(body.coverLetter, 8000);
    let position = str(body.position, 200);
    const jobIdNum = Number(body.jobId);
    let jobId: number | null = null;

    if (Number.isInteger(jobIdNum) && jobIdNum > 0) {
      const [job] = await db.select().from(jobOpenings).where(eq(jobOpenings.id, jobIdNum)).limit(1);
      if (job) {
        jobId = job.id;
        position = job.title;
      }
    }

    if (!fullName || !email || !position || coverLetter.length < 30) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!emailRe.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const years = Number(body.yearsExperience);
    await db.insert(jobApplications).values({
      jobId,
      fullName,
      email,
      position,
      coverLetter,
      phone: str(body.phone, 60) || null,
      linkedin: str(body.linkedin, 300) || null,
      yearsExperience: Number.isFinite(years) && years >= 0 ? Math.round(years) : null,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Unable to submit application right now." }, { status: 500 });
  }
}
