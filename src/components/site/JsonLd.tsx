import { jsonLd } from "@/lib/site";

export default function JsonLd({ nodes }: { nodes: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(...nodes) }} />;
}
