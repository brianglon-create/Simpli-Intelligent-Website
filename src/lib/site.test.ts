import { describe, expect, it } from "vitest";
import { NAV_LINKS, PRODUCTS, SITE } from "@/lib/site";

describe("site configuration", () => {
  it("keeps contact email in a single configurable constant", () => {
    expect(SITE.contactEmail).toBe("brian@simpliintelligent.com");
    expect(SITE.url).toBe("https://simpliintelligent.com");
  });

  it("defines the public product family without external app URLs", () => {
    expect(PRODUCTS.map((product) => product.name)).toEqual([
      "SIMPLI CHECK",
      "SIMPLI OPERATE",
      "SIMPLI ARCHIVE",
      "SIMPLI REACH",
    ]);
    for (const product of PRODUCTS) {
      expect(JSON.stringify(product)).not.toMatch(/vercel\.app/i);
      expect(product.name).not.toMatch(/inspect/i);
      expect(product.href.startsWith("/")).toBe(true);
    }
  });

  it("links the platform nav to product routes", () => {
    expect(NAV_LINKS.map((link) => link.href)).toEqual([
      "/check",
      "/operate",
      "/archive",
      "/reach",
      "/horizon",
      "/#about",
      "/#contact",
    ]);
  });
});
