import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_DOCS } from "@/lib/legal/docs";
import { pageMetadata } from "@/lib/metadata";

const doc = LEGAL_DOCS[2];

export const metadata = pageMetadata({
  title: "Simpli Archive Product Schedule | Simpli Intelligent",
  description: "Schedule B, Simpli Archive product terms. Version v1.1, effective November 22, 2026.",
  path: doc.href,
});

export default function ArchiveSchedulePage() {
  return <LegalDocument doc={doc} />;
}
