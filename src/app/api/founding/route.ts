import { readFoundingStatus } from "@/lib/leads/store";
import {
  FOUNDING_CAP,
  FOUNDING_PRICE_49,
  FOUNDING_PRICE_69,
  TIER_49_CAP,
  TIER_69_CAP,
} from "@/lib/leads/founding";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const status = await readFoundingStatus();
  return Response.json(
    {
      configured: status.configured,
      closed: status.closed,
      available: status.configured && !status.closed,
      cap: FOUNDING_CAP,
      tier49Cap: TIER_49_CAP,
      tier69Cap: TIER_69_CAP,
      tier49Price: FOUNDING_PRICE_49,
      tier69Price: FOUNDING_PRICE_69,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
