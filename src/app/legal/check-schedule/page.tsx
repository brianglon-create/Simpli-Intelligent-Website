import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_DOCS } from "@/lib/legal/docs";
import { pageMetadata } from "@/lib/metadata";

const doc = LEGAL_DOCS[1];

export const metadata = pageMetadata({
  title: "Simpli Check Product Schedule | Simpli Intelligent",
  description: "Schedule A, Simpli Check product terms. Version v1.1, effective November 22, 2026.",
  path: doc.href,
});

export default function CheckSchedulePage() {
  return <LegalDocument doc={doc} />;
}
