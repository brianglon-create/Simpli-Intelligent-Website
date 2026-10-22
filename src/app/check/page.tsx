import { CheckLanding } from "@/components/marketing/CheckLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { readFoundingStatus } from "@/lib/leads/store";
import { flushFoundingAlerts } from "@/lib/leads/submit";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Simpli Check waitlist | Simpli Intelligent",
  description:
    "Simpli Check is inspection software from a working home inspector, built to cut report-writing time. Join the waitlist. Coming to founding members.",
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
