import type { MetadataRoute } from "next";
import { DOC_GROUPS } from "@/lib/docs";
import { SITE_URL } from "@/lib/site";

// Only public, canonical routes. Update lastModified when a page's content changes.
const SITE_REFRESH = new Date("2026-09-28");
const LEGAL_UPDATED = new Date("2026-09-04");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: SITE_REFRESH },
    ...DOC_GROUPS.map((g) => ({ url: `${SITE_URL}${g.path}`, lastModified: SITE_REFRESH })),
    { url: `${SITE_URL}/privacy`, lastModified: LEGAL_UPDATED },
    { url: `${SITE_URL}/terms`, lastModified: LEGAL_UPDATED },
  ];
}
