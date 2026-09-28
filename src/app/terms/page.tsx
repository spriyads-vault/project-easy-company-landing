import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";
import { TERMS } from "@/lib/legal";

export const metadata = pageMetadata({
  title: "Terms and Conditions | Crado",
  description: "Terms governing use of the Crado website and pilot services.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
