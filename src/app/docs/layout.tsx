import SiteShell from "@/components/site/SiteShell";
import { DocsMobileBar, DocsNavProvider, DocsRail, DocsSidebar } from "@/components/docs-site/DocsNav";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <SiteShell variant="docs">
      <DocsNavProvider>
        <DocsMobileBar />
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] items-start gap-12 px-5 font-sans sm:grid-cols-[240px_minmax(0,1fr)] sm:px-8 xl:grid-cols-[260px_minmax(0,1fr)_200px] xl:gap-16">
          <DocsSidebar />
          <main id="main" className="flex min-w-0 justify-center pt-10 pb-24 sm:pt-14 sm:pb-[120px]">
            {children}
          </main>
          <DocsRail />
        </div>
      </DocsNavProvider>
    </SiteShell>
  );
}
