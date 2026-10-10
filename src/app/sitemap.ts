import type { MetadataRoute } from "next";
import { SECTION_SLUGS } from "@/content/section-pages";
import { SECTION_PAGES } from "@/lib/flags";
import { SITE_URL } from "@/lib/site";

// Public canonical routes (SEO hand-off sitemap plus /docs/trust). Update lastModified when content changes.
const UPDATED = new Date("2026-10-08");

const PATHS = ["/", "/docs", "/docs/concepts", "/docs/evaluation", "/docs/reference", "/docs/trust", "/docs/changelog"];

/**
 * The section pages (SCRUM-310), while they are on; /waitlist is indexable, so it is listed too. With SCROLL_SECTIONS
 * on they are off: the section paths are the homepage (canonical "/"), so only "/" is listed.
 */
const SECTION_PATHS = SECTION_PAGES ? SECTION_SLUGS.map((s) => `/${s}`) : [];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...PATHS.slice(0, 1), ...SECTION_PATHS, ...PATHS.slice(1)].map((path) => ({ url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`, lastModified: UPDATED }));
}
