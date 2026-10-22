import { afterEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/lead/route";
import { createMemoryStore } from "@/lib/leads/memory-store";
import { resetRateLimitForTests } from "@/lib/leads/rate-limit";
import { setLeadStoreForTests } from "@/lib/leads/store";

const valid = {
  name: "Jane Doe",
  company: "North Example Inspections",
  email: "jane@example.com",
  stateProvince: "Ontario",
  software: "horizon",
  interest: "archive",
  consent: true,
  page: "/horizon",
  utmCampaign: "dec15",
};

function post(body: unknown, headers: Record<string, string> = {}) {
  return POST(
    new Request("http://localhost:3000/api/lead", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        host: "localhost:3000",
        ...headers,
      },
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/lead", () => {
  afterEach(() => {
    setLeadStoreForTests(null);
    resetRateLimitForTests();
  });

  it("rejects a cross-origin post", async () => {
    setLeadStoreForTests(createMemoryStore());
    const response = await post(valid, { origin: "https://evil.example" });
    expect(response.status).toBe(403);
  });

  it("saves a same-origin signup", async () => {
    const store = createMemoryStore();
    setLeadStoreForTests(store);
    const response = await post(valid);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.interest).toBe("archive");
    expect(body.foundingSpot).toBeNull();
  });

  it("returns field errors for an incomplete signup", async () => {
    setLeadStoreForTests(createMemoryStore());
    const response = await post({ ...valid, email: "not-an-email", consent: false });
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.fields.email).toBeTruthy();
    expect(body.fields.consent).toBeTruthy();
  });
});
