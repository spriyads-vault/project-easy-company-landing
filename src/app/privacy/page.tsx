import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";
import { PRIVACY } from "@/lib/legal";

export const metadata = pageMetadata({
  title: "Privacy Policy | Crado",
  description: "How BloomX Analytica Limited (Crado) collects, uses, and shares personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
