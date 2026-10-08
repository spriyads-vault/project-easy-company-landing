import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Public canonical routes (SEO hand-off sitemap plus /docs/trust). Update lastModified when content changes.
const UPDATED = new Date("2026-10-08");

const PATHS = ["/", "/docs", "/docs/concepts", "/docs/evaluation", "/docs/reference", "/docs/trust", "/docs/changelog"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`, lastModified: UPDATED }));
}
