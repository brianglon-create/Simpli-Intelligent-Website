/**
 * Site-wide configuration.
 * Update contactEmail here when switching to a @simpliintelligent.com address.
 */
export const SITE = {
  name: "Simpli Intelligent",
  wordmark: "SIMPLI INTELLIGENT",
  url: "https://simpliintelligent.com",
  contactEmail: "brianglon@gmail.com",
  legalEntity: "Polaris Intelligence LLC",
  location: "South Bend, Indiana",
  copyrightYear: 2026,
  title: "Simpli Intelligent | Simple Software for Owner-Operated Businesses",
  description:
    "Simpli Intelligent is creating a connected family of business applications that help owner-operated businesses grow, organize, and operate with confidence.",
} as const;

export const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#mission", label: "Our Mission" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const PRODUCTS = [
  {
    id: "operate",
    name: "SIMPLI OPERATE",
    category: "Business Operations Software",
    description:
      "A practical operating platform designed to organize priorities, relationships, work, and the day-to-day responsibilities of running a business.",
    status: "Internal Launch",
  },
  {
    id: "reach",
    name: "SIMPLI REACH",
    category: "Business Growth Software",
    description:
      "A marketing and growth workspace designed to help owner-operated businesses consistently reach better customers with less time and uncertainty.",
    status: "In Development",
  },
  {
    id: "inspect",
    name: "SIMPLI INSPECT",
    category: "Inspection Software",
    description:
      "A future inspection platform designed to help inspectors work more efficiently, communicate clearly, and make better-informed decisions.",
    status: "Planned",
  },
] as const;
