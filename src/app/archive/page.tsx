import { ArchiveLanding } from "@/components/marketing/ArchiveLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/metadata";
import { ARCHIVE_STANDALONE_PRICE, SHUTDOWN_LABEL } from "@/lib/offers";

export const metadata = pageMetadata({
  title: "Simpli Archive | Simpli Intelligent",
  description: `Horizon exports end ${SHUTDOWN_LABEL}. Simpli Archive keeps inspection reports searchable. ${ARCHIVE_STANDALONE_PRICE}`,
  path: "/archive",
});

export default function ArchivePage() {
  return (
    <SiteFrame>
      <ArchiveLanding />
    </SiteFrame>
  );
}
