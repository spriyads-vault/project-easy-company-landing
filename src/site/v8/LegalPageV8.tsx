import { LegalBody } from "@/components/LegalPage";
import type { LegalDoc } from "@/lib/legal";
import SiteShellV8 from "./SiteShellV8";

/** Privacy and Terms inside the v8 shell. */
export default function LegalPageV8({ doc }: { doc: LegalDoc }) {
  return (
    <SiteShellV8>
      <LegalBody doc={doc} />
    </SiteShellV8>
  );
}
