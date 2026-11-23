import { readFileSync } from "node:fs";
import path from "node:path";

export type LegalDoc = {
  slug: string;
  href: string;
  label: string;
  file: string;
};

export const LEGAL_DOCS: readonly LegalDoc[] = [
  {
    slug: "terms",
    href: "/legal/terms",
    label: "Master SaaS Terms",
    file: "terms.txt",
  },
  {
    slug: "check-schedule",
    href: "/legal/check-schedule",
    label: "Simpli Check Product Schedule",
    file: "check-schedule.txt",
  },
  {
    slug: "archive-schedule",
    href: "/legal/archive-schedule",
    label: "Simpli Archive Product Schedule",
    file: "archive-schedule.txt",
  },
  {
    slug: "privacy",
    href: "/legal/privacy",
    label: "Privacy Policy",
    file: "privacy.txt",
  },
  {
    slug: "dpa",
    href: "/legal/dpa",
    label: "Data Processing Addendum",
    file: "dpa.txt",
  },
  {
    slug: "acceptable-use",
    href: "/legal/acceptable-use",
    label: "Acceptable Use & AI Addendum",
    file: "acceptable-use.txt",
  },
  {
    slug: "data-retention",
    href: "/legal/data-retention",
    label: "Data Access, Retention & Deletion Policy",
    file: "data-retention.txt",
  },
] as const;

export function readLegalFile(file: string): string {
  return readFileSync(path.join(process.cwd(), "src/content/legal", file), "utf8");
}
