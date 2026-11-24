import { afterEach, describe, expect, it, vi } from "vitest";
import {
  OPERATE_CHECKOUT_URL,
  submitCheckOrder,
  validateCheckOrder,
  type CheckOrderBody,
} from "@/lib/operate-checkout";

const valid = {
  seats: 2,
  turnstileToken: "token",
  firstName: "Ada",
  lastName: "Inspector",
  email: "ada@example.com",
  phone: "(574) 555-1212",
  companyName: "Test Company",
  line1: "123 Main",
  line2: "",
  city: "South Bend",
  state: "in",
  zip: "46628",
};

function bodyOf(): CheckOrderBody {
  const result = validateCheckOrder(valid);
  if (!result.ok) throw new Error("expected a valid order");
  return result.body;
}

describe("validateCheckOrder", () => {
  it("builds the Operate body without a price", () => {
    const result = validateCheckOrder(valid);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.body).toEqual({
      product: "simpli_check",
      seats: 2,
      turnstileToken: "token",
      contact: {
        firstName: "Ada",
        lastName: "Inspector",
        email: "ada@example.com",
        phone: "5745551212",
      },
      companyName: "Test Company",
      billingAddress: {
        line1: "123 Main",
        city: "South Bend",
        state: "IN",
        zip: "46628",
        country: "US",
      },
      source: "website",
    });
    expect(result.body).not.toHaveProperty("price");
    expect(JSON.stringify(result.body)).not.toMatch(/price|amount|total/i);
  });

  it("keeps an optional address line when it is filled in", () => {
    const result = validateCheckOrder({ ...valid, line2: "Suite 4" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.body.billingAddress.line2).toBe("Suite 4");
  });

  it("rejects a short phone, a long zip, and a state that is not two letters", () => {
    const result = validateCheckOrder({
      ...valid,
      phone: "555-1212",
      zip: "4662",
      state: "Indiana",
      seats: 5,
      turnstileToken: "",
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.fields.phone).toMatch(/10 digits/);
    expect(result.fields.zip).toMatch(/5-digit/);
    expect(result.fields.state).toMatch(/state/i);
    expect(result.fields.seats).toMatch(/1 to 4/);
    expect(result.fields.turnstileToken).toMatch(/security check/i);
  });
});

describe("submitCheckOrder", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("posts json with a new idempotency key and redirects on 201", async () => {
    const keys = ["key-1", "key-2"];
    vi.stubGlobal("crypto", { randomUUID: () => keys.shift() });
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ orderUrl: "https://pay.example/order", orderId: "ord_1", status: "created" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const first = await submitCheckOrder(bodyOf());
    const second = await submitCheckOrder(bodyOf());
    expect(first).toEqual({ ok: true, orderUrl: "https://pay.example/order" });
    expect(second.ok).toBe(true);

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(OPERATE_CHECKOUT_URL);
    expect(init.method).toBe("POST");
    const headers = init.headers as Record<string, string>;
    expect(headers["Content-Type"]).toBe("application/json");
    expect(headers["Idempotency-Key"]).toBe("key-1");
    const secondHeaders = (fetchMock.mock.calls[1] as unknown as [string, RequestInit])[1].headers as Record<string, string>;
    expect(secondHeaders["Idempotency-Key"]).toBe("key-2");
    expect(JSON.parse(String(init.body))).not.toHaveProperty("price");
  });

  it("returns a network failure when the browser cannot reach checkout", async () => {
    vi.stubGlobal("crypto", { randomUUID: () => "key" });
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    }));
    const result = await submitCheckOrder(bodyOf());
    expect(result).toEqual({ ok: false, kind: "network" });
  });

  it("returns validation detail for a 4xx response", async () => {
    vi.stubGlobal("crypto", { randomUUID: () => "key" });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ message: "ZIP code is not valid.", errors: { zip: "Use 5 digits." } }), {
          status: 422,
        }),
      ),
    );
    const result = await submitCheckOrder(bodyOf());
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.kind).toBe("invalid");
    expect(result.detail).toMatch(/ZIP code/);
    expect(result.fields?.zip).toBe("Use 5 digits.");
  });

  it("returns unavailable for a 5xx response", async () => {
    vi.stubGlobal("crypto", { randomUUID: () => "key" });
    vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 503 })));
    const result = await submitCheckOrder(bodyOf());
    expect(result).toMatchObject({ ok: false, kind: "unavailable" });
  });
});
