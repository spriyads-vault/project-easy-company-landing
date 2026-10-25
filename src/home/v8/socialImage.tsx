import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HERO, V8_H1 } from "@/content/home-v8";

/** Open Graph and Twitter image for "/" with the v8 homepage (src/app/(home)/opengraph-image.tsx and twitter-image.tsx). */
export const SOCIAL_SIZE_V8 = { width: 1200, height: 630 };
export const SOCIAL_ALT_V8 = `Crado: ${V8_H1}`;

/** v8: the dark page, the official mark (white, unaltered), the H1 in Figtree and the hero eyebrow. */
export async function socialImageV8(): Promise<Response> {
  const [figtree, figtree500, logo] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/figtree/files/figtree-latin-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/figtree/files/figtree-latin-500-normal.woff")),
    readFile(join(process.cwd(), "public/assets/crado-logo.png")),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0D0D0F", padding: 24, fontFamily: "Figtree" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 36, background: "#161619", padding: "56px 64px", color: "#FFFFFF" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
            <img src={`data:image/png;base64,${logo.toString("base64")}`} width={35} height={40} alt="" />
            <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.01em" }}>Crado</div>
          </div>
          <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.02em", maxWidth: 980 }}>{V8_H1}</div>
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: 20, letterSpacing: "0.08em", color: "#FFFFFF", padding: "8px 20px", borderRadius: 9999, border: "1px solid rgba(230,234,240,0.24)" }}>
              {HERO.eyebrow}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...SOCIAL_SIZE_V8,
      fonts: [
        { name: "Figtree", data: figtree, style: "normal", weight: 400 },
        { name: "Figtree", data: figtree500, style: "normal", weight: 500 },
      ],
    },
  );
}
