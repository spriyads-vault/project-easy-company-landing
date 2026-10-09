/**
 * The v3 (dark) site modules: what @crado/site-active resolves to while NEXT_PUBLIC_FF_HOMEPAGE_V6 is off
 * (next.config.ts). src/site/v6.ts exports the same names in the v6 light design; src/site/contract.ts checks that
 * the two stay interchangeable.
 */
import type { Viewport } from "next";

export { default as DocsLayout } from "@/components/docs-site/DocsLayout";
export { default as DocsArticle } from "@/components/docs-site/DocsArticle";
export { A, Bullet, Callout, CodeBlock, H2, H3, Lead, Mono, P, Pill, StateBadge, Table, slugify } from "@/components/docs-site/ui-v3";
export { default as LegalPage } from "@/components/LegalPage";
export { default as NotFound } from "@/components/site/NotFound";

/** Route viewport for docs and legal pages: nothing beyond the root layout's (dark). */
export const siteViewport: Viewport = {};
