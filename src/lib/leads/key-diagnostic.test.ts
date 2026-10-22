import { afterEach, describe, expect, it, vi } from "vitest";
import { supabaseServiceKey } from "@/lib/env";
import {
  describeSupabaseServiceKey,
  logSupabaseKeyDiagnostic,
  resetSupabaseKeyDiagnosticForTests,
} from "@/lib/leads/key-diagnostic";

const ref = "abcdefghijklmnopqrst";

function jwt(payload: Record<string, unknown>, signature = "sig-not-for-logs"): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.${signature}`;
}

describe("supabase service key diagnostic", () => {
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const originalUrl = process.env.SUPABASE_URL;

  afterEach(() => {
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    resetSupabaseKeyDiagnosticForTests();
  });

  it("reads SUPABASE_SERVICE_ROLE_KEY and strips wrapping quotes", () => {
    const token = jwt({ role: "service_role", ref });
    process.env.SUPABASE_SERVICE_ROLE_KEY = `  "\n${token}\n"  `;
    expect(supabaseServiceKey()).toBe(token);
  });

  it("logs role, both refs, and a 4-character prefix, not the key", () => {
    const token = jwt({ role: "anon", ref }, "super-secret-signature");
    process.env.SUPABASE_SERVICE_ROLE_KEY = token;
    process.env.SUPABASE_URL = `https://${ref}.supabase.co/rest/v1/`;

    const info = describeSupabaseServiceKey();
    expect(info).toMatchObject({
      env: "SUPABASE_SERVICE_ROLE_KEY",
      present: true,
      length: token.length,
      prefix: token.slice(0, 4),
      shape: "jwt",
      jwtRole: "anon",
      jwtRef: ref,
      urlRef: ref,
      refsMatch: true,
    });
    expect(info.prefix).toHaveLength(4);

    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    logSupabaseKeyDiagnostic("startup");
    logSupabaseKeyDiagnostic("startup");
    logSupabaseKeyDiagnostic("failure");
    const text = error.mock.calls.flat().join(" ");
    expect(text).toContain("env=SUPABASE_SERVICE_ROLE_KEY");
    expect(text).toContain("role=anon");
    expect(text).toContain(`jwtRef=${ref}`);
    expect(text).toContain(`urlRef=${ref}`);
    expect(text).toContain("refsMatch=true");
    expect(text).toContain(`prefix=${token.slice(0, 4)}`);
    expect(text).not.toContain(token);
    expect(text).not.toContain("super-secret-signature");
    expect(error).toHaveBeenCalledTimes(2);
    error.mockRestore();
  });

  it("reports when the JWT project ref differs from SUPABASE_URL", () => {
    process.env.SUPABASE_SERVICE_ROLE_KEY = jwt({ role: "service_role", ref });
    process.env.SUPABASE_URL = "https://zzzzzzzzzzzzzzzzzzzz.supabase.co";
    expect(describeSupabaseServiceKey()).toMatchObject({
      jwtRole: "service_role",
      jwtRef: ref,
      urlRef: "zzzzzzzzzzzzzzzzzzzz",
      refsMatch: false,
    });
  });

  it("marks a secret-key prefix and a project-ref mismatch", () => {
    process.env.SUPABASE_SERVICE_ROLE_KEY = "sb_secret_do-not-log-the-rest";
    process.env.SUPABASE_URL = "https://zzzzzzzzzzzzzzzzzzzz.supabase.co";
    const info = describeSupabaseServiceKey();
    expect(info.shape).toBe("sb_secret");
    expect(info.prefix).toBe("sb_s");
    expect(info.jwtRole).toBeNull();
    expect(info.jwtRef).toBeNull();
    expect(info.urlRef).toBe("zzzzzzzzzzzzzzzzzzzz");
    expect(info.refsMatch).toBeNull();
    expect(JSON.stringify(info)).not.toContain("do-not-log-the-rest");
  });

  it("reports a missing key without throwing", () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.SUPABASE_URL;
    expect(describeSupabaseServiceKey()).toMatchObject({
      env: "SUPABASE_SERVICE_ROLE_KEY",
      present: false,
      length: 0,
      prefix: "",
      shape: "missing",
      refsMatch: null,
    });
  });
});
