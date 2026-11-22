import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_DOCS } from "@/lib/legal/docs";
import { pageMetadata } from "@/lib/metadata";

const doc = LEGAL_DOCS[6];

export const metadata = pageMetadata({
  title: "Data Access, Retention and Deletion | Simpli Intelligent",
  description: "Data Access, Retention and Deletion Policy. Version 1.1, effective November 22, 2026.",
  path: doc.href,
});

export default function DataRetentionPage() {
  return <LegalDocument doc={doc} />;
}