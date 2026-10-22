import { describe, expect, it } from "vitest";
import {
  decideSignup,
  foundingSnapshot,
  pendingAlerts,
  priceForSpot,
} from "@/lib/leads/founding";
import { createMemoryStore } from "@/lib/leads/memory-store";
import type { LeadInput } from "@/lib/leads/types";

function input(index: number, interest: LeadInput["productInterest"] = "check"): LeadInput {
  return {
    name: `Inspector ${index}`,
    company: `Company ${index}`,
    email: `inspector${index}@example.com`,
    stateProvince: "Ontario",
    currentSoftware: "Horizon",
    productInterest: interest,
    reportCount: null,
    source: "test",
    utmSource: null,
    utmMedium: null,
    utmCampaign: "dec15",
    utmContent: null,
    utmTerm: null,
    page: "/horizon",
  };
}

describe("founding spots", () => {
  it("prices the first 50 at $49 and the next 50 at $69", () => {
    expect(priceForSpot(1)).toBe(49);
    expect(priceForSpot(50)).toBe(49);
    expect(priceForSpot(51)).toBe(69);
    expect(priceForSpot(100)).toBe(69);
    expect(priceForSpot(null)).toBeNull();
  });

  it("closes after 100 and reports remaining spots", () => {
    expect(foundingSnapshot(12, true)).toMatchObject({
      count: 12,
      closed: false,
      tier49Remaining: 38,
      tier69Remaining: 50,
    });
    expect(foundingSnapshot(60, true)).toMatchObject({
      tier49Remaining: 0,
      tier69Remaining: 40,
      closed: false,
    });
    expect(foundingSnapshot(100, true).closed).toBe(true);
    expect(foundingSnapshot(0, false).configured).toBe(false);
  });

  it("alerts at 40, 50, 90, and 100, once each", () => {
    expect(pendingAlerts(39, [])).toEqual([]);
    expect(pendingAlerts(40, [])).toEqual([40]);
    expect(pendingAlerts(100, [40, 50])).toEqual([90, 100]);
  });

  it("does not spend a founding spot on Archive, Operate, or Reach", () => {
    expect(decideSignup(0, null, "archive").foundingSpot).toBeNull();
    expect(decideSignup(0, null, "operate").foundingSpot).toBeNull();
    expect(decideSignup(4, null, "reach").nextCount).toBe(4);
    expect(decideSignup(4, null, "both")).toMatchObject({
      action: "create",
      foundingSpot: 5,
      nextCount: 5,
    });
  });

  it("upgrades an earlier list signup onto the next Check spot", () => {
    expect(
      decideSignup(7, { productInterest: "archive", foundingSpot: null }, "check"),
    ).toMatchObject({ action: "upgrade", foundingSpot: 8, nextCount: 8 });
    expect(
      decideSignup(100, { productInterest: "operate", foundingSpot: null }, "both"),
    ).toMatchObject({ action: "upgrade", foundingSpot: null, nextCount: 100 });
  });

  it("treats a second Check signup as a duplicate", () => {
    expect(
      decideSignup(3, { productInterest: "check", foundingSpot: 3 }, "both"),
    ).toMatchObject({ action: "duplicate", foundingSpot: 3, nextCount: 3 });
  });

  it("never assigns more than 100 spots under concurrent signups", async () => {
    const store = createMemoryStore();
    await Promise.all(
      Array.from({ length: 120 }, (_, index) => store.save(input(index))),
    );
    const status = await store.status();
    expect(status.count).toBe(100);
    expect(status.closed).toBe(true);
  });
});
