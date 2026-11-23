import {
  CHECK_HEADLINE,
  CHECK_PRICE_LINE,
  FOUNDER_ONBOARDING,
  INSPECTOR_BYLINE,
} from "@/lib/offer-copy";

export const SHUTDOWN_LABEL = "December 15, 2026";

/** End of December 15, 2026, Eastern Time (EST, UTC−5). */
export const SHUTDOWN_DEADLINE_ISO = "2026-12-16T05:00:00.000Z";

export const ARCHIVE_SETUP_USD = 29;
export const ARCHIVE_MONTHLY_USD = 9.99;

export function usd(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export const ARCHIVE_STANDALONE_PRICE = `${usd(ARCHIVE_SETUP_USD)} for the first month, covering setup and the initial file transfer, then ${usd(ARCHIVE_MONTHLY_USD)} per month.`;

export const ARCHIVE_ADDON_PRICE = `${usd(ARCHIVE_MONTHLY_USD)} per month for Simpli Check customers. No setup fee.`;

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
    body: "Keep your own copies. Simpli Archive is a searchable place for that history, beside whatever software you use next.",
  },
  {
    title: "Switch when you choose",
    body: "Move to the inspection software you choose next, or write new reports in Simpli Check. Simpli Archive does not choose your next inspection tool.",
  },
] as const;

export const ARCHIVE_BULLETS = [
  {
    title: "Search, don't dig",
    body: "Find a past report instead of opening a folder of exports.",
  },
  {
    title: "Open the history",
    body: "Open a past report when a client, agent, insurer, or attorney asks for it.",
  },
  {
    title: "Works with any next step",
    body: "Spectora, Mach One, or Simpli Check: Simpli Archive sits alongside. No lock-in.",
  },
] as const;

export const ARCHIVE_STEPS = [
  {
    title: `Export from Horizon before ${SHUTDOWN_LABEL}`,
    body: "Follow the export checklist on the Horizon page.",
  },
  {
    title: "Get Simpli Archive",
    body: "Buy it on its own, or add it to Simpli Check.",
  },
  {
    title: "Bring the export when that step is ready",
    body: "This page does not describe how files are added. It does not describe storage.",
  },
  {
    title: "Find it when someone asks",
    body: "Search your past reports instead of digging through the export folder.",
  },
] as const;

export const EXPORT_STEPS = [
  {
    title: `Export before ${SHUTDOWN_LABEL}`,
    body: "Horizon's export tools stop that day. After that, Horizon has said the data will no longer be accessible, and Carson Dunlop deletes it. Export before you choose your next software.",
  },
  {
    title: "Export the history a migration does not carry",
    body: "Take historical inspection reports, report PDFs, photos, work orders, bookings, and payment records. A one-click migration does not move those. A comment-library export is not your report history.",
  },
  {
    title: "Keep more than one copy",
    body: "Save the export on your computer and a second copy you control, such as a backup drive. Do not leave the only copy inside Horizon.",
  },
  {
    title: "Write down what you actually received",
    body: "Note the date range and the kinds of files Horizon gave you. The migration-help form on this page is where you can tell us about your narratives and how many Horizon reports you have.",
  },
] as const;

export const CHECK_BENEFITS = [
  {
    title: "Write reports faster",
    body: "Saved narratives and photo captions cut the retyping, so the evening isn't spent at the laptop.",
  },
  {
    title: "Keep your narratives",
    body: "Your established narratives, writing style, and preferred wording come with you. Your reports still sound like you.",
  },
  {
    title: "An inspection workflow that makes sense",
    body: "Work order to published report in one place, laid out in the order you inspect a house.",
  },
  {
    title: "Simpli Assist",
    body: "Simpli-generated narratives from your photos and notes. You edit and approve every one.",
  },
] as const;

export const CHECK_STEPS = [
  {
    title: "Open the work order",
    body: "Client, address, and inspection details are waiting on your dashboard.",
  },
  {
    title: "Capture on site",
    body: "Photos and notes go straight onto the observation. Mark up and caption as you go.",
  },
  {
    title: "Write with your narratives and Simpli Assist",
    body: "Pick a saved narrative or ask Simpli Assist for a suggestion. Edit it, then approve it.",
  },
  {
    title: "Preview and publish",
    body: "See what your client sees, then publish.",
  },
] as const;

