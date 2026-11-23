/** Stored in leads.source. No new database column. */
export const FORM_SOURCE = {
  updates: "form:updates",
  migration: "form:migration",
} as const;

export type PublicFormKind = keyof typeof FORM_SOURCE;

export const EMAIL_ONLY_NAME = "Email signup";
export const NOT_COLLECTED = "Not collected";

export function leadFormSource(
  kind: PublicFormKind,
  campaignSource: string | null,
): string {
  const prefix = FORM_SOURCE[kind];
  if (!campaignSource) return prefix;
  if (campaignSource === prefix || campaignSource.startsWith(`${prefix}|`)) {
    return campaignSource.slice(0, 200);
  }
  return `${prefix}|${campaignSource}`.slice(0, 200);
}

export function sourceFormKind(source: string | null): PublicFormKind | null {
  if (!source) return null;
  if (source === FORM_SOURCE.updates || source.startsWith(`${FORM_SOURCE.updates}|`)) {
    return "updates";
  }
  if (
    source === FORM_SOURCE.migration ||
    source.startsWith(`${FORM_SOURCE.migration}|`)
  ) {
    return "migration";
  }
  return null;
}
