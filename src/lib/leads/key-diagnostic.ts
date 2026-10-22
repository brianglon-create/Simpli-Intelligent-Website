import {
  SUPABASE_SERVICE_ROLE_KEY_NAME,
  supabaseServiceKey,
  supabaseUrl,
} from "@/lib/env";

export type KeyShape = "missing" | "jwt" | "sb_secret" | "sb_publishable" | "other";

export type SupabaseKeyDiagnostic = {
  env: typeof SUPABASE_SERVICE_ROLE_KEY_NAME;
  present: boolean;
  length: number;
  prefix: string;
  shape: KeyShape;
  jwtRole: string | null;
  jwtRef: string | null;
  urlRef: string | null;
  refsMatch: boolean | null;
};

function keyShape(key: string | undefined): KeyShape {
  if (!key) return "missing";
  if (key.startsWith("sb_secret_")) return "sb_secret";
  if (key.startsWith("sb_publishable_")) return "sb_publishable";
  const parts = key.split(".");
  if (parts.length === 3 && parts.every((part) => part.length > 0) && key.startsWith("eyJ")) {
    return "jwt";
  }
  return "other";
}

function decodeJwtClaims(key: string): { role: string | null; ref: string | null } | null {
  const payload = key.split(".")[1];
  if (!payload) return null;
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as { role?: unknown; ref?: unknown };
    return {
      role: typeof parsed.role === "string" ? parsed.role : null,
      ref: typeof parsed.ref === "string" ? parsed.ref : null,
    };
  } catch {
    return null;
  }
}

export function supabaseUrlRef(): string | null {
  const url = supabaseUrl();
  if (!url) return null;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.match(/^([a-z0-9]{20})\.supabase\.co$/)?.[1] ?? null;
  } catch {
    return null;
  }
}

/** Safe description of the admin key. Never includes the key itself. */
export function describeSupabaseServiceKey(): SupabaseKeyDiagnostic {
  const key = supabaseServiceKey();
  const shape = keyShape(key);
  const claims = key && shape === "jwt" ? decodeJwtClaims(key) : null;
  const jwtRef = claims?.ref ?? null;
  const urlRef = supabaseUrlRef();
  return {
    env: SUPABASE_SERVICE_ROLE_KEY_NAME,
    present: Boolean(key),
    length: key?.length ?? 0,
    prefix: key ? key.slice(0, 4) : "",
    shape,
    jwtRole: claims?.role ?? null,
    jwtRef,
    urlRef,
    refsMatch: jwtRef && urlRef ? jwtRef === urlRef : null,
  };
}

function formatDiagnostic(info: SupabaseKeyDiagnostic): string {
  return [
    "reason=failure",
    `env=${info.env}`,
    `present=${info.present}`,
    `length=${info.length}`,
    `prefix=${info.prefix || "(none)"}`,
    `shape=${info.shape}`,
    `role=${info.jwtRole ?? "(none)"}`,
    `jwtRef=${info.jwtRef ?? "(none)"}`,
    `urlRef=${info.urlRef ?? "(none)"}`,
    `refsMatch=${info.refsMatch === null ? "(n/a)" : info.refsMatch}`,
  ].join(" ");
}

/**
 * Log which admin key the server loaded after a Supabase failure.
 * The line contains the env var name, length, a 4-character prefix, the
 * JWT role and project ref, and the ref from SUPABASE_URL. Not the key.
 */
export function logSupabaseKeyDiagnostic(): void {
  console.error("Supabase key diagnostic", formatDiagnostic(describeSupabaseServiceKey()));
}
