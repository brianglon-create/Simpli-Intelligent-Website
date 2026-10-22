import { CheckLanding } from "@/components/marketing/CheckLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { bookingUrl } from "@/lib/env";
import { readFoundingStatus } from "@/lib/leads/store";
import { flushFoundingAlerts } from "@/lib/leads/submit";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Simpli Check waitlist | Simpli Intelligent",
  description:
    "Join the Simpli Check waitlist. Founding pricing is $49/month for the first 50 inspectors and $69/month for the next 50, while spots remain.",
  path: "/check",
});

export default async function CheckPage() {
  const status = await readFoundingStatus();
  await flushFoundingAlerts();
  return (
    <SiteFrame>
      <CheckLanding status={status} bookingUrl={bookingUrl()} />
    </SiteFrame>
  );
}
