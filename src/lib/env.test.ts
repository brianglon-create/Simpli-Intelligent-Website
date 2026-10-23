import { afterEach, describe, expect, it, vi } from "vitest";
import {
  normalizeSupabaseUrl,
  resetSupabaseUrlWarningForTests,
  supabaseUrl,
} from "@/lib/env";

const ref = "abcdefghijklmnopqrst";

describe("normalizeSupabaseUrl", () => {
  it("keeps a project URL and drops /rest/v1 plus trailing slashes", () => {
    expect(normalizeSupabaseUrl(`https://${ref}.supabase.co`)).toBe(
      `https://${ref}.supabase.co`,
    );
    expect(normalizeSupabaseUrl(`https://${ref}.supabase.co/`)).toBe(
      `https://${ref}.supabase.co`,
    );
    expect(normalizeSupabaseUrl(`https://${ref}.supabase.co/rest/v1`)).toBe(
      `https://${ref}.supabase.co`,
    );
    expect(normalizeSupabaseUrl(`https://${ref}.supabase.co/rest/v1/`)).toBe(
      `https://${ref}.supabase.co`,
    );
  });

  it("turns a bare project ref into the project URL", () => {
    expect(normalizeSupabaseUrl(ref)).toBe(`https://${ref}.supabase.co`);
    expect(normalizeSupabaseUrl(ref.toUpperCase())).toBe(`https://${ref}.supabase.co`);
  });

  it("adds https when the host was pasted without it", () => {
    expect(normalizeSupabaseUrl(`${ref}.supabase.co`)).toBe(`https://${ref}.supabase.co`);
    expect(normalizeSupabaseUrl(`http://${ref}.supabase.co`)).toBe(
      `https://${ref}.supabase.co`,
    );
    expect(normalizeSupabaseUrl(`db.${ref}.supabase.co:5432/postgres`)).toBe(
      `https://${ref}.supabase.co`,
    );
  });

  it("ignores whitespace, newlines, and wrapping quotes", () => {
    expect(normalizeSupabaseUrl(` \n"https://${ref}.supabase.co"\r\n `)).toBe(
      `https://${ref}.supabase.co`,
    );
  });

  it("pulls the ref out of a database URL", () => {
    expect(
      normalizeSupabaseUrl(
        `postgresql://postgres:supersecret@db.${ref}.supabase.co:5432/postgres`,
      ),
    ).toBe(`https://${ref}.supabase.co`);
  });

  it("rejects a value that is not a project URL", () => {
    expect(normalizeSupabaseUrl("not a url")).toBeNull();
    expect(normalizeSupabaseUrl("postgres://user:supersecret@localhost/db")).toBeNull();
  });
});

describe("supabaseUrl", () => {
  const original = process.env.SUPABASE_URL;

  afterEach(() => {
    if (original === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = original;
    resetSupabaseUrlWarningForTests();
  });

  it("strips a trailing newline from the env value", () => {
    process.env.SUPABASE_URL = `https://${ref}.supabase.co\n`;
    expect(supabaseUrl()).toBe(`https://${ref}.supabase.co`);
  });

  it("logs a config error without the raw value", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    process.env.SUPABASE_URL = "postgres://user:supersecret@localhost/db";

    expect(supabaseUrl()).toBeUndefined();
    expect(supabaseUrl()).toBeUndefined();

    const text = error.mock.calls.flat().join(" ");
    expect(text).toMatch(/Project URL/);
    expect(text).not.toMatch(/supersecret/);
    expect(error).toHaveBeenCalledTimes(1);
    error.mockRestore();
  });
});
