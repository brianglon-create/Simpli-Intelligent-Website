/**
 * Site-wide configuration.
 * contactEmail is the public address shown on the site and in fallback messages.
 */
export const SITE = {
  name: "Simpli Intelligent",
  wordmark: "SIMPLI INTELLIGENT",
  url: "https://simpliintelligent.com",
  contactEmail: "hello@simpliintelligent.com",
  legalEntity: "Polaris Intelligence LLC",
  /** Parent company and brand. Do not add a trademark symbol. */
  brandLine: "Simpli Intelligent, a brand of Polaris Intelligence LLC",
  location: "South Bend, Indiana",
  copyrightYear: 2026,
  title: "Simpli Intelligent | Simple Software for Owner-Operated Businesses",
  description:
    "Simpli Intelligent is the platform behind a family of products that help owner-operated businesses grow, organize, and operate with confidence.",
} as const;

export const NAV_LINKS = [
  { href: "/check", label: "Simpli Check" },
  { href: "/archive", label: "Simpli Archive" },
  { href: "/horizon", label: "Horizon" },
  { href: "/check#pricing", label: "Pricing" },
] as const;

export const FOOTER_LINKS = [
  { href: "/check", label: "Simpli Check" },
  { href: "/archive", label: "Simpli Archive" },
  { href: "/horizon", label: "Horizon" },
  { href: "/operate", label: "Operate" },
  { href: "/reach", label: "Reach" },
  { href: "/privacy", label: "Privacy" },
] as const;

export const PRODUCTS = [
  {
    id: "check",
    name: "SIMPLI CHECK",
    category: "Inspection Software",
    description:
      "Your words. Your photos. Your report, done faster. Early Adopter pricing is $49 per user per month, for a limited time.",
    status: "Available now",
    href: "/check",
  },
  {
    id: "archive",
    name: "SIMPLI ARCHIVE",
    category: "Report History",
    description:
      "Keep past inspection reports searchable after the December 15, 2026 Horizon shutdown. $29 setup fee, then $9.99 per month. Simpli Check customers add it for $9.99 per month with no setup fee.",
    status: "Available now",
    href: "/archive",
  },
  {
    id: "operate",
    name: "SIMPLI OPERATE",
    category: "Business Operations Software",
    description:
      "A practical operating platform designed to organize priorities, relationships, work, and the day-to-day responsibilities of running a business.",
    status: "Coming soon",
    href: "/operate",
  },
  {
    id: "reach",
    name: "SIMPLI REACH",
    category: "Business Growth Software",
    description:
      "A marketing and growth workspace designed to help owner-operated businesses consistently reach better customers with less time and uncertainty.",
    status: "Coming soon",
    href: "/reach",
  },
] as const;
