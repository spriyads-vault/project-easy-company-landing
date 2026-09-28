import DocsShell from "@/components/docs/DocsShell";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import SkipLink from "@/components/site/SkipLink";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="min-h-screen bg-oat font-sans text-ink">
      <SkipLink target="doc-main" />
      <AnnouncementBar />
      <SiteHeader />
      <DocsShell>{children}</DocsShell>
      <SiteFooter />
    </div>
  );
}
