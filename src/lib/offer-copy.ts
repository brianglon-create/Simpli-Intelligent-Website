/**
 * Customer-facing name for the first 100 Simpli Check signups.
 * Change this string to rename the offer in pages, metadata, and emails.
 * Database columns, API routes, and code identifiers stay as they are.
 */
export const OFFER_NAME = "Early Access";

export const OFFER_INSPECTOR = `${OFFER_NAME} Inspector`;
export const OFFER_INSPECTORS = `${OFFER_NAME} Inspectors`;

export const OFFER_SPOTS_AVAILABLE = `${OFFER_NAME} spots are available.`;

export function offerRateLine(price49: number, price69: number): string {
  return `${OFFER_NAME} rate: $${price49}/month (first 50), $${price69}/month (next 50).`;
}

export const FOUNDER_SUPPORT =
  "Personal onboarding and support directly from the founder.";

export const FOUNDER_FOLLOW_UP = "The founder will follow up personally.";

export const INSPECTOR_BYLINE =
  "Built by a home inspector with 10 years of hands-on industry experience.";

/** Use this sentence wherever public copy explains that Simpli Check is a waitlist. */
export const CHECK_WAITLIST_STATUS =
  "Join the waitlist for our expected November launch.";

export const CHECK_HERO = `${INSPECTOR_BYLINE} Simpli Check is inspection software designed around how inspectors actually work, not a sales team. ${CHECK_WAITLIST_STATUS}`;

export const CHECK_FEATURES_INTRO = `Report writing is what eats your evenings. Simpli Check is built to give that time back. These features launch with Simpli Check in November, and ${OFFER_INSPECTORS} get them first.`;
