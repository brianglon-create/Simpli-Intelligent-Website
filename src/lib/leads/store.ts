import { hasSupabase } from "@/lib/env";
import { logServerError } from "@/lib/leads/error-log";
import { foundingSnapshot } from "@/lib/leads/founding";
import { createMemoryStore } from "@/lib/leads/memory-store";
import { createSupabaseStore } from "@/lib/leads/supabase-store";
import type { FoundingSnapshot, LeadStore } from "@/lib/leads/types";

const STORE_SLOT = Symbol.for("simpli.leadStore");

type StoreSlot = {
  store: LeadStore | null;
  kind: LeadStore["kind"] | null;
  override: LeadStore | null;
  warnedMemory: boolean;
};

function storeSlot(): StoreSlot {
  const host = globalThis as typeof globalThis & { [STORE_SLOT]?: StoreSlot };
  host[STORE_SLOT] ??= {
    store: null,
    kind: null,
    override: null,
    warnedMemory: false,
  };
  return host[STORE_SLOT];
}

export function resolveStoreKind(): LeadStore["kind"] {
  if (hasSupabase()) return "supabase";
  if (process.env.LEAD_STORE === "memory") return "memory";
  if (process.env.NODE_ENV !== "production") return "memory";
  return "unconfigured";
}

export function createUnconfiguredStore(): LeadStore {
  return {
    kind: "unconfigured",
    async save() {
      return { ok: false, reason: "storage_unconfigured" };
    },
    async status() {
      return foundingSnapshot(0, false);
    },
    async sentAlerts() {
      return [];
    },
    async markAlertSent() {
      return false;
    },
    async unmarkAlertSent() {},
  };
}

export function getLeadStore(): LeadStore {
  const slot = storeSlot();
  // Pages and route handlers are separate server bundles. A module-level
  // variable would give each bundle its own list, so the live spot count
  // would ignore signups. globalThis is shared inside this Node process.
  if (slot.override) return slot.override;
  const kind = resolveStoreKind();
  if (!slot.store || slot.kind !== kind) {
    slot.kind = kind;
    if (kind === "supabase") {
      slot.store = createSupabaseStore();
    } else if (kind === "memory") {
      if (!slot.warnedMemory) {
        slot.warnedMemory = true;
        console.warn(
          "Lead store is in-memory. Signups reset when the server restarts. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for durable storage.",
        );
      }
      slot.store = createMemoryStore();
    } else {
      slot.store = createUnconfiguredStore();
    }
  }
  return slot.store;
}

export function setLeadStoreForTests(store: LeadStore | null): void {
  const slot = storeSlot();
  slot.override = store;
  slot.store = null;
  slot.kind = null;
}

export async function readFoundingStatus(): Promise<FoundingSnapshot> {
  try {
    return await getLeadStore().status();
  } catch (error) {
    logServerError("Founding status unavailable", error);
    return foundingSnapshot(0, false);
  }
}
