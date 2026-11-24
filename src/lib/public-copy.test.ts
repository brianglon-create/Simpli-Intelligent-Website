import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function filesIn(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...filesIn(full));
    else if (/\.(ts|tsx)$/.test(entry) && !entry.includes(".test.")) files.push(full);
  }
  return files;
}

const banned = [
  /\bAI\b/,
  /identifies the defect/i,
  /waitlist/i,
  /launching november/i,
  /early access/i,
  /unlimited reports/i,
  /office staff/i,
  /admin seat/i,
  /discounted access/i,
  /brian@/i,
  /north star/i,
  /simpli simpli/i,
  /\$69/,
  /before you pay/i,
  /defect recognition/i,
  /counsel/i,
  /20[\u2013-]30/,
  /offline/i,
  /response time/i,
  /testimonial/i,
  /stripe connect/i,
];

describe("public copy", () => {
  it("keeps blocked claims and old offer language off the site", () => {
    const roots = [
      path.join(process.cwd(), "src/app"),
      path.join(process.cwd(), "src/components"),
      path.join(process.cwd(), "src/lib/offer-copy.ts"),
      path.join(process.cwd(), "src/lib/check-shots.ts"),
      path.join(process.cwd(), "src/lib/operate-checkout.ts"),
      path.join(process.cwd(), "src/lib/offers.ts"),
      path.join(process.cwd(), "src/lib/site.ts"),
      path.join(process.cwd(), "src/lib/leads/thank-you.ts"),
    ];
    const files = roots.flatMap((root) => (statSync(root).isDirectory() ? filesIn(root) : [root]));
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      const legalPage = file.includes(`${path.sep}app${path.sep}legal${path.sep}`);
      for (const pattern of banned) {
        if (legalPage && pattern.source === "\\bAI\\b") continue;
        expect(text, `${file} matches ${pattern}`).not.toMatch(pattern);
      }
    }
  });
});
