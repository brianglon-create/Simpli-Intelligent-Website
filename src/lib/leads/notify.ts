import {
  canSendEmail,
  emailFrom,
  leadNotifyEmail,
  mailingAddress,
  resendApiKey,
} from "@/lib/env";
import { formatIndianapolis } from "@/lib/datetime";
import {
  FOUNDING_PRICE_49,
  FOUNDING_PRICE_69,
  foundingSpotLabel,
  priceForSpot,
  publicFoundingLine,
} from "@/lib/leads/founding";
import type { Interest, StoredLead } from "@/lib/leads/types";
import { FOUNDER_FOLLOW_UP, INSPECTOR_BYLINE, OFFER_NAME } from "@/lib/offer-copy";
import { ARCHIVE_FIRST_MONTH_USD, ARCHIVE_MONTHLY_USD, SHUTDOWN_LABEL } from "@/lib/offers";
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
    detail = `${remaining49} spots remain at $${FOUNDING_PRICE_49}/month. The next 50 are $${FOUNDING_PRICE_69}/month. The site is still offering the ${OFFER_NAME} rate.`;
  } else if (threshold === 50) {
    detail = `The $${FOUNDING_PRICE_49}/month tier is full. The $${FOUNDING_PRICE_69}/month tier is open.`;
  } else if (threshold === 90) {
    detail = `${remaining69} spots remain at $${FOUNDING_PRICE_69}/month.`;
  } else {
    detail = `${OFFER_NAME} pricing is now closed on the site. New Simpli Check signups join the waitlist without an ${OFFER_NAME} rate. Simpli Archive remains $${ARCHIVE_FIRST_MONTH_USD} for the first month, then $${ARCHIVE_MONTHLY_USD}/month.`;
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

export function leadConfirmation(lead: StoredLead): OutboundEmail {
  const lines = [
    `Hi ${lead.name.split(" ")[0]},`,
    "",
    `Thanks for signing up. I'm the founder of ${SITE.name}. ${INSPECTOR_BYLINE}`,
  ];

  const foundingPrice = priceForSpot(lead.foundingSpot);
  if (foundingPrice) {
    lines.push(
      "",
      lead.productInterest === "check"
        ? `${publicFoundingLine(foundingPrice)} That includes personal onboarding and support directly from the founder.`
        : `${publicFoundingLine(foundingPrice)} That includes personal onboarding and support directly from the founder, and Simpli Archive. If you leave Simpli Check, Simpli Archive storage resumes at $${ARCHIVE_MONTHLY_USD}/month.`,
      "This email does not start billing.",
    );
  } else if (lead.productInterest === "archive") {
    lines.push(
      "",
      `You asked to hear about Simpli Archive. The price is $${ARCHIVE_FIRST_MONTH_USD} for the first month, then $${ARCHIVE_MONTHLY_USD}/month. This email does not start billing.`,
    );
  } else if (lead.productInterest === "check" || lead.productInterest === "both") {
    lines.push(
      "",
      `You're on the Simpli Check waitlist. ${OFFER_NAME} pricing is full, so this signup does not lock an ${OFFER_NAME} rate. This email does not start billing.`,
    );
  } else if (lead.productInterest === "operate") {
    lines.push(
      "",
      "You're on the list for Simpli Operate. I'll write when there is a public next step.",
    );
  } else {
    lines.push(
      "",
      "You're on the list for Simpli Reach. I'll write when there is a public next step.",
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

  lines.push(
    "",
    FOUNDER_FOLLOW_UP,
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
    subject: "You're on the Simpli list",
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
