import {
  canSendEmail,
  emailFrom,
  leadNotifyEmail,
  mailingAddress,
  resendApiKey,
} from "@/lib/env";
import { formatIndianapolis } from "@/lib/datetime";
import { EMAIL_ONLY_NAME, sourceFormKind } from "@/lib/leads/form-kind";
import { foundingSpotLabel } from "@/lib/leads/founding";
import type { Interest, StoredLead } from "@/lib/leads/types";
import {
  CHECK_PRICE_LINE,
  FOUNDER_FOLLOW_UP,
  INSPECTOR_BYLINE,
  NOT_A_PURCHASE,
  OFFER_NAME,
} from "@/lib/offer-copy";
import {
  ARCHIVE_ADDON_PRICE,
  ARCHIVE_STANDALONE_PRICE,
  SHUTDOWN_LABEL,
  usd,
  ARCHIVE_MONTHLY_USD,
  ARCHIVE_SETUP_USD,
} from "@/lib/offers";
import { SITE } from "@/lib/site";

export type OutboundEmail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  headers?: Record<string, string>;
};

export type NotifyResult = {
  sent: boolean;
  reason?: "email_unconfigured" | "email_failed";
};

const interestLabel: Record<Interest, string> = {
  archive: "Simpli Archive",
  check: "Simpli Check",
  both: "Simpli Archive and Simpli Check",
  operate: "Simpli Operate",
  reach: "Simpli Reach",
};

function clean(value: string | number | null | undefined): string {
  if (value == null) return "(none)";
  const text = String(value).replace(/[\r\n]+/g, " ").trim();
  return text || "(none)";
}

function line(label: string, value: string | number | null | undefined): string {
  return `${label}: ${clean(value)}`;
}

export function signupNotification(args: {
  lead: StoredLead;
  duplicate: boolean;
  upgraded: boolean;
  previousInterest: Interest | null;
  foundingCount: number;
}): OutboundEmail {
  const { lead } = args;
  const subject = args.duplicate
    ? `Repeat signup: ${lead.name} (${interestLabel[lead.productInterest]})`
    : `New signup: ${lead.name} (${interestLabel[lead.productInterest]})`;

  const text = [
    args.duplicate
      ? `This email is already on the list. No new ${OFFER_NAME} spot was assigned.`
      : args.upgraded
        ? "An existing lead updated their product interest."
        : "A new lead signed up on simpliintelligent.com.",
    "",
    line("Name", lead.name),
    line("Email", lead.email),
    line("Business", lead.company),
    line("State or province", lead.stateProvince),
    line("Current software", lead.currentSoftware),
    line("Product interest", interestLabel[lead.productInterest]),
    line(
      "Previous interest",
      args.previousInterest ? interestLabel[args.previousInterest] : null,
    ),
    line("Horizon reports (approx.)", lead.reportCount),
    line("Lead status", lead.leadStatus),
    line(`${OFFER_NAME} spot`, lead.foundingSpot ? foundingSpotLabel(lead.foundingSpot) : null),
    line(`${OFFER_NAME} spots claimed`, args.foundingCount),
    line("Source", lead.source),
    line("UTM source", lead.utmSource),
    line("UTM medium", lead.utmMedium),
    line("UTM campaign", lead.utmCampaign),
    line("UTM content", lead.utmContent),
    line("UTM term", lead.utmTerm),
    line("Page", lead.page),
    line("Signed up", formatIndianapolis(lead.createdAt)),
    "",
    "This form does not charge a card.",
  ].join("\n");

  return {
    to: leadNotifyEmail(),
    subject,
    text,
  };
}

export function thresholdNotification(
  threshold: number,
  count: number,
): OutboundEmail {
  const label = foundingSpotLabel(threshold) ?? String(threshold);
  const remaining49 = Math.max(0, 50 - count);
  const remaining69 = Math.max(0, 100 - Math.max(count, 50));
  let detail = "";
  if (threshold === 40) {
    detail = `${remaining49} database spots remain in the first group. The public site shows one Simpli Check price, $49 per user per month, and does not show seat counts.`;
  } else if (threshold === 50) {
    detail = `The first 50 database spots are full. The public site still shows $49 per user per month and does not show a second price.`;
  } else if (threshold === 90) {
    detail = `${remaining69} database spots remain before the database cap of 100. The public site does not show this cap.`;
  } else {
    detail = `The database cap of 100 spots is full. Public pages show Simpli Check at $49 per user per month. Simpli Archive is a ${usd(ARCHIVE_SETUP_USD)} setup fee, then ${usd(ARCHIVE_MONTHLY_USD)} per month.`;
  }

  return {
    to: leadNotifyEmail(),
    subject: `Simpli Check ${OFFER_NAME} spots: ${label}`,
    text: [
      `${count} inspectors have claimed a Simpli Check ${OFFER_NAME} spot.`,
      `Alert threshold: ${label}.`,
      detail,
      `Sent: ${formatIndianapolis(new Date())}`,
      "This is an automatic alert from simpliintelligent.com.",
    ].join("\n\n"),
  };
}

