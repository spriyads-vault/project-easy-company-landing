import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { llmsTxtV6 } from "@/content/llms";
import { HOMEPAGE_V6 } from "@/lib/flags";

// Generated at build time. With NEXT_PUBLIC_FF_HOMEPAGE_V6 on it follows the v6 copy and capability statuses;
// otherwise it serves the v3 text (src/content/llms-v3.txt, formerly public/llms.txt) unchanged.
export const dynamic = "force-static";

export async function GET() {
  const body = HOMEPAGE_V6 ? llmsTxtV6() : await readFile(join(process.cwd(), "src/content/llms-v3.txt"), "utf8");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
