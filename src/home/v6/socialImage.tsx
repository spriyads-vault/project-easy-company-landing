import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { V6_CATEGORY, V6_H1 } from "@/content/home-v6";
import { HOMEPAGE_V6 } from "@/lib/flags";
import { OG_IMAGE } from "@/lib/site";

/** Open Graph and Twitter image for "/" (src/app/(home)/opengraph-image.tsx and twitter-image.tsx). */
export const SOCIAL_SIZE = { width: 1200, height: 630 };
export const SOCIAL_ALT = HOMEPAGE_V6 ? `Crado: ${V6_H1}` : OG_IMAGE.alt;


/**
 * v6: page colour, the official mark (white, on a forest tile so it is never recoloured), the H1 in Plex Serif and
 * the category line in Plex Mono. With the flag off it serves the existing v3 card unchanged.
 */
export async function socialImage(): Promise<Response> {
  if (!HOMEPAGE_V6) {
    const png = await readFile(join(process.cwd(), "public/og/crado-og-1200x630.png"));
    return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
  }
  const [serif, mono, logo] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff")),
    readFile(join(process.cwd(), "public/assets/crado-logo.png")),
  ]);
  const swatches = ["#AFD9FA", "#C7EBCF", "#FFE36E", "#F2C4FF"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F8F7F6", color: "#141821" }}>
        <div style={{ height: 16, display: "flex", background: "#FFE36E" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px 64px" }}>
          <div style={{ width: 96, height: 96, borderRadius: 16, background: "#12302A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
            <img src={`data:image/png;base64,${logo.toString("base64")}`} width={53} height={60} alt="" />
          </div>
          <div style={{ fontFamily: "Plex Serif", fontSize: 84, lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 900 }}>{V6_H1}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Plex Mono", fontSize: 24, letterSpacing: "0.06em", textTransform: "uppercase", color: "#5C6270" }}>{V6_CATEGORY}</div>
            <div style={{ display: "flex", gap: 10 }}>
              {swatches.map((c) => (
                <div key={c} style={{ width: 28, height: 28, borderRadius: 9999, background: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...SOCIAL_SIZE,
      fonts: [
        { name: "Plex Serif", data: serif, style: "normal", weight: 400 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
