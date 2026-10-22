import {
  FOUNDING_PRICE_49,
  FOUNDING_PRICE_69,
  foundingSpotSentence,
} from "@/lib/leads/founding";
import type { SuccessBody } from "@/lib/leads/types";
import {
  ARCHIVE_FIRST_MONTH_USD,
  ARCHIVE_MONTHLY_USD,
  SHUTDOWN_LABEL,
} from "@/lib/offers";

const exportLine = `Horizon's export tools stop on ${SHUTDOWN_LABEL}. Please export your full history before then, whatever you decide about software.`;
const noBill = "This does not start billing.";

export function thankYouCopy(result: SuccessBody): {
  title: string;
  paragraphs: string[];
} {
  if (result.duplicate) {
    return {
      title: "You're already on the list.",
      paragraphs: [
        "This email is already signed up. We'll keep the signup we have.",
        exportLine,
      ],
    };
  }

  if (result.foundingSpot && result.foundingPrice) {
    const added = result.upgraded ? "We added Simpli Check to your signup. " : "";
    return {
      title: "You're on the list.",
      paragraphs: [
        `${added}${foundingSpotSentence(result.foundingSpot)}`,
        `That includes personal support from Brian and Simpli Archive. If you leave Simpli Check, Archive storage resumes at $${ARCHIVE_MONTHLY_USD}/month.`,
        noBill,
        exportLine,
      ],
    };
  }

  if (
    (result.interest === "check" || result.interest === "both") &&
    result.foundingClosed
  ) {
    const added = result.upgraded ? "We added Simpli Check to your signup. " : "";
    return {
      title: "You're on the list.",
      paragraphs: [
        `${added}You're on the Simpli Check waitlist. Founding-member pricing is full, so this signup does not lock a $${FOUNDING_PRICE_49} or $${FOUNDING_PRICE_69} rate.`,
        noBill,
        exportLine,
      ],
    };
  }

  if (result.interest === "check" || result.interest === "both") {
    return {
      title: "You're on the list.",
      paragraphs: [
        result.interest === "both"
          ? "You're on the list for Simpli Archive and Simpli Check. We'll write with next steps."
          : "You're on the Simpli Check waitlist. We'll write with next steps.",
        noBill,
        exportLine,
      ],
    };
  }

  if (result.interest === "archive") {
    return {
      title: "You're on the list.",
      paragraphs: [
        `You're on the list for Simpli Archive. The price is $${ARCHIVE_FIRST_MONTH_USD} for the first month, then $${ARCHIVE_MONTHLY_USD}/month.`,
        noBill,
        exportLine,
      ],
    };
  }

  if (result.interest === "operate") {
    return {
      title: "You're on the list.",
      paragraphs: [
        "You're on the list for Simpli Operate. We'll write when there is a public next step.",
        noBill,
      ],
    };
  }

  return {
    title: "You're on the list.",
    paragraphs: [
      "You're on the list for Simpli Reach. We'll write when there is a public next step.",
      noBill,
    ],
  };
}
