"use client";

import type { SuccessBody } from "@/lib/leads/types";
import { SITE } from "@/lib/site";

export type LeadPostResult =
  | { ok: true; body: SuccessBody }
  | { ok: false; message: string; fields?: Record<string, string> };

export function campaignFields() {
  if (typeof window === "undefined") {
    return {
      source: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
    };
  }
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => {
    const value = params.get(key)?.trim() ?? "";
    return value ? value.slice(0, 200) : null;
  };
  return {
    source: pick("source"),
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmContent: pick("utm_content"),
    utmTerm: pick("utm_term"),
  };
}

export async function postLead(
  payload: Record<string, unknown>,
): Promise<LeadPostResult> {
  const fallback = `We couldn't save that. Email ${SITE.contactEmail} and we'll add you manually.`;
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as
      | SuccessBody
      | { ok: false; message?: string; fields?: Record<string, string> };
    if (response.ok && body.ok) return { ok: true, body };
    if ("fields" in body && body.fields) {
      return {
        ok: false,
        message: "Check the highlighted fields and try again.",
        fields: body.fields,
      };
    }
    return {
      ok: false,
      message: ("message" in body && body.message) || fallback,
    };
  } catch {
    return { ok: false, message: fallback };
  }
}
