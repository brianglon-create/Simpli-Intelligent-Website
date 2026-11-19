import { CHECK_PRICE_LINE, NOT_A_PURCHASE } from "@/lib/offer-copy";
import type { SuccessBody } from "@/lib/leads/types";
import {
  ARCHIVE_ADDON_PRICE,
  ARCHIVE_STANDALONE_PRICE,
  SHUTDOWN_LABEL,
} from "@/lib/offers";

const exportLine = `Horizon's export tools stop on ${SHUTDOWN_LABEL}. Please export your full history before then, whatever you decide about software.`;

export function thankYouCopy(result: SuccessBody): {
  title: string;
  paragraphs: string[];
} {
  if (result.duplicate) {
    return {
      title: "We already have this email.",
      paragraphs: [
        "This email is already signed up. We'll keep the signup we have.",
        exportLine,
      ],
    };
  }

  if (result.interest === "archive") {
    return {
      title: "You're on the list.",
      paragraphs: [
        `You asked to hear about Simpli Archive. ${ARCHIVE_STANDALONE_PRICE} ${ARCHIVE_ADDON_PRICE}`,
        NOT_A_PURCHASE,
        exportLine,
      ],
    };
  }

  if (result.interest === "check" || result.interest === "both") {
    const added = result.upgraded ? "We added Simpli Check to your signup. " : "";
    const product =
      result.interest === "both"
        ? "You asked to hear about Simpli Archive and Simpli Check."
        : "You asked to hear about Simpli Check.";
    return {
      title: "You're on the list.",
      paragraphs: [`${added}${product} ${CHECK_PRICE_LINE}`, NOT_A_PURCHASE, exportLine],
    };
  }

  if (result.interest === "operate") {
    return {
      title: "You're on the list.",
      paragraphs: [
        "You're on the list for Simpli Operate. We'll write when there is a public next step.",
        NOT_A_PURCHASE,
      ],
    };
  }

  return {
    title: "You're on the list.",
    paragraphs: [
      "You're on the list for Simpli Reach. We'll write when there is a public next step.",
      NOT_A_PURCHASE,
    ],
  };
}
