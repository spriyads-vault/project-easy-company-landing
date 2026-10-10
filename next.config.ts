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
const on = (v: string | undefined) => ["1", "true", "on"].includes((v ?? "").toLowerCase());
const HOMEPAGE_V6 = on(process.env.NEXT_PUBLIC_FF_HOMEPAGE_V6);

/**
 * NEXT_PUBLIC_FF_SECTION_PAGES (SCRUM-310, needs HOMEPAGE_V6): /how-it-works, /agents, /coverage, /faq and /waitlist.
 * They are served by src/app/section-pages/[section] through rewrites added only while the flag is on, so with it
 * off the site has no new top-level route at all and every other URL behaves as before. Same rule as
 * src/lib/flags.ts SECTION_PAGES.
 */
const SECTION_PAGES = HOMEPAGE_V6 && on(process.env.NEXT_PUBLIC_FF_SECTION_PAGES);
const SECTION_SLUGS = ["how-it-works", "agents", "coverage", "faq", "waitlist"];

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
  async rewrites() {
    if (!SECTION_PAGES) return [];
    return SECTION_SLUGS.map((slug) => ({ source: `/${slug}`, destination: `/section-pages/${slug}` }));
  },
  async redirects() {
    // 301s from the SEO hand-off's redirect map (statusCode, not `permanent`, which would send 308).
    return [
      { source: "/docs/core-concepts", destination: "/docs/concepts", statusCode: 301 },
      { source: "/docs/get-started", destination: "/docs", statusCode: 301 },
      // The internal route of the section pages is never a public URL (its share images stay under it).
      ...(SECTION_PAGES ? SECTION_SLUGS.map((slug) => ({ source: `/section-pages/${slug}`, destination: `/${slug}`, statusCode: 301 as const })) : []),
    ];
  },
};

export default nextConfig;
