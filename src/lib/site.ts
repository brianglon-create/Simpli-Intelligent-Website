import { INSPECTOR_BYLINE, OFFER_INSPECTORS } from "@/lib/offer-copy";

/**
 * Site-wide configuration.
 * contactEmail is the public address shown on the site and in fallback messages.
 */
export const SITE = {
  name: "Simpli Intelligent",
  wordmark: "SIMPLI INTELLIGENT",
  url: "https://simpliintelligent.com",
  contactEmail: "brian@simpliintelligent.com",
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
  { href: "/check", label: "Check" },
  { href: "/operate", label: "Operate" },
  { href: "/archive", label: "Archive" },
  { href: "/reach", label: "Reach" },
  { href: "/horizon", label: "Horizon" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "/horizon", label: "Horizon" },
  { href: "/check", label: "Check" },
  { href: "/operate", label: "Operate" },
  { href: "/archive", label: "Archive" },
  { href: "/reach", label: "Reach" },
  { href: "/privacy", label: "Privacy" },
  { href: "/#contact", label: "Contact" },
] as const;

export const PRODUCTS = [
  {
    id: "check",
    name: "SIMPLI CHECK",
    category: "Inspection Software",
    description:
      `Inspection software on the waitlist. ${INSPECTOR_BYLINE} Built to cut report-writing time. Coming to ${OFFER_INSPECTORS}: photo recognition, narratives you review and edit, and plain-language defect notes for clients.`,
    status: "Waitlist",
    href: "/check",
  },
  {
    id: "operate",
    name: "SIMPLI OPERATE",
    category: "Business Operations Software",
    description:
      "A practical operating platform designed to organize priorities, relationships, work, and the day-to-day responsibilities of running a business.",
    status: "Internal Launch",
    href: "/operate",
  },
  {
    id: "archive",
    name: "SIMPLI ARCHIVE",
    category: "Report History",
    description:
      "A place to keep Horizon inspection reports searchable after the December 15, 2026 shutdown, alongside whatever software you use next.",
    status: "Early access",
    href: "/archive",
  },
  {
    id: "reach",
    name: "SIMPLI REACH",
    category: "Business Growth Software",
    description:
      "A marketing and growth workspace designed to help owner-operated businesses consistently reach better customers with less time and uncertainty.",
    status: "In Development",
    href: "/reach",
  },
] as const;
