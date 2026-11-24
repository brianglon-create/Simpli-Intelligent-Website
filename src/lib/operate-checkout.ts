import { isUsStateCode } from "@/lib/us-states";

function readPublic(name: string): string | undefined {
  const raw = process.env[name];
  if (typeof raw !== "string") return undefined;
  const value = raw.replace(/\r\n|\r|\n/g, "").trim();
  return value || undefined;
}

/** Browser POST target. Override for a non-production Operate host. */
export const OPERATE_CHECKOUT_URL =
  readPublic("NEXT_PUBLIC_OPERATE_CHECKOUT_URL") ??
  "https://simpli-operate.vercel.app/api/public/checkout";

/** Cloudflare Turnstile site key. Public by design. */
export const TURNSTILE_SITE_KEY =
  readPublic("NEXT_PUBLIC_TURNSTILE_SITE_KEY") ?? "0x4AAAAAAGPYQ66NVrsqup_f";

/** Display only. The server sets the charged amount. */
export const CHECK_SEAT_PRICE_USD = 49;

export const CHECK_SEAT_MIN = 1;
export const CHECK_SEAT_MAX = 4;

export type CheckOrderContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CheckOrderAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: "US";
};

export type CheckOrderBody = {
  product: "simpli_check";
  seats: number;
  turnstileToken: string;
  contact: CheckOrderContact;
  companyName: string;
  billingAddress: CheckOrderAddress;
  source: "website";
};

export type CheckOrderInput = {
  seats: number;
  turnstileToken: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
};

export type OrderFailureKind = "network" | "unavailable" | "invalid" | "incomplete";

export type OrderResult =
  | { ok: true; orderUrl: string }
  | {
      ok: false;
      kind: OrderFailureKind;
      detail?: string;
      fields?: Record<string, string>;
    };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function checkOrderTotalUsd(seats: number): number {
  return CHECK_SEAT_PRICE_USD * seats;
}

export function validateCheckOrder(
  input: CheckOrderInput,
): { ok: true; body: CheckOrderBody } | { ok: false; fields: Record<string, string> } {
  const fields: Record<string, string> = {};
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim();
  const phone = phoneDigits(input.phone);
  const companyName = input.companyName.trim();
  const line1 = input.line1.trim();
  const line2 = input.line2.trim();
  const city = input.city.trim();
  const state = input.state.trim().toUpperCase();
  const zip = input.zip.trim();
  const turnstileToken = input.turnstileToken.trim();

  if (!Number.isInteger(input.seats) || input.seats < CHECK_SEAT_MIN || input.seats > CHECK_SEAT_MAX) {
    fields.seats = "Choose 1 to 4 inspectors.";
  }
  if (!firstName) fields.firstName = "Enter a first name.";
  if (!lastName) fields.lastName = "Enter a last name.";
  if (!EMAIL.test(email)) fields.email = "Enter an email address.";
  if (phone.length < 10) fields.phone = "Enter a phone number with at least 10 digits.";
  if (!companyName) fields.companyName = "Enter the company name.";
  if (!line1) fields.line1 = "Enter the street address.";
  if (!city) fields.city = "Enter the city.";
  if (!isUsStateCode(state)) fields.state = "Choose a state.";
  if (!/^\d{5}$/.test(zip)) fields.zip = "Enter a 5-digit ZIP code.";
  if (!turnstileToken) fields.turnstileToken = "Complete the security check.";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  const billingAddress: CheckOrderAddress = {
    line1,
    city,
    state,
    zip,
    country: "US",
  };
  if (line2) billingAddress.line2 = line2;

  return {
    ok: true,
    body: {
      product: "simpli_check",
      seats: input.seats,
      turnstileToken,
      contact: { firstName, lastName, email, phone },
      companyName,
      billingAddress,
      source: "website",
    },
  };
}

function detailFrom(body: unknown): { detail?: string; fields?: Record<string, string> } {
  if (!body || typeof body !== "object") return {};
  const record = body as Record<string, unknown>;
  const raw =
    typeof record.message === "string"
      ? record.message
      : typeof record.error === "string"
        ? record.error
        : "";
  const detail = raw.trim().slice(0, 280) || undefined;
  const source = record.errors ?? record.fields;
  if (!source || typeof source !== "object") return { detail };
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === "string" && value.trim()) fields[key] = value.trim().slice(0, 180);
    else if (Array.isArray(value) && typeof value[0] === "string") fields[key] = value[0].trim().slice(0, 180);
  }
  return { detail, fields: Object.keys(fields).length ? fields : undefined };
}

export async function submitCheckOrder(body: CheckOrderBody): Promise<OrderResult> {
  const idempotencyKey = crypto.randomUUID();
  let response: Response;
  try {
    response = await fetch(OPERATE_CHECKOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, kind: "network" };
  }

  let parsed: unknown = null;
  try {
    parsed = await response.json();
  } catch {
    parsed = null;
  }

  if (response.status === 201) {
    const orderUrl =
      parsed && typeof parsed === "object" && typeof (parsed as { orderUrl?: unknown }).orderUrl === "string"
        ? (parsed as { orderUrl: string }).orderUrl
        : "";
    if (orderUrl.startsWith("https://")) return { ok: true, orderUrl };
    return { ok: false, kind: "incomplete" };
  }

  const extra = detailFrom(parsed);
  if (response.status >= 500) return { ok: false, kind: "unavailable", ...extra };
  return { ok: false, kind: "invalid", ...extra };
}
