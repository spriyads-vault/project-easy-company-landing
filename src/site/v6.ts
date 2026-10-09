/**
 * The v6 (light) site modules (SCRUM-296): what @crado/site-active resolves to while NEXT_PUBLIC_FF_HOMEPAGE_V6 is
 * on (next.config.ts). Same names as src/site/v3.ts (src/site/contract.ts checks it). Every page here wears the v6
 * announcement, header and footer with the waitlist (SiteShellV6) and loads site.css.
 */
import type { Viewport } from "next";

export { default as DocsLayout } from "./v6/docs/DocsLayoutV6";
export { default as DocsArticle } from "./v6/docs/DocsArticleV6";
export { A, Bullet, Callout, CodeBlock, H2, H3, Lead, Mono, P, Pill, StateBadge, Table, slugify } from "./v6/docs/ui";
export { default as LegalPage } from "./v6/LegalPageV6";
export { default as NotFound } from "./v6/NotFoundV6";

/** Route viewport for docs and legal pages: light, as the v6 homepage. */
export const siteViewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F8F7F6",
};
