import DocsPage, { docsMetadata } from "@/components/docs/DocsPage";
import { DOC_GROUPS } from "@/lib/docs";

export const metadata = docsMetadata(DOC_GROUPS[0]);

export default function DocsHome() {
  return <DocsPage group={DOC_GROUPS[0]} />;
}
