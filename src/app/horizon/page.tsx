import { HorizonLanding } from "@/components/marketing/HorizonLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { flushFoundingAlerts } from "@/lib/leads/submit";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Horizon shuts down December 15 | Simpli Intelligent",
  description:
    "Horizon export tools stop December 15, 2026. Simpli Archive keeps inspection report history searchable. Simpli Check is where you write the next report.",
  path: "/horizon",
});

export default async function HorizonPage() {
  await flushFoundingAlerts();
  return (
    <SiteFrame>
      <HorizonLanding />
    </SiteFrame>
  );
}