function greeting(name: string): string {
  if (name === EMAIL_ONLY_NAME) return "Hi,";
  const first = name.split(" ")[0]?.trim();
  return first ? `Hi ${first},` : "Hi,";
}

export function leadConfirmation(lead: StoredLead): OutboundEmail {
  const kind = sourceFormKind(lead.source);
  const lines = [
    greeting(lead.name),
    "",
    `Thanks for writing to ${SITE.name}. ${INSPECTOR_BYLINE}`,
  ];

  if (kind === "updates") {
    lines.push(
      "",
      "You're signed up for updates.",
      `Simpli Check: ${SITE.url}/check`,
      CHECK_PRICE_LINE,
      NOT_A_PURCHASE,
    );
  } else if (kind === "migration") {
    lines.push(
      "",
      "You asked for help bringing your narratives into Simpli Check. We'll reply by email.",
      NOT_A_PURCHASE,
    );
  } else if (lead.productInterest === "archive") {
    lines.push(
      "",
      `You asked to hear about Simpli Archive. ${ARCHIVE_STANDALONE_PRICE} ${ARCHIVE_ADDON_PRICE}`,
      NOT_A_PURCHASE,
    );
  } else if (lead.productInterest === "check" || lead.productInterest === "both") {
    lines.push(
      "",
      `You asked to hear about ${interestLabel[lead.productInterest]}. ${CHECK_PRICE_LINE}`,
      `Simpli Check: ${SITE.url}/check`,
      NOT_A_PURCHASE,
    );
  } else if (lead.productInterest === "operate") {
    lines.push(
      "",
      "You're on the list for Simpli Operate. We'll write when there is a public next step.",
      NOT_A_PURCHASE,
    );
  } else {
    lines.push(
      "",
      "You're on the list for Simpli Reach. We'll write when there is a public next step.",
      NOT_A_PURCHASE,
    );
  }

  if (
    lead.productInterest === "archive" ||
    lead.productInterest === "check" ||
    lead.productInterest === "both"
  ) {
    lines.push(
      "",
      `Before anything else: Horizon's export tools stop on ${SHUTDOWN_LABEL}. Please export your full history, whatever you decide about software.`,
    );
  }

  if (kind !== "updates") {
    lines.push("", FOUNDER_FOLLOW_UP);
  }

  lines.push(
    "",
    `Prefer to talk? Reply to this email or email ${SITE.contactEmail}.`,
    "",
    "The founder",
    mailingAddress(),
    SITE.contactEmail,
    SITE.url,
    "",
    `You are receiving this because you asked ${SITE.brandLine} to email you about the product you chose.`,
    `To unsubscribe, reply to this email with "unsubscribe" or write to ${leadNotifyEmail()} with the subject Unsubscribe. We will stop commercial email as soon as we can, and within 10 business days.`,
  );

  return {
    to: lead.email,
    replyTo: leadNotifyEmail(),
    subject:
      kind === "updates"
        ? "Your Simpli updates"
        : kind === "migration"
          ? "Help bringing your narratives"
          : "You're on the Simpli list",
    text: lines.join("\n"),
    headers: {
      "List-Unsubscribe": `<mailto:${leadNotifyEmail()}?subject=Unsubscribe>`,
    },
  };
}

let warned = false;

export async function sendEmail(
  message: OutboundEmail,
  deps?: { fetchImpl?: typeof fetch },
): Promise<NotifyResult> {
  if (!canSendEmail()) {
    if (!warned) {
      warned = true;
      console.warn(
        "Lead email skipped. Set RESEND_API_KEY, EMAIL_FROM, and optionally LEAD_NOTIFY_EMAIL.",
      );
    }
    return { sent: false, reason: "email_unconfigured" };
  }

  const fetchImpl = deps?.fetchImpl ?? fetch;
  try {
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom(),
        to: [message.to],
        subject: message.subject,
        text: message.text,
        reply_to: message.replyTo,
        headers: message.headers,
      }),
    });
    if (!response.ok) {
      console.error("Resend request failed", response.status);
      return { sent: false, reason: "email_failed" };
    }
    return { sent: true };
  } catch (error) {
    console.error(
      "Resend request errored",
      error instanceof Error ? error.message : "unknown",
    );
    return { sent: false, reason: "email_failed" };
  }
}

export function resetEmailWarningForTests(): void {
  warned = false;
}
