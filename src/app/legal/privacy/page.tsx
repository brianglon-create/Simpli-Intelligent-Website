import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_DOCS } from "@/lib/legal/docs";
import { pageMetadata } from "@/lib/metadata";

const doc = LEGAL_DOCS[3];

export const metadata = pageMetadata({
  title: "Privacy Policy | Simpli Intelligent",
  description: "Privacy policy for all U.S. states. Version v1.1, effective November 22, 2026.",
  path: doc.href,
});

export default function PrivacyLegalPage() {
  return <LegalDocument doc={doc} />;
}
