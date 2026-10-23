import { ArchiveLanding } from "@/components/marketing/ArchiveLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { readFoundingStatus } from "@/lib/leads/store";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Simpli Archive | Keep Horizon reports",
  description:
    "Simpli Archive is $19 the first month, then $9/month. Keep Horizon inspection reports searchable after December 15, 2026, alongside any software you use next.",
  path: "/archive",
});

export default async function ArchivePage() {
  const status = await readFoundingStatus();
  return (
    <SiteFrame>
      <ArchiveLanding status={status} />
    </SiteFrame>
  );
}
