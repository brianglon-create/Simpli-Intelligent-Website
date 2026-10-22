import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function filesIn(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...filesIn(full));
    else if (/\.(ts|tsx|css|md)$/.test(entry) && !entry.endsWith("naming.test.ts")) {
        files.push(full);
      }
  }
  return files;
}

describe("product naming", () => {
  it("does not use the taken inspection product name", () => {
    const files = filesIn(path.join(process.cwd(), "src"));
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      expect(text.toLowerCase(), file).not.toContain("simpli inspect");
    }
  });

  it("keeps Check feature placeholders marked for Brian", () => {
    const files = filesIn(path.join(process.cwd(), "src"));
    const combined = files.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(combined).toContain("TODO(check-features)");
    expect(combined).toContain("TODO(archive-search)");
    expect(combined).toContain("TODO(archive-formats)");
    expect(combined).toContain("TODO(horizon-export-clicks)");
    expect(combined).toContain("TODO(archive-check-integration)");
  });
});
