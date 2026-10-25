import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { llmsTxtV6, llmsTxtV8 } from "@/content/llms";
import { HOMEPAGE_V6, HOMEPAGE_V8 } from "@/lib/flags";

// Generated at build time. With NEXT_PUBLIC_FF_HOMEPAGE_V8 on it follows the v8 copy, and with
// NEXT_PUBLIC_FF_HOMEPAGE_V6 on the v6 copy, both with capability statuses from capability-status.ts; otherwise it serves the v3 text (src/content/llms-v3.txt, formerly public/llms.txt) unchanged.
export const dynamic = "force-static";

export async function GET() {
  const body = HOMEPAGE_V8 ? llmsTxtV8() : HOMEPAGE_V6 ? llmsTxtV6() : await readFile(join(process.cwd(), "src/content/llms-v3.txt"), "utf8");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
