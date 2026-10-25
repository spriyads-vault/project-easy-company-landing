import { DocsArticle } from "@crado/site-active";
import Introduction from "@/components/docs-site/content/Introduction";
import Overview from "@/components/docs-site/spec/Overview";
import { DOCS_PAGES, docsMetadata } from "@/lib/docs-pages";
import { DOCS_SPEC } from "@/lib/flags";

const PAGE = DOCS_PAGES[0];

export const metadata = docsMetadata(PAGE);

/** With NEXT_PUBLIC_FF_DOCS_SPEC on, /docs is the specification overview; otherwise the introduction as before. */
export default function DocsIntroduction() {
  return <DocsArticle page={PAGE}>{DOCS_SPEC ? <Overview /> : <Introduction />}</DocsArticle>;
}
