import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_DOCS } from "@/lib/legal/docs";
import { pageMetadata } from "@/lib/metadata";

const doc = LEGAL_DOCS[5];

export const metadata = pageMetadata({
  title: "Acceptable Use | Simpli Intelligent",
  description: "Acceptable Use and AI Assistance Addendum. Version v1.1, effective November 22, 2026.",
  path: doc.href,
});

export default function AcceptableUsePage() {
  return <LegalDocument doc={doc} />;
}
