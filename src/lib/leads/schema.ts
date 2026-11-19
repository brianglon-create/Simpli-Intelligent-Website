import { z } from "zod";
import { EMAIL_ONLY_NAME, NOT_COLLECTED, leadFormSource } from "@/lib/leads/form-kind";
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

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Enter a valid email address.")
  .max(200, "Enter a valid email address.")
  .pipe(z.email("Enter a valid email address."));

const consentField = z.literal(true, "Consent is required before we can email you.");

const interestField = z.enum(
  PRODUCT_INTERESTS,
  "Choose what you want to hear about.",
);

const campaignFields = {
  source: optionalText(200),
  utmSource: optionalText(200),
  utmMedium: optionalText(200),
  utmCampaign: optionalText(200),
  utmContent: optionalText(200),
  utmTerm: optionalText(200),
  page: optionalText(80),
};

function campaignBase(value: {
  source: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  page: string | null;
}): string | null {
  return value.source || value.utmSource || value.utmCampaign || value.page;
}

const updatesSchema = z
  .object({
    formKind: z.literal("updates"),
    email: emailField,
    interest: interestField,
    consent: consentField,
    ...campaignFields,
  })
  .transform(
    (value): LeadInput => ({
      name: EMAIL_ONLY_NAME,
      company: NOT_COLLECTED,
      email: value.email,
      stateProvince: NOT_COLLECTED,
      currentSoftware: NOT_COLLECTED,
      productInterest: value.interest,
      reportCount: null,
      narrativeLibrarySize: null,
      source: leadFormSource("updates", campaignBase(value)),
      utmSource: value.utmSource,
      utmMedium: value.utmMedium,
      utmCampaign: value.utmCampaign,
      utmContent: value.utmContent,
      utmTerm: value.utmTerm,
      page: value.page,
    }),
  );

const migrationSchema = z
  .object({
    formKind: z.literal("migration"),
    name: z.string().trim().min(1, "Enter your name.").max(120, "Name is too long."),
    company: z
      .string()
      .trim()
      .min(1, "Enter your business name.")
      .max(200, "Business name is too long."),
    email: emailField,
    stateProvince: z
      .string()
      .trim()
      .refine((value) => REGION_SET.has(value), "Choose a state or province."),
    currentSoftware: z
      .string()
      .trim()
      .min(1, "Enter your current inspection software.")
      .max(120, "Software name is too long."),
    narrativeLibrarySize: optionalText(200),
    reportCount: optionalText(200),
    interest: interestField,
    consent: consentField,
    ...campaignFields,
  })
  .transform(
    (value): LeadInput => ({
      name: value.name.replace(/[\r\n]+/g, " ").trim(),
      company: value.company.replace(/[\r\n]+/g, " ").trim(),
      email: value.email,
      stateProvince: value.stateProvince,
      currentSoftware: value.currentSoftware.replace(/[\r\n]+/g, " ").trim(),
      productInterest: value.interest,
      reportCount: value.reportCount,
      narrativeLibrarySize: value.narrativeLibrarySize,
      source: leadFormSource("migration", campaignBase(value)),
      utmSource: value.utmSource,
      utmMedium: value.utmMedium,
      utmCampaign: value.utmCampaign,
      utmContent: value.utmContent,
      utmTerm: value.utmTerm,
      page: value.page,
    }),
  );

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
    reportCount: optionalText(200),
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
      narrativeLibrarySize: null,
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

function requestSchema(raw: unknown) {
  if (raw && typeof raw === "object" && "formKind" in raw) {
    const kind = (raw as { formKind?: unknown }).formKind;
    if (kind === "updates") return updatesSchema;
    if (kind === "migration") return migrationSchema;
  }
  return leadRequestSchema;
}

export function parseLead(raw: unknown): ParseResult {
  if (isHoneypot(raw)) return { ok: true, honeypot: true };
  const parsed = requestSchema(raw).safeParse(raw);
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
