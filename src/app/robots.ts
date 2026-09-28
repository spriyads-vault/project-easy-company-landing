import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// robots.txt is a crawl preference, not access control. There were no
// crawler-specific (including model-training) rules before this file; add any
// here rather than replacing the default below.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
