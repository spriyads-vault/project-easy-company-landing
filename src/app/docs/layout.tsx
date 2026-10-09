import { DocsLayout } from "@crado/site-active";

export { siteViewport as viewport } from "@crado/site-active";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return <DocsLayout>{children}</DocsLayout>;
}
