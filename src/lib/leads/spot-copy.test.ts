import { describe, expect, it } from "vitest";
import { formatIndianapolis } from "@/lib/datetime";
import { foundingSpotLabel, publicFoundingLine } from "@/lib/leads/founding";
import { leadConfirmation, signupNotification, thresholdNotification } from "@/lib/leads/notify";
import { thankYouCopy } from "@/lib/leads/thank-you";
import type { StoredLead } from "@/lib/leads/types";

function lead(spot: number): StoredLead {
  return {
    id: "lead-1",
    createdAt: "2026-10-22T19:32:00.000Z",
    name: "Casey Inspector",
    company: "Lakeshore Home Inspections",
    email: "casey@example.com",
    stateProvince: "Indiana",
    currentSoftware: "Horizon",
    productInterest: "both",
    reportCount: "1600",
    source: "cahpi",
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
    utmTerm: null,
    page: "/horizon",
    leadStatus: "New",
    foundingSpot: spot,
  };
}

describe("founding spot wording", () => {
  it("keeps the spot number for internal email and leaves it out of public copy", () => {
    expect(publicFoundingLine(49)).toBe(
      "You're in line for an Early Access spot at $49/month (first 50).",
    );
    expect(publicFoundingLine(69)).toBe(
      "You're in line for an Early Access spot at $69/month (next 50).",
    );
    expect(foundingSpotLabel(1)).toBe("1 of the first 50 ($49/month)");
    expect(foundingSpotLabel(51)).toBe("1 of the next 50 (spots 51-100) ($69/month)");
    expect(foundingSpotLabel(100)).toBe("50 of the next 50 (spots 51-100) ($69/month)");
  });

  it("uses the tier price in public copy and the spot number only in internal emails", () => {
    const thankYou = thankYouCopy({
      ok: true,
      duplicate: false,
      upgraded: false,
      interest: "both",
      foundingSpot: 51,
      foundingPrice: 69,
      foundingClosed: false,
      notified: true,
    });
    expect(thankYou.paragraphs[0]).toBe(
      "You're in line for an Early Access spot at $69/month (next 50).",
    );
    expect(thankYou.paragraphs.join(" ")).not.toMatch(/you're spot \d/i);
    expect(thankYou.paragraphs.join(" ")).not.toContain("51");

    const confirmation = leadConfirmation(lead(51));
    expect(confirmation.text).toContain(
      "You're in line for an Early Access spot at $69/month (next 50).",
    );
    expect(confirmation.text).toContain(
      "Simpli Intelligent, a brand of Polaris Intelligence LLC",
    );
    expect(confirmation.text).not.toMatch(/you're spot \d/i);
    expect(confirmation.text).not.toContain("51");
    expect(confirmation.text).not.toMatch(/\(R\)|®|™/);
    expect(confirmation.text).toContain("The founder will follow up personally.");
    expect(confirmation.text).not.toMatch(/\bBrian\b/);
    expect(confirmation.text).not.toMatch(/north star/i);
    expect(confirmation.text).toContain(
      "Prefer to talk? Reply to this email or email brian@simpliintelligent.com.",
    );
    expect(confirmation.text).not.toMatch(/book 15 minutes/i);
    expect(confirmation.text).toContain("Simpli Archive storage resumes at $9/month.");

    const checkOnly = leadConfirmation({ ...lead(12), productInterest: "check" });
    expect(checkOnly.text).toContain(
      "You're in line for an Early Access spot at $49/month (first 50). That includes personal onboarding and support directly from the founder.",
    );
    expect(checkOnly.text).not.toContain("Archive storage resumes");
    expect(checkOnly.text).not.toContain("Simpli Archive storage resumes");

    const checkThankYou = thankYouCopy({
      ok: true,
      duplicate: false,
      upgraded: false,
      interest: "check",
      foundingSpot: null,
      foundingPrice: 49,
      foundingClosed: false,
      notified: true,
    });
    expect(checkThankYou.paragraphs.join(" ")).toContain(
      "That includes personal onboarding and support directly from the founder.",
    );
    expect(checkThankYou.paragraphs.join(" ")).not.toMatch(/archive storage resumes/i);

    const notice = signupNotification({
      lead: lead(1),
      duplicate: false,
      upgraded: false,
      previousInterest: null,
      foundingCount: 1,
    });
    expect(notice.text).toContain("Early Access spot: 1 of the first 50 ($49/month)");
    expect(notice.text).toContain("Early Access spots claimed: 1");
    expect(notice.text).toContain("Signed up: Oct 22, 2026, 3:32 PM ET");
    expect(notice.text).not.toContain("2026-10-22T19:32:00.000Z");

    const alert = thresholdNotification(90, 90);
    expect(alert.subject).toBe(
      "Simpli Check Early Access spots: 40 of the next 50 (spots 51-100) ($69/month)",
    );
    expect(alert.text).toMatch(/Sent: .+ ET/);
  });
});

describe("formatIndianapolis", () => {
  it("renders Eastern Time for Indianapolis and rejects a bad value", () => {
    expect(formatIndianapolis("2026-10-22T19:32:00.000Z")).toBe("Oct 22, 2026, 3:32 PM ET");
    expect(formatIndianapolis("not-a-date")).toBe("(unknown time)");
  });
});
