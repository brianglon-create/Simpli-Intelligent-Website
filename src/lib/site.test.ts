import { describe, expect, it } from "vitest";
import { NAV_LINKS, PRODUCTS, SITE } from "@/lib/site";

describe("site configuration", () => {
  it("keeps contact email in a single configurable constant", () => {
    expect(SITE.contactEmail).toBe("brianglon@gmail.com");
    expect(SITE.url).toBe("https://simpliintelligent.com");
  });

  it("defines the public product family without external app URLs", () => {
    expect(PRODUCTS).toHaveLength(3);
    for (const product of PRODUCTS) {
      expect(JSON.stringify(product)).not.toMatch(/vercel\.app/i);
    }
  });

  it("keeps navigation targets on the same page", () => {
    for (const link of NAV_LINKS) {
      expect(link.href.startsWith("#")).toBe(true);
    }
  });
});
