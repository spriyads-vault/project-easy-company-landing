import type { ReactNode } from "react";
import { DocsNavProvider } from "@/components/docs-site/DocsNav";
import SiteShellV6 from "../SiteShellV6";
import { DocsBarV6, DocsRailV6, DocsSidebarV6, DocsTocAboveV6 } from "./DocsNavV6";

/** Header (64) and docs bar (48) heights, matching --v6-nav-height and --v6-docs-bar; the sidebar shows from 1024. */
const LAYOUT = { drawerBelow: 1024, navHeight: 64, barHeight: 48 };

/**
 * v6 docs layout (SCRUM-296). 1440: 240px sidebar, 72ch content, 200px "On this page" rail. 1024 to 1279: sidebar
 * and content, the list above the content. Below 1024 (834, 390): one column, the sidebar becomes the contents
 * drawer, and the list above the content collapses by default at 640 and below.
 */
export default function DocsLayoutV6({ children }: { children: ReactNode }) {
  return (
    <SiteShellV6 source="docs" docs>
      <DocsNavProvider {...LAYOUT}>
        <DocsBarV6 />
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[minmax(0,1fr)] items-start gap-x-12 px-(--v6-gutter) v6d:grid-cols-[240px_minmax(0,72ch)] v6d:justify-center v6w:grid-cols-[240px_minmax(0,72ch)_200px]">
          <DocsSidebarV6 />
          <main id="main" className="mx-auto w-full max-w-[72ch] min-w-0 pt-10 pb-24 v6d:pt-14 v6d:pb-[120px]">
            <DocsTocAboveV6 />
            {children}
          </main>
          <DocsRailV6 />
        </div>
      </DocsNavProvider>
    </SiteShellV6>
  );
}
