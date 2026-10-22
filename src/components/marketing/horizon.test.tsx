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
    render(<HorizonLanding status={open} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /horizon shuts down december 15, 2026/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/founding spots are available/i)).toBeInTheDocument();
    expect(screen.queryByText(/spots claimed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/left at this rate/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/you're spot \d/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/\$19/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$9\/month/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$49\/month/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$69\/month/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/historical inspection reports/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/isn integrations/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /export checklist/i })).toBeInTheDocument();
    expect(screen.getByText(/not a tour of horizon's screens/i)).toBeInTheDocument();
    expect(screen.getAllByText(/north star inspection services/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /real-time photo recognition/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /automatic narrative generation/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /inspector reference library/i })).toBeInTheDocument();
    expect(screen.getAllByText(/coming to founding members/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/not available to use today/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /protect my report history/i }).length).toBeGreaterThan(1);
    expect(screen.queryByText(/your findings and your wording/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/address, client, or date/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /i agree to receive emails from simpli intelligent, a brand of polaris intelligence llc, about the product i selected/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/brian will follow up personally/i)).toBeInTheDocument();
    expect(
      screen.getByText(/prefer to talk\? reply to the confirmation email or email/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book 15 minutes with brian/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/\bAI\b/)).not.toBeInTheDocument();
  });

  it("stops offering founding tiers when 100 spots are claimed", () => {
    render(<HorizonLanding status={closed} />);
    expect(screen.getByRole("heading", { name: /founding-member pricing is closed/i })).toBeInTheDocument();
    expect(screen.queryByText(/founding spots are available/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/spots claimed/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book 15 minutes with brian/i })).not.toBeInTheDocument();
    expect(screen.getByText(/brian will follow up personally/i)).toBeInTheDocument();
  });

  it("does not invent a live remaining count before storage is connected", () => {
    render(<HorizonLanding status={unconfigured} />);
    expect(screen.queryByText(/founding spots are available/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/spots claimed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/left at this rate/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/\$49\/month/).length).toBeGreaterThan(0);
  });
});

describe("product pages", () => {
  it("keeps Archive pricing and points campaigns back to Horizon", () => {
    render(<ArchiveLanding status={open} />);
    expect(screen.getByRole("heading", { level: 1, name: /don't let december 15, 2026 erase/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /read the full horizon briefing/i })).toHaveAttribute("href", "/horizon");
  });

  it("shows Check as a waitlist built to shorten report writing", () => {
    render(<CheckLanding status={open} />);
    expect(screen.getByRole("heading", { level: 1, name: /cut the time you spend writing the report/i })).toBeInTheDocument();
    expect(screen.getByText(/working home inspector/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /real-time photo recognition/i })).toBeInTheDocument();
    expect(screen.getByText(/identifies the defect as you go/i)).toBeInTheDocument();
    expect(screen.getByText(/you review and edit them/i)).toBeInTheDocument();
    expect(screen.getByText(/what it is, and why it matters/i)).toBeInTheDocument();
    expect(screen.queryByText(/save \d+%/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/not published yet/i)).not.toBeInTheDocument();
    expect(screen.getByText(/founding spots are available/i)).toBeInTheDocument();
    expect(screen.queryByText(/spots claimed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/left at this rate/i)).not.toBeInTheDocument();
  });

  it("uses the same form for Operate and Reach", () => {
    render(
      <ComingSoonLanding
        productName="Simpli Operate"
        eyebrow="SIMPLI OPERATE"
        description="A practical operating platform."
        interest="operate"
        page="/operate"
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
    expect(
      screen.getAllByText(/simpli intelligent, a brand of polaris intelligence llc/i).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText(/\(R\)|®|™/)).not.toBeInTheDocument();
  });
});
