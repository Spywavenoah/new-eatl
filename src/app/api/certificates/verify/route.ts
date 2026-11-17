import { db } from "@/db";
import { certificates } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const no = (searchParams.get("no") || "").trim().toUpperCase();
  if (!no) return Response.json({ error: "Certificate number is required." }, { status: 400 });

  try {
    const [cert] = await db.select().from(certificates).where(eq(certificates.certificateNo, no)).limit(1);
    if (!cert) return Response.json({ found: false });

    const expired = new Date(cert.dueDate) < new Date();
    return Response.json({
      found: true,
      certificate: {
        certificateNo: cert.certificateNo,
        clientName: cert.clientName,
        instrument: cert.instrument,
        serialNo: cert.serialNo,
        laboratory: cert.laboratory,
        calibrationDate: cert.calibrationDate,
        dueDate: cert.dueDate,
        technician: cert.technician,
        status: !cert.isValid ? "revoked" : expired ? "expired" : "valid",
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Verification service unavailable." }, { status: 500 });
  }
}
