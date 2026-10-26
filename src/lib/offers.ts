import {
  FOUNDING_CAP,
  FOUNDING_PRICE_49,
  FOUNDING_PRICE_69,
} from "@/lib/leads/founding";
import {
  FOUNDER_SUPPORT,
  INSPECTOR_BYLINE,
  OFFER_INSPECTORS,
  OFFER_NAME,
  offerRateLine,
} from "@/lib/offer-copy";

export const SHUTDOWN_LABEL = "December 15, 2026";

/** End of December 15, 2026, Eastern Time (EST, UTC−5). */
export const SHUTDOWN_DEADLINE_ISO = "2026-12-16T05:00:00.000Z";

export const ARCHIVE_FIRST_MONTH_USD = 19;
export const ARCHIVE_MONTHLY_USD = 9;

export const MIGRATION_INCLUDED = [
  "Comments",
  "Presets",
  "Contacts",
  "Team",
  "Branding",
] as const;

export const MIGRATION_EXCLUDED = [
  "Historical inspection reports",
  "Report PDFs",
  "Photos",
  "Work orders",
  "Bookings",
  "Payments",
  "ISN integrations",
] as const;

export const TIMELINE = [
  {
    title: "Export now",
    body: `Do this before ${SHUTDOWN_LABEL}. Horizon's export tools stop that day. After that, you cannot pull the history out.`,
  },
  {
    title: "Store it",
    body: "Keep your own copies. Reserve Simpli Archive if you want that history in one searchable place beside whatever software you use next.",
  },
  {
    title: "Switch when you choose",
    body: "Move to Spectora, Mach One, or something else, or join the Simpli Check waitlist and decide later. Simpli Archive does not choose your next inspection tool.",
  },
] as const;

export const ARCHIVE_BULLETS = [
  {
    title: "Your history, still findable.",
    body: "Keep past reports in one place you can search, instead of a folder of exported files.",
  },
  {
    title: "Works with any next step.",
    body: "Switching to Spectora, Mach One, or something else? Simpli Archive sits alongside it. No lock-in.",
  },
  {
    title: "Built because an inspector needed it.",
    body: "Old reports get pulled for claims, disputes, and repeat clients. Simpli Archive is being built for that moment.",
  },
] as const;

export const EXPORT_STEPS = [
  {
    title: `Export before ${SHUTDOWN_LABEL}`,
    body: "Horizon's export tools stop that day. After that, Horizon has said the data will no longer be accessible, and Carson Dunlop deletes it. Export before you debate which software to use next.",
  },
  {
    title: "Export the history a migration does not carry",
    body: "Take historical inspection reports, report PDFs, photos, work orders, bookings, and payment records. Spectora's one-click migration does not move those, and it does not move ISN integrations. A comment-library export is not your report history.",
  },
  {
    title: "Keep more than one copy",
    body: "Save the export on your computer and a second copy you control, such as a backup drive. Do not leave the only copy inside Horizon.",
  },
  {
    title: "Write down what you actually received",
    body: "Note the date range and the kinds of files Horizon gave you, then tell us. We confirm how those files can come into Simpli Archive before you pay.",
  },
  {
    title: "Tell us what you have",
    body: "Use the form on this page. We will confirm how those files can come into Simpli Archive before you pay. This checklist is the sequence to follow. It is not a click-by-click tour of Horizon's screens.",
  },
] as const;

export const CHECK_PILLARS = [
  {
    title: "Real-time photo recognition",
    body: "Snap a photo and Simpli Check identifies the defect as you go.",
  },
  {
    title: "Automatic narrative generation",
    body: "Report-ready narratives written from your photos and notes. You review and edit them before they go in the report.",
  },
  {
    title: "Inspector reference library",
    body: "Plain-language education for the client on each defect: what it is, and why it matters.",
  },
] as const;

export const CHECK_PERKS = [
  INSPECTOR_BYLINE,
  `${offerRateLine(FOUNDING_PRICE_49, FOUNDING_PRICE_69)} It covers the first ${FOUNDING_CAP} Simpli Check signups. Then those tiers close.`,
  FOUNDER_SUPPORT,
  "First access to new products and features at discounted rates.",
] as const;

export const HORIZON_FAQS = [
  {
    question: "Do I need to leave Spectora or Mach One to use Simpli Archive?",
    answer:
      "No. Simpli Archive is meant to sit alongside the software you use next. It does not lock you in, and it does not replace that software.",
  },
  {
    question: "What does Spectora's one-click migration leave behind?",
    answer:
      "Spectora's migration FAQ says the one-click move brings comments, presets, contacts, team, and branding. It does not bring historical inspection reports, report PDFs, photos, work orders, bookings, payments, or ISN integrations. Spectora tells inspectors to export records they may need for regulatory, insurance, legal, or business purposes.",
  },
  {
    question: `What happens to Horizon data on ${SHUTDOWN_LABEL}?`,
    answer:
      "Export tools stop that day. Horizon has said the data will no longer be accessible after that, and Carson Dunlop deletes it. Export before the window closes.",
  },
  {
    question: "What file types can Simpli Archive take?",
    answer:
      "Tell us what Horizon exported and we will confirm what Simpli Archive can store before you upload anything.",
  },
  {
    question: "Where is my data stored, and who owns the reports?",
    answer:
      "Your reports stay yours. This form stores the contact details in our Supabase database, described in the privacy policy. A hosting location for report files will be stated before Simpli Archive accepts uploads.",
  },
  {
    question: "What happens if I cancel?",
    answer: `This form does not start billing. Simpli Archive is $${ARCHIVE_FIRST_MONTH_USD} for the first month, then $${ARCHIVE_MONTHLY_USD}/month. How long uploaded reports are kept after you cancel will be stated before uploads open.`,
  },
  {
    question: "Do you serve Canadian inspectors?",
    answer:
      "Yes. The form asks for your province, and the consent checkbox is express consent for CASL. We also serve inspectors in the United States. Simpli Intelligent is not affiliated with CAHPI, ASHI, InterNACHI, Carson Dunlop, Spectora, or Mach One.",
  },
  {
    question: `What do ${OFFER_INSPECTORS} get?`,
    answer: `${offerRateLine(FOUNDING_PRICE_49, FOUNDING_PRICE_69)} ${OFFER_INSPECTORS} get personal onboarding and support directly from the founder, and first access to new products and features at discounted rates. After ${FOUNDING_CAP} ${OFFER_NAME} signups, those tiers close on this site. The form does not charge a card.`,
  },
  {
    question: "What can Simpli Check do?",
    answer:
      `${INSPECTOR_BYLINE} Simpli Check is inspection software designed around how inspectors actually work, not a sales team. Join the waitlist for our expected November launch. Snap a photo and Simpli Check identifies the defect as you go; report-ready narratives from your photos and notes, which you review and edit; and plain-language education for the client on each defect, what it is and why it matters. These features launch with Simpli Check in November, and ${OFFER_INSPECTORS} get them first.`,
  },
  {
    question: "How will I search old reports?",
    answer:
      "Simpli Archive is being built so past reports live in one searchable place instead of a folder of exports.",
  },
  {
    question: "Does joining the list bill me?",
    answer:
      "No. The form reserves your place and tells us which product you asked about. It does not charge a card.",
  },
] as const;
