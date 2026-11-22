/**
 * Drop-in targets for checkout, login, and Terms & Conditions.
 * Real values belong in these environment variables:
 *
 * - NEXT_PUBLIC_SIMPLI_CHECK_CHECKOUT_URL → simpliCheckUrl
 * - NEXT_PUBLIC_SIMPLI_ARCHIVE_CHECKOUT_URL → archiveStandaloneUrl
 * - NEXT_PUBLIC_SIMPLI_ARCHIVE_ADDON_CHECKOUT_URL → archiveAddonUrl
 * - NEXT_PUBLIC_CHECKOUT_SUCCESS_URL → successUrl (defaults to /welcome)
 * - NEXT_PUBLIC_CHECKOUT_CANCEL_URL → cancelUrl
 * - NEXT_PUBLIC_LOGIN_URL → loginUrl
 * - NEXT_PUBLIC_TERMS_URL → termsUrl (defaults to /legal/terms)
 *
 * Until a product checkout URL is set, buy buttons stay on a placeholder
 * and the draft must not be read as a working checkout.
 */

function readPublic(name: string): string | undefined {
  const raw = process.env[name];
  if (typeof raw !== "string") return undefined;
  const value = raw.replace(/\r\n|\r|\n/g, "").trim();
  return value || undefined;
}

/** Sentinel used when a URL has not been supplied. Not a live destination. */
export const UNCONFIGURED_URL = "unconfigured";

export const CHECKOUT = {
  simpliCheckUrl:
    readPublic("NEXT_PUBLIC_SIMPLI_CHECK_CHECKOUT_URL") ?? UNCONFIGURED_URL,
  archiveStandaloneUrl:
    readPublic("NEXT_PUBLIC_SIMPLI_ARCHIVE_CHECKOUT_URL") ?? UNCONFIGURED_URL,
  archiveAddonUrl:
    readPublic("NEXT_PUBLIC_SIMPLI_ARCHIVE_ADDON_CHECKOUT_URL") ?? UNCONFIGURED_URL,
  successUrl: readPublic("NEXT_PUBLIC_CHECKOUT_SUCCESS_URL") ?? "/welcome",
  cancelUrl: readPublic("NEXT_PUBLIC_CHECKOUT_CANCEL_URL") ?? UNCONFIGURED_URL,
  loginUrl: readPublic("NEXT_PUBLIC_LOGIN_URL") ?? UNCONFIGURED_URL,
  termsUrl: readPublic("NEXT_PUBLIC_TERMS_URL") ?? "/legal/terms",
} as const;

export function isConfiguredUrl(value: string): boolean {
  if (!value || value === UNCONFIGURED_URL) return false;
  return (
    value.startsWith("/") ||
    value.startsWith("https://") ||
    value.startsWith("http://")
  );
}

export function checkoutIsConnected(): boolean {
  return (
    isConfiguredUrl(CHECKOUT.simpliCheckUrl) &&
    isConfiguredUrl(CHECKOUT.archiveStandaloneUrl) &&
    isConfiguredUrl(CHECKOUT.archiveAddonUrl)
  );
}

/** Draft checkout copy stays off the production site. Preview and local builds still show it. */
export function showDraftCheckoutNote(): boolean {
  return process.env.VERCEL_ENV !== "production" && !checkoutIsConnected();
}
