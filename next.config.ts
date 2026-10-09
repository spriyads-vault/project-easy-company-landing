import path from "node:path";
import type { NextConfig } from "next";

/**
 * NEXT_PUBLIC_FF_HOMEPAGE_V6 (default off) swaps the site for the v6 light design at build time. Three modules
 * are chosen by alias rather than by a runtime branch, so only the active design's code and fonts are in the
 * build: with the flag off, the bundle (and the preloaded fonts) are exactly what they were before v6.
 *   @crado/home-active   the "/" page (src/home/v3 or src/home/v6)
 *   @crado/fonts-active  the root layout's fonts (v3 faces, or IBM Plex preloaded on every page)
 *   @crado/site-active   docs layout, docs article and primitives, legal page and 404 (src/site/v3.ts or v6.ts)
 * See src/lib/flags.ts for the same flag read at runtime.
 */
const HOMEPAGE_V6 = ["1", "true", "on"].includes((process.env.NEXT_PUBLIC_FF_HOMEPAGE_V6 ?? "").toLowerCase());

const ALIASES = {
  "@crado/home-active": HOMEPAGE_V6 ? "./src/home/v6/HomePage.tsx" : "./src/home/v3/HomePage.tsx",
  "@crado/fonts-active": HOMEPAGE_V6 ? "./src/app/fonts-v6.ts" : "./src/app/fonts.ts",
  "@crado/site-active": HOMEPAGE_V6 ? "./src/site/v6.ts" : "./src/site/v3.ts",
};

const nextConfig: NextConfig = {
  // Lets Playwright build the flag-on site next to the flag-off one (see playwright.config.ts).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: { resolveAlias: ALIASES },
  webpack(config) {
    for (const [name, target] of Object.entries(ALIASES)) config.resolve.alias[name] = path.resolve(import.meta.dirname, target);
    return config;
  },
  async redirects() {
    // 301s from the SEO hand-off's redirect map (statusCode, not `permanent`, which would send 308).
    return [
      { source: "/docs/core-concepts", destination: "/docs/concepts", statusCode: 301 },
      { source: "/docs/get-started", destination: "/docs", statusCode: 301 },
    ];
  },
};

export default nextConfig;
