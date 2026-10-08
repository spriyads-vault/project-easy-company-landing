import { NextResponse, type NextRequest } from "next/server";
import { WAITLIST_ERRORS } from "@/lib/waitlist/schema";
import { clientIp, handleStep1, readJsonBody } from "@/lib/waitlist/server";

/** Step 1: email, role and opt-in. */
export async function POST(request: NextRequest) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) return NextResponse.json({ ok: false, error: WAITLIST_ERRORS.generic }, { status: parsed.status });
  const result = await handleStep1(parsed.body, { ip: clientIp(request.headers) });
  return NextResponse.json(result.body, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
