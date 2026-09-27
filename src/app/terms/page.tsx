import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions | Crado",
  description: "Terms governing use of the Crado website and pilot services.",
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
