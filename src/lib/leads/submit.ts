import { canSendEmail } from "@/lib/env";
import { logServerError } from "@/lib/leads/error-log";
import { logSupabaseKeyDiagnostic } from "@/lib/leads/key-diagnostic";
import { pendingAlerts, priceForSpot } from "@/lib/leads/founding";
import {
  leadConfirmation,
  sendEmail,
  signupNotification,
  thresholdNotification,
  type NotifyResult,
  type OutboundEmail,
} from "@/lib/leads/notify";
import { isInterest, parseLead } from "@/lib/leads/schema";
import { getLeadStore, readFoundingStatus } from "@/lib/leads/store";
import type { Interest, LeadStore, SuccessBody } from "@/lib/leads/types";
import { SITE } from "@/lib/site";

export type SendFn = (message: OutboundEmail) => Promise<NotifyResult>;

export type SubmitOutcome =
  | { status: 200; body: SuccessBody }
  | {
      status: 400;
      body: { ok: false; error: "validation"; fields: Record<string, string> };
    }
  | {
      status: 503;
      body: { ok: false; error: "storage_unconfigured"; message: string };
    };

export function storageUnconfiguredMessage(): string {
  return `We couldn't save your signup because storage isn't set up yet. Email ${SITE.contactEmail} and tell us which product you want.`;
}

function blandSuccess(interest: Interest): SuccessBody {
  return {
    ok: true,
    duplicate: false,
    upgraded: false,
    interest,
    foundingSpot: null,
    foundingPrice: null,
    foundingClosed: false,
    notified: false,
  };
}

async function deliverAlerts(
  store: LeadStore,
  count: number,
  send: SendFn,
): Promise<void> {
  const sent = await store.sentAlerts();
  for (const threshold of pendingAlerts(count, sent)) {
    const claimed = await store.markAlertSent(threshold);
    if (!claimed) continue;
    const result = await send(thresholdNotification(threshold, count));
    if (!result.sent) {
      await store.unmarkAlertSent(threshold);
      break;
    }
  }
}

export async function flushFoundingAlerts(send: SendFn = sendEmail): Promise<void> {
  if (!canSendEmail()) return;
  try {
    const store = getLeadStore();
    const status = await store.status();
    if (!status.configured || status.count < 40) return;
    await deliverAlerts(store, status.count, send);
  } catch (error) {
    logServerError("Founding alert flush failed", error);
  }
}

export async function submitLead(
  raw: unknown,
  deps?: { store?: LeadStore; send?: SendFn },
): Promise<SubmitOutcome> {
  const parsed = parseLead(raw);
  if (!parsed.ok) {
    return { status: 400, body: { ok: false, error: "validation", fields: parsed.fields } };
  }

  if (parsed.honeypot) {
    const interest = isInterest((raw as { interest?: unknown })?.interest)
      ? (raw as { interest: Interest }).interest
      : "archive";
    return { status: 200, body: blandSuccess(interest) };
  }

  const send = deps?.send ?? sendEmail;

  let store: LeadStore;
  try {
    store = deps?.store ?? getLeadStore();
  } catch (error) {
    logSupabaseKeyDiagnostic("failure");
    logServerError("Lead store setup failed", error);
    return {
      status: 503,
      body: {
        ok: false,
        error: "storage_unconfigured",
        message: storageUnconfiguredMessage(),
      },
    };
  }

  let saved;
  try {
    saved = await store.save(parsed.lead);
  } catch (error) {
    logSupabaseKeyDiagnostic("failure");
    logServerError("Lead save failed", error);
    return {
      status: 503,
      body: {
        ok: false,
        error: "storage_unconfigured",
        message: storageUnconfiguredMessage(),
      },
    };
  }

  if (!saved.ok) {
    logSupabaseKeyDiagnostic("failure");
    console.error("Lead was not stored", {
      email: parsed.lead.email,
      interest: parsed.lead.productInterest,
    });
    return {
      status: 503,
      body: {
        ok: false,
        error: "storage_unconfigured",
        message: storageUnconfiguredMessage(),
      },
    };
  }

  let notified = false;
  if (!saved.duplicate) {
    const brian = await send(
      signupNotification({
        lead: saved.lead,
        duplicate: false,
        upgraded: saved.upgraded,
        previousInterest: saved.previousInterest,
        foundingCount: saved.foundingCount,
      }),
    );
    notified = brian.sent;
    await send(leadConfirmation(saved.lead));
  }

  await deliverAlerts(store, saved.foundingCount, send);

  const closed = saved.foundingCount >= 100;
  return {
    status: 200,
    body: {
      ok: true,
      duplicate: saved.duplicate,
      upgraded: saved.upgraded,
      interest: saved.lead.productInterest,
      foundingSpot: saved.lead.foundingSpot,
      foundingPrice: priceForSpot(saved.lead.foundingSpot),
      foundingClosed: closed,
      notified,
    },
  };
}

export { readFoundingStatus };
