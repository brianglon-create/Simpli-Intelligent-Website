import { CheckLanding } from "@/components/marketing/CheckLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { readFoundingStatus } from "@/lib/leads/store";
import { flushFoundingAlerts } from "@/lib/leads/submit";
import { CHECK_HERO } from "@/lib/offer-copy";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Simpli Check waitlist | Simpli Intelligent",
  description:
    CHECK_HERO,
  path: "/check",
});

export default async function CheckPage() {
  const status = await readFoundingStatus();
  await flushFoundingAlerts();
  return (
    <SiteFrame>
      <CheckLanding status={status} />
    </SiteFrame>
  );
}
