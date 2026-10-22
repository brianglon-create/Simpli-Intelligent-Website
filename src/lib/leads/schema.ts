import { z } from "zod";
import { REGION_SET } from "@/lib/regions";
import { PRODUCT_INTERESTS, type Interest, type LeadInput } from "@/lib/leads/types";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((value) => {
      const trimmed = value?.replace(/[\r\n]+/g, " ").trim() ?? "";
      return trimmed ? trimmed : null;
    });

const leadRequestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Enter your name.")
      .max(120, "Name is too long."),
    company: z
      .string()
      .trim()
      .min(1, "Enter your business name.")
      .max(200, "Business name is too long."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Enter a valid email address.")
      .max(200, "Enter a valid email address.")
      .pipe(z.email("Enter a valid email address.")),
    stateProvince: z
      .string()
      .trim()
      .refine((value) => REGION_SET.has(value), "Choose a state or province."),
    software: z.enum(
      ["horizon", "other"],
      "Choose your current inspection software.",
    ),
    softwareOther: optionalText(120),
    interest: z.enum(
      PRODUCT_INTERESTS,
      "Choose what you want to hear about.",
    ),
    reportCount: optionalText(40),
    consent: z.literal(true, "Consent is required before we can email you."),
    source: optionalText(200),
    utmSource: optionalText(200),
    utmMedium: optionalText(200),
    utmCampaign: optionalText(200),
    utmContent: optionalText(200),
    utmTerm: optionalText(200),
    page: optionalText(80),
  })
  .transform((value): LeadInput => {
    const softwareOther = value.software === "horizon" ? null : value.softwareOther;
    const currentSoftware =
      value.software === "horizon"
        ? "Horizon"
        : softwareOther
          ? `Other: ${softwareOther}`
          : "Other";
    const source =
      value.source || value.utmSource || value.utmCampaign || value.page;

    return {
      name: value.name.replace(/[\r\n]+/g, " ").trim(),
      company: value.company.replace(/[\r\n]+/g, " ").trim(),
      email: value.email,
      stateProvince: value.stateProvince,
      currentSoftware,
      productInterest: value.interest,
      reportCount: value.reportCount,
      source,
      utmSource: value.utmSource,
      utmMedium: value.utmMedium,
      utmCampaign: value.utmCampaign,
      utmContent: value.utmContent,
      utmTerm: value.utmTerm,
      page: value.page,
    };
  });

export type ParseResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; lead: LeadInput }
  | { ok: false; fields: Record<string, string> };

function isHoneypot(raw: unknown): boolean {
  if (!raw || typeof raw !== "object") return false;
  const token = (raw as { hp_token?: unknown }).hp_token;
  return typeof token === "string" && token.trim() !== "";
}

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && fields[key] === undefined) {
      fields[key] = issue.message;
    }
  }
  if (Object.keys(fields).length === 0) {
    fields.form = "Check the form and try again.";
  }
  return fields;
}

export function parseLead(raw: unknown): ParseResult {
  if (isHoneypot(raw)) return { ok: true, honeypot: true };
  const parsed = leadRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, fields: fieldErrors(parsed.error) };
  }
  return { ok: true, honeypot: false, lead: parsed.data };
}

export function isInterest(value: unknown): value is Interest {
  return (
    typeof value === "string" &&
    (PRODUCT_INTERESTS as readonly string[]).includes(value)
  );
}
