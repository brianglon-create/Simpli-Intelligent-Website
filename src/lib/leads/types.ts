export const PRODUCT_INTERESTS = [
  "archive",
  "check",
  "both",
  "operate",
  "reach",
] as const;

export type Interest = (typeof PRODUCT_INTERESTS)[number];

export const LEAD_STATUSES = [
  "New",
  "Researching",
  "Interested",
  "Invited",
  "Follow-Up Needed",
  "Member",
  "Not a Fit",
  "Archived",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type LeadInput = {
  name: string;
  company: string;
  email: string;
  stateProvince: string;
  currentSoftware: string;
  productInterest: Interest;
  reportCount: string | null;
  source: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  page: string | null;
};

export type StoredLead = LeadInput & {
  id: string;
  createdAt: string;
  leadStatus: LeadStatus;
  foundingSpot: number | null;
};

export type SaveResult =
  | {
      ok: true;
      duplicate: boolean;
      upgraded: boolean;
      previousInterest: Interest | null;
      lead: StoredLead;
      foundingCount: number;
      pendingAlerts: number[];
    }
  | { ok: false; reason: "storage_unconfigured" };

export type FoundingSnapshot = {
  configured: boolean;
  count: number;
  closed: boolean;
  tier49Remaining: number;
  tier69Remaining: number;
};

export interface LeadStore {
  kind: "supabase" | "memory" | "unconfigured";
  save(input: LeadInput): Promise<SaveResult>;
  status(): Promise<FoundingSnapshot>;
  sentAlerts(): Promise<number[]>;
  /** Returns false when another worker already claimed the threshold. */
  markAlertSent(threshold: number): Promise<boolean>;
  unmarkAlertSent(threshold: number): Promise<void>;
}

export type SuccessBody = {
  ok: true;
  duplicate: boolean;
  upgraded: boolean;
  interest: Interest;
  foundingSpot: number | null;
  foundingPrice: 49 | 69 | null;
  foundingClosed: boolean;
  notified: boolean;
};
