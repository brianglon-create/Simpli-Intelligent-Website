import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_DOCS } from "@/lib/legal/docs";
import { pageMetadata } from "@/lib/metadata";

const doc = LEGAL_DOCS[0];

export const metadata = pageMetadata({
  title: "Master SaaS Terms | Simpli Intelligent",
  description: "Master Software-as-a-Service Terms of Service. Version 1.1, effective November 22, 2026.",
  path: doc.href,
});

export default function TermsLegalPage() {
  return <LegalDocument doc={doc} />;
}
