import { SITE } from "@/lib/site";

let warnedBadSupabaseUrl = false;
let warnedNormalizedSupabaseUrl = false;

function read(name: string): string | undefined {
  const raw = process.env[name];
  if (typeof raw !== "string") return undefined;
  const value = raw.replace(/\r\n|\r|\n/g, "").trim();
  return value ? value : undefined;
}

/**
 * Turn a pasted project ref or host into the Data API origin.
 * Drops a trailing `/rest/v1` path and extra slashes. The Supabase client
 * adds `/rest/v1` itself, so leaving it on the project URL doubles the path.
 * Returns null when the value cannot be used. Never logs the raw value.
 */
export function normalizeSupabaseUrl(input: string): string | null {
  const value = input.replace(/[\r\n\t ]+/g, "").replace(/^['"]+|['"]+$/g, "");
  if (!value) return null;

  if (/^[a-z0-9]{20}$/i.test(value)) {
    return `https://${value.toLowerCase()}.supabase.co`;
  }

  const refFromHost = value.match(/([a-z0-9]{20})\.supabase\.co/i);
  if (refFromHost && !/^https:\/\//i.test(value)) {
    return `https://${refFromHost[1].toLowerCase()}.supabase.co`;
  }

  if (!/^https?:\/\//i.test(value)) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const hostRef = url.hostname
      .toLowerCase()
      .match(/^(?:db\.)?([a-z0-9]{20})\.supabase\.co$/);
    if (hostRef) return `https://${hostRef[1]}.supabase.co`;
    if (url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

/** Project URL from Supabase → Project Settings → API. Server only. */
export function supabaseUrl(): string | undefined {
  const raw = read("SUPABASE_URL");
  if (!raw) return undefined;
  const normalized = normalizeSupabaseUrl(raw);
  if (!normalized) {
    if (!warnedBadSupabaseUrl) {
      warnedBadSupabaseUrl = true;
      console.error(
        "SUPABASE_URL is not a usable project URL. In Supabase open Project Settings → API and copy the Project URL. It looks like https://<project-ref>.supabase.co. A 20-character project ref is also accepted. The raw value was not logged.",
      );
    }
    return undefined;
  }
  if (normalized !== raw.replace(/\/+$/, "") && !warnedNormalizedSupabaseUrl) {
    warnedNormalizedSupabaseUrl = true;
    console.warn(`SUPABASE_URL was normalized to ${normalized}.`);
  }
  return normalized;
}

/** Test helper. Clears the one-time SUPABASE_URL warnings. */
export function resetSupabaseUrlWarningForTests(): void {
  warnedBadSupabaseUrl = false;
  warnedNormalizedSupabaseUrl = false;
}

/** The only env var the server uses as the Supabase admin key. */
export const SUPABASE_SERVICE_ROLE_KEY_NAME = "SUPABASE_SERVICE_ROLE_KEY";

/**
 * Service role key. Bypasses row level security. Never prefix with
 * NEXT_PUBLIC_ and never send it to the browser.
 * Surrounding quotes are removed so a pasted `"eyJ..."` still works.
 */
export function supabaseServiceKey(): string | undefined {
  const value = read(SUPABASE_SERVICE_ROLE_KEY_NAME);
  if (!value) return undefined;
  const unquoted = value.replace(/^['"]+|['"]+$/g, "").trim();
  return unquoted || undefined;
}

export function hasSupabase(): boolean {
  return Boolean(supabaseUrl() && supabaseServiceKey());
}

/** Inbox for signup notifications and founding-spot alerts. */
export function leadNotifyEmail(): string {
  return read("LEAD_NOTIFY_EMAIL") ?? SITE.contactEmail;
}

export function emailFrom(): string | undefined {
  return read("EMAIL_FROM");
}

export function resendApiKey(): string | undefined {
  return read("RESEND_API_KEY");
}

export function canSendEmail(): boolean {
  return Boolean(resendApiKey() && emailFrom() && leadNotifyEmail());
}

/**
 * Mailing address for the privacy page and confirmation emails.
 * CASL and CAN-SPAM want a postal address. Falls back to the city we
 * already publish. Set POSTAL_ADDRESS before commercial email goes out.
 */
export function mailingAddress(): string {
  const postal = read("POSTAL_ADDRESS");
  if (postal) return `${SITE.brandLine}, ${postal}`;
  return `${SITE.brandLine}, ${SITE.location}`;
}
