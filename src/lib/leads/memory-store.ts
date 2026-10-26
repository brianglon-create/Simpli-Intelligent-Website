import {
  decideSignup,
  foundingSnapshot,
  pendingAlerts,
} from "@/lib/leads/founding";
import type { LeadStore, SaveResult, StoredLead } from "@/lib/leads/types";

export function createMemoryStore(): LeadStore {
  const leads = new Map<string, StoredLead>();
  let count = 0;
  const sent = new Set<number>();
  let chain: Promise<unknown> = Promise.resolve();

  const lock = <T>(fn: () => T | Promise<T>): Promise<T> => {
    const run = chain.then(fn, fn);
    chain = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  };

  return {
    kind: "memory",
    save(input) {
      return lock((): SaveResult => {
        const existing = leads.get(input.email) ?? null;
        const decision = decideSignup(
          count,
          existing
            ? {
                productInterest: existing.productInterest,
                foundingSpot: existing.foundingSpot,
              }
            : null,
          input.productInterest,
        );
        const alerts = () => pendingAlerts(count, [...sent]);

        if (decision.action === "duplicate" && existing) {
          return {
            ok: true,
            duplicate: true,
            upgraded: false,
            previousInterest: null,
            lead: existing,
            foundingCount: count,
            pendingAlerts: alerts(),
          };
        }

        if (decision.action === "upgrade" && existing) {
          const updated: StoredLead = {
            ...existing,
            ...input,
            id: existing.id,
            createdAt: existing.createdAt,
            leadStatus: existing.leadStatus,
            foundingSpot: decision.foundingSpot,
          };
          leads.set(input.email, updated);
          count = decision.nextCount;
          return {
            ok: true,
            duplicate: false,
            upgraded: true,
            previousInterest: existing.productInterest,
            lead: updated,
            foundingCount: count,
            pendingAlerts: alerts(),
          };
        }

        const lead: StoredLead = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          leadStatus: "New",
          foundingSpot: decision.foundingSpot,
        };
        leads.set(input.email, lead);
        count = decision.nextCount;
        return {
          ok: true,
          duplicate: false,
          upgraded: false,
          previousInterest: null,
          lead,
          foundingCount: count,
          pendingAlerts: alerts(),
        };
      });
    },
    async status() {
      return foundingSnapshot(count, true);
    },
    async sentAlerts() {
      return [...sent];
    },
    async markAlertSent(threshold) {
      if (sent.has(threshold)) return false;
      sent.add(threshold);
      return true;
    },
    async unmarkAlertSent(threshold) {
      sent.delete(threshold);
    },
  };
}
