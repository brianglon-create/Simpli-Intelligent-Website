import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LEAD_STATUSES, PRODUCT_INTERESTS } from "@/lib/leads/types";

const sql = readFileSync(
  path.join(process.cwd(), "supabase/migrations/20261022160000_create_leads.sql"),
  "utf8",
);

describe("Supabase leads migration", () => {
  it("creates the shared leads table and the statuses Operate can use later", () => {
    expect(sql).toContain("create table if not exists public.leads");
    expect(sql).toContain("company text not null");
    expect(sql).toContain("state_province text not null");
    expect(sql).toContain("current_software text not null");
    expect(sql).toContain("product_interest text not null");
    expect(sql).toContain("lead_status text not null default 'New'");
    expect(sql).toContain("consent boolean not null");
    expect(sql).toContain("created_at timestamptz not null default now()");
    for (const column of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "source",
    ]) {
      expect(sql).toContain(column);
    }
    for (const status of LEAD_STATUSES) {
      expect(sql).toContain(`'${status}'`);
    }
    for (const interest of PRODUCT_INTERESTS) {
      expect(sql).toContain(`'${interest}'`);
    }
  });

  it("counts founding spots in Postgres and closes the offer at 100", () => {
    expect(sql).toContain("v_is_new := not found");
    expect(sql).toContain("where founding_spot is not null");
    expect(sql).toContain("v_count < 100");
    expect(sql).toContain("pg_advisory_xact_lock");
    expect(sql).toContain("grant execute on function public.submit_lead");
    expect(sql).toContain("to service_role");
    expect(sql).toContain("revoke all on function public.submit_lead");
    expect(sql).toContain("from public, anon, authenticated");
    expect(sql).toContain("enable row level security");
  });
});
