import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — Crado",
  description: "How BloomX Analytica Limited (Crado) collects, uses, and shares personal data.",
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
