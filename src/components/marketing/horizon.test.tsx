import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArchiveLanding } from "@/components/marketing/ArchiveLanding";
import { CheckLanding } from "@/components/marketing/CheckLanding";
import { ComingSoonLanding } from "@/components/marketing/ComingSoonLanding";
import { HorizonLanding } from "@/components/marketing/HorizonLanding";
import { foundingSnapshot } from "@/lib/leads/founding";
import PrivacyPage from "@/app/privacy/page";

const open = foundingSnapshot(12, true);
const closed = foundingSnapshot(100, true);
const unconfigured = foundingSnapshot(0, false);

describe("Horizon landing", () => {
  it("explains the shutdown, the migration gap, pricing, and the export sequence", () => {
    render(<HorizonLanding status={open} bookingUrl={null} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /horizon shuts down december 15, 2026/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/12 of 100 founding spots claimed/i)).toBeInTheDocument();
    expect(screen.getByText(/38 of 50 left at this rate/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\$19/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$9\/month/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$49\/month/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$69\/month/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/historical inspection reports/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/isn integrations/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /export checklist/i })).toBeInTheDocument();
    expect(screen.getByText(/not a tour of horizon's screens/i)).toBeInTheDocument();
    expect(screen.getAllByText(/north star inspection services/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/feature details are not published yet/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /protect my report history/i }).length).toBeGreaterThan(1);
    expect(screen.queryByText(/your findings and your wording/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/address, client, or date/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book 15 minutes with brian/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/\bAI\b/)).not.toBeInTheDocument();
  });

  it("stops offering founding tiers when 100 spots are claimed", () => {
    render(<HorizonLanding status={closed} bookingUrl="https://cal.example/brian" />);
    expect(screen.getByRole("heading", { name: /founding-member pricing is closed/i })).toBeInTheDocument();
    expect(screen.queryByText(/spots claimed/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book 15 minutes with brian/i })).toHaveAttribute(
      "href",
      "https://cal.example/brian",
    );
  });

  it("does not invent a live remaining count before storage is connected", () => {
    render(<HorizonLanding status={unconfigured} bookingUrl={null} />);
    expect(screen.queryByText(/spots claimed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/left at this rate/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/\$49\/month/).length).toBeGreaterThan(0);
  });
});

describe("product pages", () => {
  it("keeps Archive pricing and points campaigns back to Horizon", () => {
    render(<ArchiveLanding status={open} bookingUrl={null} />);
    expect(screen.getByRole("heading", { level: 1, name: /don't let december 15, 2026 erase/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /read the full horizon briefing/i })).toHaveAttribute("href", "/horizon");
  });

  it("shows the Check waitlist without a feature list", () => {
    render(<CheckLanding status={open} bookingUrl={null} />);
    expect(screen.getByRole("heading", { level: 1, name: /built by an inspector, not a sales team/i })).toBeInTheDocument();
    expect(screen.getByText(/does not list features/i)).toBeInTheDocument();
  });

  it("uses the same form for Operate and Reach", () => {
    render(
      <ComingSoonLanding
        productName="Simpli Operate"
        eyebrow="SIMPLI OPERATE"
        description="A practical operating platform."
        interest="operate"
        page="/operate"
        bookingUrl={null}
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: /simpli operate is coming soon/i })).toBeInTheDocument();
    expect(screen.getByText(/you're joining the simpli operate list/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join the simpli operate list/i })).toBeInTheDocument();
  });
});

describe("privacy page", () => {
  it("covers consent, unsubscribe, and the company address", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { level: 1, name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /casl, and can-spam/i })).toBeInTheDocument();
    expect(screen.getAllByText(/unsubscribe/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/express consent/i)).toBeInTheDocument();
    expect(screen.getAllByText(/polaris intelligence llc/i).length).toBeGreaterThan(0);
  });
});