export const CHECK_OBJECTIONS = [
  {
    question: "“My comment library is my life's work.”",
    answer:
      "Share that library with the form on this page. You review the wording before you use it on a report.",
  },
  {
    question: "“My current software already writes narratives for me.”",
    answer:
      "Simpli Assist starts from your photo, your notes, and your saved wording, and you approve every line.",
  },
  {
    question: "“I'm not running two systems.”",
    answer:
      "Simpli Check runs work order to published report. Anything not built yet is listed under Coming soon.",
  },
  {
    question: "“Generated narratives on my license? No thanks.”",
    answer:
      "Simpli-generated narratives are suggestions. Nothing goes in the report until you approve it. Your name, your call, your words.",
  },
  {
    question: "“Switching mid-season is a hassle.”",
    answer:
      "Early Adopters get founder-led onboarding. Keep your old software until your first Simpli Check report goes out.",
  },
  {
    question: "“I'm on Horizon.”",
    answer:
      "Past reports, PDFs, and photos do not have to move into the software you write with next. Simpli Archive keeps that history. Simpli Check is where you write next.",
  },
  {
    question: "“InterNACHI gives me software for free.”",
    answer:
      "Free tools still cost your evenings. $49 per user per month. Simpli Assist is included.",
  },
] as const;

export const CHECK_FAQS = [
  {
    question: "Is Simpli Check $49 per user or per company?",
    answer: "Per user. Simpli Check is $49 per user per month. Every user counts as a paid user, whatever the role.",
  },
  {
    question: "Is Simpli Assist extra?",
    answer: "No. Simpli Assist is included in the $49 per user price.",
  },
  {
    question: "Can I bring my narratives from my current software?",
    answer:
      "Yes. Tell us what you use now, share your narratives, and review your wording after we bring them into Simpli Check.",
  },
  {
    question: "How long does Early Adopter pricing last?",
    answer: "Early Adopter pricing is a limited-time offer.",
  },
  {
    question: "What does onboarding look like?",
    answer: FOUNDER_ONBOARDING,
  },
  {
    question: "I'm on Horizon. What about my old reports?",
    answer: `Export them before ${SHUTDOWN_LABEL}. Simpli Archive keeps them searchable.`,
  },
  {
    question: "Does Simpli Check work on my phone or tablet in the field?",
    answer: "Yes. Capture photos and notes on site and finish anywhere.",
  },
  {
    question: "Do you serve Canadian inspectors?",
    answer: "US only for now. Canada later.",
  },
] as const;

export const CHECK_COMING_SOON = [
  {
    title: "Native mobile app",
    body: "A dedicated iOS and Android Report Writer: work your orders, edit observations, capture photos, and write reports from your phone.",
  },
  {
    title: "Simpli Knowledge Check",
    body: "Technical answers on equipment, building components, and inspection questions, right inside your report workflow.",
  },
  {
    title: "Automatic illustration suggestions",
    body: "Pick an observation chip and Simpli Check suggests the matching illustration.",
  },
  {
    title: "Custom chip editor",
    body: "Create and organize your own observation chips so your catalog matches how you inspect.",
  },
  {
    title: "Equipment age from serial numbers",
    body: "Snap the data plate and Simpli Check works out the manufacture date where the brand supports it.",
  },
] as const;

export const ARCHIVE_FAQS = [
  {
    question: "Do I need to leave my current inspection software?",
    answer:
      "No. Simpli Archive is meant to sit alongside the software you use next. It does not replace that software.",
  },
  {
    question: "What files can Simpli Archive take?",
    answer: "This page does not list accepted file types.",
  },
  {
    question: "Do you serve Canadian inspectors?",
    answer: "US only for now. Canada later.",
  },
] as const;

export const HORIZON_FAQS = [
  {
    question: "Do I need to leave my current inspection software to use Simpli Archive?",
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
    answer: "This page does not list accepted file types.",
  },
  {
    question: "Do you serve Canadian inspectors?",
    answer:
      "US only for now. Canada later. Simpli Intelligent is not affiliated with CAHPI, ASHI, InterNACHI, Carson Dunlop, Spectora, or Mach One.",
  },
  {
    question: "What do Early Adopters get?",
    answer: `${CHECK_PRICE_LINE} ${FOUNDER_ONBOARDING}`,
  },
  {
    question: "What can Simpli Check do?",
    answer: `${INSPECTOR_BYLINE} ${CHECK_HEADLINE} Simpli Assist drafts Simpli-generated narratives from your photos and notes, and you approve every line. Simpli Check can read equipment data plates from a photo. The steps for bringing narratives over are on the Simpli Check page.`,
  },
  {
    question: "How will I search old reports?",
    answer:
      "Simpli Archive keeps past reports in one searchable place instead of a folder of exports.",
  },
] as const;
