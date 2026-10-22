import { SITE } from "@/lib/site";

function read(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

/** Project URL from Supabase → Project Settings → API. Server only. */
export function supabaseUrl(): string | undefined {
  return read("SUPABASE_URL");
}

/**
 * Service role key. Bypasses row level security. Never prefix with
 * NEXT_PUBLIC_ and never send it to the browser.
 */
export function supabaseServiceKey(): string | undefined {
  return read("SUPABASE_SERVICE_ROLE_KEY");
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

/** Cal.com or Calendly link. Empty until Brian sets it. */
export function bookingUrl(): string | null {
  return read("NEXT_PUBLIC_BOOKING_URL") ?? null;
}

/**
 * Mailing address for the privacy page and confirmation emails.
 * CASL and CAN-SPAM want a postal address. Falls back to the city we
 * already publish. Set POSTAL_ADDRESS before commercial email goes out.
 */
export function mailingAddress(): string {
  const postal = read("POSTAL_ADDRESS");
  if (postal) return `${SITE.legalEntity}, ${postal}`;
  return `${SITE.legalEntity}, ${SITE.location}`;
}
