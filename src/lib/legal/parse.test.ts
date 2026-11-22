import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { legalText, parseLegal } from "@/lib/legal/parse";

const dir = path.join(process.cwd(), "src/content/legal");

describe("legal documents", () => {
  it("keeps every approved line when formatting headings and tables", () => {
    for (const file of readdirSync(dir)) {
      const raw = readFileSync(path.join(dir, file), "utf8");
      const source = raw
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n");
      expect(legalText(parseLegal(raw)), file).toBe(source);
      expect(source).toContain("v1.1");
      expect(source.toLowerCase()).toContain("november 22, 2026");
    }
  });
});
