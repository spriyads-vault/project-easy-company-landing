import { LegalPage } from "@crado/site-active";
import { pageMetadata } from "@/lib/site";
import { TERMS } from "@/lib/legal";

export { siteViewport as viewport } from "@crado/site-active";

export const metadata = pageMetadata({
  title: "Terms and Conditions | Crado",
  description: "Terms governing use of the Crado website and pilot services.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
