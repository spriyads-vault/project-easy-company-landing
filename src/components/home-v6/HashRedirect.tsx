"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HASH_PATHS } from "./links";

/**
 * Old shared links (SCRUM-310): on the homepage, a hash that names a section with its own page now (#agents,
 * #faq, the v3 #change-review…) is swapped for that page's path. router.replace, so no history entry is added and
 * Back skips the old URL. Rendered only while SECTION_PAGES is on.
 */
export default function HashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const go = () => {
      const path = HASH_PATHS[decodeURIComponent(window.location.hash.slice(1))];
      if (path) router.replace(path);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [router]);
  return null;
}
