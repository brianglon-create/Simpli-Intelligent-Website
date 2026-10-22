import { describe, expect, it } from "vitest";
import { formatIndianapolis } from "@/lib/datetime";
import { foundingSpotLabel, foundingSpotSentence } from "@/lib/leads/founding";
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
  it("names a place inside the first 50 and the next 50", () => {
    expect(foundingSpotSentence(1)).toBe(
      "You're spot 1 of the first 50, locked in line for the $49/month founding rate.",
    );
    expect(foundingSpotSentence(51)).toBe(
      "You're spot 1 of the next 50 (spots 51-100), in line for the $69/month founding rate.",
    );
    expect(foundingSpotLabel(1)).toBe("1 of the first 50 ($49/month)");
    expect(foundingSpotLabel(51)).toBe("1 of the next 50 (spots 51-100) ($69/month)");
    expect(foundingSpotLabel(100)).toBe("50 of the next 50 (spots 51-100) ($69/month)");
  });

  it("uses that wording on the thank-you screen, confirmation, and Brian's emails", () => {
    expect(thankYouCopy({
      ok: true,
      duplicate: false,
      upgraded: false,
      interest: "both",
      foundingSpot: 51,
      foundingPrice: 69,
      foundingClosed: false,
      notified: true,
    }).paragraphs[0]).toBe(
      "You're spot 1 of the next 50 (spots 51-100), in line for the $69/month founding rate.",
    );

    expect(leadConfirmation(lead(1)).text).toContain(
      "You're spot 1 of the first 50, locked in line for the $49/month founding rate.",
    );

    const notice = signupNotification({
      lead: lead(1),
      duplicate: false,
      upgraded: false,
      previousInterest: null,
      foundingCount: 1,
    });
    expect(notice.text).toContain("Founding spot: 1 of the first 50 ($49/month)");
    expect(notice.text).toContain("Signed up: Oct 22, 2026, 3:32 PM ET");
    expect(notice.text).not.toContain("2026-10-22T19:32:00.000Z");

    const alert = thresholdNotification(90, 90);
    expect(alert.subject).toBe(
      "Simpli Check founding spots: 40 of the next 50 (spots 51-100) ($69/month)",
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
