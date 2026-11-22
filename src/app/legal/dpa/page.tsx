import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_DOCS } from "@/lib/legal/docs";
import { pageMetadata } from "@/lib/metadata";

const doc = LEGAL_DOCS[4];

export const metadata = pageMetadata({
  title: "Data Processing Addendum | Simpli Intelligent",
  description: "Data Processing Addendum. Version v1.1, effective November 22, 2026.",
  path: doc.href,
});

export default function DpaPage() {
  return <LegalDocument doc={doc} />;
}
