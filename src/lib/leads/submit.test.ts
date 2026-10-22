import { describe, expect, it } from "vitest";
import { createMemoryStore } from "@/lib/leads/memory-store";
import { createUnconfiguredStore } from "@/lib/leads/store";
import { submitLead } from "@/lib/leads/submit";
import type { OutboundEmail } from "@/lib/leads/notify";

const base = {
  name: "Jane Doe",
  company: "North Example Inspections",
  email: "jane@example.com",
  stateProvince: "Indiana",
  software: "horizon",
  interest: "check",
  consent: true,
  page: "/horizon",
  source: "internachi",
  utmCampaign: "dec15",
};

function recorder() {
  const messages: OutboundEmail[] = [];
  return {
    messages,
    send: async (message: OutboundEmail) => {
      messages.push(message);
      return { sent: true as const };
    },
  };
}

describe("submitLead", () => {
  it("counts Check signups, alerts at the thresholds, and closes at 100", async () => {
    const store = createMemoryStore();
    const { messages, send } = recorder();

    for (let index = 0; index < 100; index += 1) {
      const outcome = await submitLead(
        { ...base, email: `inspector${index}@example.com`, name: `Inspector ${index}` },
        { store, send },
      );
      expect(outcome.status).toBe(200);
      if (outcome.status !== 200) return;
      expect(outcome.body.foundingSpot).toBe(index + 1);
    }

    const status = await store.status();
    expect(status).toMatchObject({ count: 100, closed: true, configured: true });
    expect(
      messages
        .map((message) => message.subject)
        .filter((subject) => subject.startsWith("Simpli Check founding spots")),
    ).toEqual([
      "Simpli Check founding spots: 40 of 100",
      "Simpli Check founding spots: 50 of 100",
      "Simpli Check founding spots: 90 of 100",
      "Simpli Check founding spots: 100 of 100",
    ]);

    const extra = await submitLead(
      { ...base, email: "late@example.com" },
      { store, send },
    );
    expect(extra.status).toBe(200);
    if (extra.status !== 200) return;
    expect(extra.body.foundingSpot).toBeNull();
    expect(extra.body.foundingClosed).toBe(true);
    expect((await store.status()).count).toBe(100);
  });

  it("does not spend founding spots on Archive or Operate", async () => {
    const store = createMemoryStore();
    const { send } = recorder();
    await submitLead({ ...base, interest: "archive", email: "a@example.com" }, { store, send });
    await submitLead({ ...base, interest: "operate", email: "b@example.com" }, { store, send });
    expect((await store.status()).count).toBe(0);
  });

  it("puts campaign fields in Brian's notification", async () => {
    const store = createMemoryStore();
    const { messages, send } = recorder();
    const outcome = await submitLead(base, { store, send });
    expect(outcome.status).toBe(200);
    const brian = messages.find((message) => message.subject.startsWith("New signup"));
    expect(brian?.text).toContain("dec15");
    expect(brian?.text).toContain("internachi");
    expect(brian?.text).toContain("Lead status: New");
    expect(brian?.text).not.toMatch(/your wording/i);
  });

  it("upgrades an Archive signup into the next founding spot", async () => {
    const store = createMemoryStore();
    const { messages, send } = recorder();
    await submitLead({ ...base, interest: "archive" }, { store, send });
    const outcome = await submitLead({ ...base, interest: "check" }, { store, send });
    expect(outcome.status).toBe(200);
    if (outcome.status !== 200) return;
    expect(outcome.body.upgraded).toBe(true);
    expect(outcome.body.foundingSpot).toBe(1);
    expect(outcome.body.foundingPrice).toBe(49);
    expect(messages.some((message) => message.text.includes("Previous interest: Simpli Archive"))).toBe(
      true,
    );
  });

  it("retries a threshold alert that failed to send", async () => {
    const store = createMemoryStore();
    let failFounding = true;
    const subjects: string[] = [];
    const send = async (message: OutboundEmail) => {
      if (message.subject.startsWith("Simpli Check founding") && failFounding) {
        return { sent: false as const, reason: "email_failed" as const };
      }
      subjects.push(message.subject);
      return { sent: true as const };
    };

    for (let index = 0; index < 40; index += 1) {
      await submitLead(
        { ...base, email: `retry${index}@example.com` },
        { store, send },
      );
    }
    expect(subjects.some((subject) => subject.includes("founding spots: 40"))).toBe(false);

    failFounding = false;
    await submitLead({ ...base, email: "retry40@example.com" }, { store, send });
    expect(subjects.some((subject) => subject.includes("founding spots: 40"))).toBe(true);
  });

  it("does not store honeypot submissions", async () => {
    const store = createMemoryStore();
    const { messages, send } = recorder();
    const outcome = await submitLead({ ...base, hp_token: "spam" }, { store, send });
    expect(outcome.status).toBe(200);
    expect(messages).toHaveLength(0);
    expect((await store.status()).count).toBe(0);
  });

  it("refuses to pretend a lead was saved when storage is not configured", async () => {
    const outcome = await submitLead(base, { store: createUnconfiguredStore() });
    expect(outcome.status).toBe(503);
    if (outcome.status !== 503) return;
    expect(outcome.body.message).toMatch(/brianglon@gmail.com/);
  });
});
