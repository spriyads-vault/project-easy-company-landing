import { DocsArticle } from "@crado/site-active";
import Introduction from "@/components/docs-site/content/Introduction";
import { DOCS_PAGES, docsMetadata } from "@/lib/docs-pages";

const PAGE = DOCS_PAGES[0];

export const metadata = docsMetadata(PAGE);

export default function DocsIntroduction() {
  return (
    <DocsArticle page={PAGE}>
      <Introduction />
    </DocsArticle>
  );
}
