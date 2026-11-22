import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArchiveLanding } from "@/components/marketing/ArchiveLanding";
import { CheckLanding } from "@/components/marketing/CheckLanding";
import { ComingSoonLanding } from "@/components/marketing/ComingSoonLanding";
import { HorizonLanding } from "@/components/marketing/HorizonLanding";
import PrivacyLegalPage from "@/app/legal/privacy/page";

describe("Horizon landing", () => {
  it("explains the shutdown, the new prices, and the export sequence", () => {
    render(<HorizonLanding />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /horizon shuts down december 15, 2026/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/\$29/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$9\.99/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$49 per user per month/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/\$19/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\$69/)).not.toBeInTheDocument();
    expect(screen.queryByText(/included for simpli check early/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/historical inspection reports/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /export checklist/i })).toBeInTheDocument();
    expect(screen.getByText(/not a tour of horizon's screens/i)).toBeInTheDocument();
    expect(screen.getAllByText(/10 years of hands-on industry experience/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/north star/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bBrian\b/)).not.toBeInTheDocument();
    expect(screen.queryByText(/identifies the defect/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/launching november/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/waitlist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/early access/i)).not.toBeInTheDocument();
    expect(screen.getByText(/us only for now\. canada later\./i)).toBeInTheDocument();
    expect(screen.queryByText(/does not charge a card/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/before you pay/i)).not.toBeInTheDocument();
    expect(screen.getByText(/not something you can use today/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /get simpli archive/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /get simpli check/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /send me launch updates/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /help me bring my narratives/i })).toBeInTheDocument();
    expect(screen.queryByText(/\bAI\b/)).not.toBeInTheDocument();
    expect(screen.queryByText(/office staff/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/unlimited reports/i)).not.toBeInTheDocument();
  });
});

describe("product pages", () => {
  it("shows approved Archive prices and a buy button", () => {
    render(<ArchiveLanding />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /horizon exports end december 15, 2026\. keep your inspection history/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /how to export from horizon/i })).toHaveAttribute(
      "href",
      "/horizon#export-checklist",
    );
    expect(screen.getAllByRole("link", { name: /get simpli archive/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/no setup fee/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/\$19/)).not.toBeInTheDocument();
    expect(screen.queryByText(/before you pay/i)).not.toBeInTheDocument();
  });

  it("shows the locked Check headline, migration section, and screenshot slots", () => {
    render(<CheckLanding />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /your words\. your photos\. your report, done faster\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /switching software shouldn't mean starting over/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/10 years of hands-on industry experience/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/north star/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bBrian\b/)).not.toBeInTheDocument();
    expect(screen.queryByText(/identifies the defect/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/waitlist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/early access/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\$69/)).not.toBeInTheDocument();
    expect(screen.queryByText(/office staff/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/unlimited reports/i)).not.toBeInTheDocument();
    expect(screen.getByText(/screenshot 01/i)).toBeInTheDocument();
    expect(screen.getByText(/check-01-report-writer\.png/i)).toBeInTheDocument();
    expect(screen.getByText(/check-02-saved-narratives\.png/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /get simpli check/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute(
      "href",
      "#how-it-works",
    );
    expect(screen.queryByText(/\bAI\b/)).not.toBeInTheDocument();
  });

  it("uses the same form for Operate and Reach", () => {
    render(
      <ComingSoonLanding
        productName="Simpli Operate"
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
  it("publishes the v1.1 privacy policy", () => {
    render(<PrivacyLegalPage />);
    expect(screen.getByRole("heading", { level: 1, name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByText(/version 1\.1 · effective november 22, 2026/i)).toBeInTheDocument();
    expect(screen.queryByText(/counsel/i)).not.toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Provider" })).toBeInTheDocument();
    expect(screen.queryByText(/simpli simpli/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\(R\)|®|™/)).not.toBeInTheDocument();
  });
});
