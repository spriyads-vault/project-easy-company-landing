import type { ReactNode } from "react";
import { DocsBody } from "@/components/docs-site/DocsLayout";
import SiteShellV8 from "./SiteShellV8";

/** The docs layout inside the v8 shell: the v3 sidebar, content and rail, with the v8 header, footer and accent. */
export default function DocsLayoutV8({ children }: { children: ReactNode }) {
  return (
    <SiteShellV8 current="/docs">
      <DocsBody>{children}</DocsBody>
    </SiteShellV8>
  );
}
