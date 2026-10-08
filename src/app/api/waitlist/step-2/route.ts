import { NextResponse, type NextRequest } from "next/server";
import { WAITLIST_ERRORS } from "@/lib/waitlist/schema";
import { clientIp, handleStep2, readJsonBody } from "@/lib/waitlist/server";

/** Step 2: optional answers, authorised by the single-use token from step 1. */
export async function POST(request: NextRequest) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) return NextResponse.json({ ok: false, error: WAITLIST_ERRORS.generic }, { status: parsed.status });
  const result = await handleStep2(parsed.body, { ip: clientIp(request.headers) });
  return NextResponse.json(result.body, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
