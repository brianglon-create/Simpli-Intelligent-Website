import { HorizonLanding } from "@/components/marketing/HorizonLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { readFoundingStatus } from "@/lib/leads/store";
import { flushFoundingAlerts } from "@/lib/leads/submit";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Horizon shuts down December 15 | Simpli Intelligent",
  description:
    "Horizon export tools stop December 15, 2026. Simpli Archive keeps inspection report history searchable. Simpli Check is the inspector-built waitlist for shorter report writing.",
  path: "/horizon",
});

export default async function HorizonPage() {
  const status = await readFoundingStatus();
  await flushFoundingAlerts();
  return (
    <SiteFrame>
      <HorizonLanding status={status} />
    </SiteFrame>
  );
}
