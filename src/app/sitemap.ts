import type { MetadataRoute } from "next";
import { DOC_GROUPS } from "@/lib/docs";
import { SITE_URL } from "@/lib/site";

// Only public, canonical routes. Update lastModified when a page's content changes.
const HOME_UPDATED = new Date("2026-10-01");
const DOCS_UPDATED = new Date("2026-09-28");
const PRIVACY_UPDATED = new Date("2026-09-28");
const TERMS_UPDATED = new Date("2026-09-04");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: HOME_UPDATED },
    ...DOC_GROUPS.map((g) => ({ url: `${SITE_URL}${g.path}`, lastModified: DOCS_UPDATED })),
    { url: `${SITE_URL}/privacy`, lastModified: PRIVACY_UPDATED },
    { url: `${SITE_URL}/terms`, lastModified: TERMS_UPDATED },
  ];
}
