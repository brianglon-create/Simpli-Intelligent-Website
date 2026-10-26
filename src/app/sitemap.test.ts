import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("lists the platform pages and leaves the thank-you page out", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual([
      "https://simpliintelligent.com/",
      "https://simpliintelligent.com/horizon",
      "https://simpliintelligent.com/archive",
      "https://simpliintelligent.com/check",
      "https://simpliintelligent.com/operate",
      "https://simpliintelligent.com/reach",
      "https://simpliintelligent.com/privacy",
    ]);
  });
});
