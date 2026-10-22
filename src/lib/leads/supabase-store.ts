import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseServiceKey, supabaseUrl } from "@/lib/env";
import {
  foundingSnapshot,
  pendingAlerts,
  priceForSpot,
} from "@/lib/leads/founding";
import {
  PRODUCT_INTERESTS,
  type Interest,
  type LeadInput,
  type LeadStore,
  type SaveResult,
  type StoredLead,
} from "@/lib/leads/types";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  const url = supabaseUrl();
  const key = supabaseServiceKey();
  if (!url || !key) {
    throw new Error("Supabase is not configured.");
  }
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });
  }
  return client;
}

function asRecord(data: unknown): Record<string, unknown> | null {
  if (typeof data === "string") {
    try {
      return asRecord(JSON.parse(data));
    } catch {
      return null;
    }
  }
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    return data as Record<string, unknown>;
  }
  return null;
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function isInterest(value: unknown): value is Interest {
  return (
    typeof value === "string" &&
    (PRODUCT_INTERESTS as readonly string[]).includes(value)
  );
}

function mapRpcLead(data: unknown, foundingCount: number): SaveResult {
  const row = asRecord(data);
  if (!row) throw new Error("Supabase submit_lead returned an empty payload.");

  const action = row.action;
  if (action !== "create" && action !== "upgrade" && action !== "duplicate") {
    throw new Error("Supabase submit_lead returned an unknown action.");
  }
  if (!isInterest(row.product_interest) || typeof row.email !== "string") {
    throw new Error("Supabase submit_lead returned an incomplete lead.");
  }

  const spot =
    typeof row.founding_spot === "number"
      ? row.founding_spot
      : row.founding_spot == null
        ? null
        : Number(row.founding_spot);
  const foundingSpot = spot == null || Number.isNaN(spot) ? null : spot;
  const count =
    typeof row.founding_count === "number" ? row.founding_count : foundingCount;

  const lead: StoredLead = {
    id: String(row.id),
    createdAt: String(row.created_at),
    name: String(row.name ?? ""),
    company: String(row.company ?? ""),
    email: String(row.email).toLowerCase(),
    stateProvince: String(row.state_province ?? ""),
    currentSoftware: String(row.current_software ?? ""),
    productInterest: row.product_interest,
    reportCount: text(row.report_count),
    source: text(row.source),
    utmSource: text(row.utm_source),
    utmMedium: text(row.utm_medium),
    utmCampaign: text(row.utm_campaign),
    utmContent: text(row.utm_content),
    utmTerm: text(row.utm_term),
    page: text(row.page),
    leadStatus: "New",
    foundingSpot,
  };

  return {
    ok: true,
    duplicate: action === "duplicate",
    upgraded: action === "upgrade",
    previousInterest: isInterest(row.previous_interest)
      ? row.previous_interest
      : null,
    lead,
    foundingCount: count,
    pendingAlerts: [],
  };
}

export function createSupabaseStore(): LeadStore {
  const supabase = getSupabaseAdmin();

  return {
    kind: "supabase",
    async save(input: LeadInput): Promise<SaveResult> {
      const { data, error } = await supabase.rpc("submit_lead", {
        p_name: input.name,
        p_company: input.company,
        p_email: input.email,
        p_state_province: input.stateProvince,
        p_current_software: input.currentSoftware,
        p_product_interest: input.productInterest,
        p_report_count: input.reportCount,
        p_source: input.source,
        p_utm_source: input.utmSource,
        p_utm_medium: input.utmMedium,
        p_utm_campaign: input.utmCampaign,
        p_utm_content: input.utmContent,
        p_utm_term: input.utmTerm,
        p_page: input.page,
      });

      if (error) {
        console.error("Supabase submit_lead failed", error.code, error.message);
        throw error;
      }

      const saved = mapRpcLead(data, 0);
      if (!saved.ok) return saved;
      const sent = await this.sentAlerts();
      return {
        ...saved,
        pendingAlerts: pendingAlerts(saved.foundingCount, sent),
      };
    },
    async status() {
      const { count, error } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .not("founding_spot", "is", null);
      if (error) {
        console.error("Supabase founding count failed", error.code, error.message);
        throw error;
      }
      return foundingSnapshot(count ?? 0, true);
    },
    async sentAlerts() {
      const { data, error } = await supabase
        .from("founding_alerts")
        .select("threshold");
      if (error) {
        console.error("Supabase alert read failed", error.code, error.message);
        throw error;
      }
      return (data ?? [])
        .map((row) => Number(row.threshold))
        .filter((value) => Number.isFinite(value));
    },
    async markAlertSent(threshold) {
      const { error } = await supabase
        .from("founding_alerts")
        .insert({ threshold });
      if (!error) return true;
      if (error.code === "23505") return false;
      console.error("Supabase alert claim failed", error.code, error.message);
      throw error;
    },
    async unmarkAlertSent(threshold) {
      const { error } = await supabase
        .from("founding_alerts")
        .delete()
        .eq("threshold", threshold);
      if (error) {
        console.error("Supabase alert release failed", error.code, error.message);
        throw error;
      }
    },
  };
}

export function foundingPriceFromSpot(spot: number | null): 49 | 69 | null {
  return priceForSpot(spot);
}
