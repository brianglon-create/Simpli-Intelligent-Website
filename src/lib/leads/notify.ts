import {
  canSendEmail,
  emailFrom,
  leadNotifyEmail,
  mailingAddress,
  resendApiKey,
} from "@/lib/env";
import {
  FOUNDING_CAP,
  FOUNDING_PRICE_49,
  FOUNDING_PRICE_69,
  priceForSpot,
} from "@/lib/leads/founding";
import type { Interest, StoredLead } from "@/lib/leads/types";
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
  const price = priceForSpot(lead.foundingSpot);
  const subject = args.duplicate
    ? `Repeat signup: ${lead.name} (${interestLabel[lead.productInterest]})`
    : `New signup: ${lead.name} (${interestLabel[lead.productInterest]})`;

  const text = [
    args.duplicate
      ? "This email is already on the list. No new founding spot was assigned."
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
    line(
      "Founding spot",
      lead.foundingSpot
        ? `${lead.foundingSpot} of ${FOUNDING_CAP} ($${price}/month)`
        : null,
    ),
    line("Founding spots claimed", args.foundingCount),
    line("Source", lead.source),
    line("UTM source", lead.utmSource),
    line("UTM medium", lead.utmMedium),
    line("UTM campaign", lead.utmCampaign),
    line("UTM content", lead.utmContent),
    line("UTM term", lead.utmTerm),
    line("Page", lead.page),
    line("Signed up", lead.createdAt),
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
  const remaining49 = Math.max(0, 50 - count);
  const remaining69 = Math.max(0, FOUNDING_CAP - Math.max(count, 50));
  let detail = "";
  if (threshold === 40) {
    detail = `${remaining49} spots remain at $${FOUNDING_PRICE_49}/month. The next 50 are $${FOUNDING_PRICE_69}/month. The site is still offering founding pricing.`;
  } else if (threshold === 50) {
    detail = `The $${FOUNDING_PRICE_49}/month tier is full. The $${FOUNDING_PRICE_69}/month tier is open.`;
  } else if (threshold === 90) {
    detail = `${remaining69} spots remain at $${FOUNDING_PRICE_69}/month.`;
  } else {
    detail = `Founding pricing is now closed on the site. New Check signups join the waitlist without a founding rate. Archive remains $${ARCHIVE_FIRST_MONTH_USD} for the first month, then $${ARCHIVE_MONTHLY_USD}/month.`;
  }

  return {
    to: leadNotifyEmail(),
    subject: `Simpli Check founding spots: ${threshold} of ${FOUNDING_CAP}`,
    text: [
      `${count} inspectors have claimed a Simpli Check founding spot (alert threshold ${threshold}).`,
      detail,
      "This is an automatic alert from simpliintelligent.com.",
    ].join("\n\n"),
  };
}

export function leadConfirmation(lead: StoredLead): OutboundEmail {
  const price = priceForSpot(lead.foundingSpot);
  const lines = [
    `Hi ${lead.name.split(" ")[0]},`,
    "",
    `Thanks for signing up. I'm Brian, a home inspector at ${SITE.inspectionBusiness} since ${SITE.inspectingSince}, and the founder of ${SITE.name}.`,
  ];

  if (lead.foundingSpot && price) {
    lines.push(
      "",
      `You are number ${lead.foundingSpot} of ${FOUNDING_CAP}, in line for the $${price}/month Simpli Check founding rate. That includes personal support from me and Simpli Archive. If you leave Simpli Check, Archive storage resumes at $${ARCHIVE_MONTHLY_USD}/month.`,
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
      "You're on the Simpli Check waitlist. Founding-member pricing is full, so this signup does not lock a founding rate. This email does not start billing.",
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
    "If you'd rather talk, reply to this email. I read every response.",
    "",
    "Brian",
    mailingAddress(),
    SITE.contactEmail,
    SITE.url,
    "",
    `You are receiving this because you asked ${SITE.name} (${SITE.legalEntity}) to email you about the product you chose.`,
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
