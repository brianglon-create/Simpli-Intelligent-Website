import { CheckLanding } from "@/components/marketing/CheckLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { flushFoundingAlerts } from "@/lib/leads/submit";
import { pageMetadata } from "@/lib/metadata";
import { CHECK_HEADLINE, CHECK_PRICE_LINE } from "@/lib/offer-copy";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Simpli Check | Simpli Intelligent",
  description: `${CHECK_HEADLINE} ${CHECK_PRICE_LINE}`,
  path: "/check",
});

export default async function CheckPage() {
  await flushFoundingAlerts();
  return (
    <SiteFrame>
      <CheckLanding />
    </SiteFrame>
  );
}
