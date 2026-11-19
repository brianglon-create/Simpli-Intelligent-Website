import { describe, expect, it } from "vitest";
import { parseLead } from "@/lib/leads/schema";

const valid = {
  name: "Jane Doe",
  company: "North Example Inspections",
  email: "Jane@Example.com",
  stateProvince: "Ontario",
  software: "horizon",
  interest: "both",
  consent: true,
  page: "/horizon",
  source: "internachi",
  utmSource: "facebook",
  utmMedium: "post",
  utmCampaign: "dec15",
  utmContent: "checklist",
  utmTerm: "horizon",
};

describe("lead schema", () => {
  it("normalizes email and keeps campaign attribution", () => {
    const parsed = parseLead(valid);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok || parsed.honeypot) return;
    expect(parsed.lead.email).toBe("jane@example.com");
    expect(parsed.lead.currentSoftware).toBe("Horizon");
    expect(parsed.lead.source).toBe("internachi");
    expect(parsed.lead.utmCampaign).toBe("dec15");
    expect(parsed.lead.productInterest).toBe("both");
  });

  it("falls back to the campaign when source is blank", () => {
    const parsed = parseLead({ ...valid, source: "  " });
    expect(parsed.ok).toBe(true);
    if (!parsed.ok || parsed.honeypot) return;
    expect(parsed.lead.source).toBe("facebook");
  });

  it("requires consent and a real region", () => {
    const parsed = parseLead({ ...valid, consent: false, stateProvince: "Atlantis" });
    expect(parsed.ok).toBe(false);
    if (parsed.ok) return;
    expect(parsed.fields.consent).toMatch(/consent/i);
    expect(parsed.fields.stateProvince).toMatch(/state or province/i);
  });

  it("treats a filled honeypot as spam before validation", () => {
    const parsed = parseLead({ hp_token: "http://spam.example", name: "" });
    expect(parsed).toEqual({ ok: true, honeypot: true });
  });

  it("stores other software with the name the inspector typed", () => {
    const parsed = parseLead({
      ...valid,
      software: "other",
      softwareOther: "Spectora",
      interest: "operate",
    });
    expect(parsed.ok).toBe(true);
    if (!parsed.ok || parsed.honeypot) return;
    expect(parsed.lead.currentSoftware).toBe("Other: Spectora");
    expect(parsed.lead.productInterest).toBe("operate");
  });

  it("accepts an email-only update without inventing a region", () => {
    const parsed = parseLead({
      formKind: "updates",
      email: "Ada@Example.com",
      interest: "check",
      consent: true,
      page: "/check",
      utmSource: "newsletter",
    });
    expect(parsed.ok).toBe(true);
    if (!parsed.ok || parsed.honeypot) return;
    expect(parsed.lead.email).toBe("ada@example.com");
    expect(parsed.lead.name).toBe("Email signup");
    expect(parsed.lead.stateProvince).toBe("Not collected");
    expect(parsed.lead.productInterest).toBe("check");
    expect(parsed.lead.source).toBe("form:updates|newsletter");
    expect(parsed.lead.reportCount).toBeNull();
  });

  it("packs migration help into the existing report count column", () => {
    const parsed = parseLead({
      formKind: "migration",
      name: "Ada Inspect",
      company: "Ada Inspections",
      email: "ada@example.com",
      stateProvince: "Indiana",
      currentSoftware: "The software I use now",
      narrativeLibrarySize: "1200",
      reportCount: "400",
      interest: "both",
      consent: true,
      page: "/horizon",
    });
    expect(parsed.ok).toBe(true);
    if (!parsed.ok || parsed.honeypot) return;
    expect(parsed.lead.currentSoftware).toBe("The software I use now");
    expect(parsed.lead.reportCount).toBe("lib:1200; reports:400");
    expect(parsed.lead.source).toBe("form:migration|/horizon");
  });
});
