/**
 * The site modules while NEXT_PUBLIC_FF_HOMEPAGE_V8 is on (next.config.ts): the v3 docs content and primitives, inside
 * the v8 shell (announcement bar, header, footer, terracotta accent). Same names as src/site/v3.ts
 * (src/site/contract.ts checks it).
 */
import type { Viewport } from "next";

export { default as DocsLayout } from "./v8/DocsLayoutV8";
export { default as DocsArticle } from "@/components/docs-site/DocsArticle";
export { A, Bullet, Callout, CodeBlock, H2, H3, Lead, Mono, P, Pill, StateBadge, Table, slugify } from "@/components/docs-site/ui-v3";
export { default as LegalPage } from "./v8/LegalPageV8";
export { default as NotFound } from "./v8/NotFoundV8";

/** Route viewport for docs and legal pages: dark, the v8 page colour. */
export const siteViewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0D0D0F",
};
