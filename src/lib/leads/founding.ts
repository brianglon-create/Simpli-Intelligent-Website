import type { FoundingSnapshot, Interest } from "@/lib/leads/types";

export const FOUNDING_CAP = 100;
export const TIER_49_CAP = 50;
export const TIER_69_CAP = 50;
export const FOUNDING_PRICE_49 = 49;
export const FOUNDING_PRICE_69 = 69;
export const ALERT_THRESHOLDS = [40, 50, 90, 100] as const;

export type FoundingDecision = {
  action: "create" | "upgrade" | "duplicate";
  foundingSpot: number | null;
  nextCount: number;
};

/**
 * Founding spots are only for Simpli Check interest (`check` or `both`).
 * Keep this in sync with submit_lead() in
 * supabase/migrations/20261022160000_create_leads.sql.
 */
export function wantsFounding(interest: Interest): boolean {
  return interest === "check" || interest === "both";
}

export function priceForSpot(spot: number | null): 49 | 69 | null {
  if (spot == null) return null;
  if (spot >= 1 && spot <= TIER_49_CAP) return FOUNDING_PRICE_49;
  if (spot <= FOUNDING_CAP) return FOUNDING_PRICE_69;
  return null;
}

/** Position inside the $49 tier (1–50) or the $69 tier (1–50 of spots 51–100). */
export function tierPosition(spot: number): number | null {
  if (spot >= 1 && spot <= TIER_49_CAP) return spot;
  if (spot > TIER_49_CAP && spot <= FOUNDING_CAP) return spot - TIER_49_CAP;
  return null;
}

/** Thank-you screen and the inspector's confirmation email. */
export function foundingSpotSentence(spot: number): string | null {
  const position = tierPosition(spot);
  if (position == null) return null;
  if (spot <= TIER_49_CAP) {
    return `You're spot ${position} of the first ${TIER_49_CAP}, locked in line for the $${FOUNDING_PRICE_49}/month founding rate.`;
  }
  return `You're spot ${position} of the next ${TIER_69_CAP} (spots ${TIER_49_CAP + 1}-${FOUNDING_CAP}), in line for the $${FOUNDING_PRICE_69}/month founding rate.`;
}

/** Compact line for Brian's notification and threshold emails. */
export function foundingSpotLabel(spot: number): string | null {
  const position = tierPosition(spot);
  if (position == null) return null;
  if (spot <= TIER_49_CAP) {
    return `${position} of the first ${TIER_49_CAP} ($${FOUNDING_PRICE_49}/month)`;
  }
  return `${position} of the next ${TIER_69_CAP} (spots ${TIER_49_CAP + 1}-${FOUNDING_CAP}) ($${FOUNDING_PRICE_69}/month)`;
}

export function foundingSnapshot(
  count: number,
  configured: boolean,
): FoundingSnapshot {
  const safe = Math.max(0, count);
  return {
    configured,
    count: safe,
    closed: safe >= FOUNDING_CAP,
    tier49Remaining: Math.max(0, TIER_49_CAP - safe),
    tier69Remaining: Math.max(0, FOUNDING_CAP - Math.max(safe, TIER_49_CAP)),
  };
}

export function pendingAlerts(
  count: number,
  alreadySent: readonly number[],
): number[] {
  return ALERT_THRESHOLDS.filter(
    (threshold) => count >= threshold && !alreadySent.includes(threshold),
  );
}

export function decideSignup(
  count: number,
  existing: { productInterest: Interest; foundingSpot: number | null } | null,
  interest: Interest,
): FoundingDecision {
  const wants = wantsFounding(interest);

  if (!existing) {
    if (wants && count < FOUNDING_CAP) {
      const spot = count + 1;
      return { action: "create", foundingSpot: spot, nextCount: spot };
    }
    return { action: "create", foundingSpot: null, nextCount: count };
  }

  const alreadyOnCheck =
    existing.productInterest === "check" || existing.productInterest === "both";
  const canClaim = wants && existing.foundingSpot == null && !alreadyOnCheck;

  if (canClaim && count < FOUNDING_CAP) {
    const spot = count + 1;
    return { action: "upgrade", foundingSpot: spot, nextCount: spot };
  }

  if (canClaim) {
    return { action: "upgrade", foundingSpot: null, nextCount: count };
  }

  return {
    action: "duplicate",
    foundingSpot: existing.foundingSpot,
    nextCount: count,
  };
}
