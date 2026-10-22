import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThankYou } from "@/components/ThankYou";
import type { SuccessBody } from "@/lib/leads/types";

const result: SuccessBody = {
  ok: true,
  duplicate: false,
  upgraded: false,
  interest: "both",
  foundingSpot: 2,
  foundingPrice: 49,
  foundingClosed: false,
  notified: false,
};

describe("ThankYou", () => {
  it("names the tier price and points people to email instead of a booking link", () => {
    render(<ThankYou result={result} />);

    expect(screen.getByRole("heading", { name: /you're on the list/i })).toBeInTheDocument();
    expect(
      screen.getByText(/you're in line for a founding spot at \$49\/month \(first 50\)/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/you're spot \d/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bspot 2\b/i)).not.toBeInTheDocument();
    expect(screen.getByText(/brian will follow up personally/i)).toBeInTheDocument();
    expect(
      screen.getByText(/prefer to talk\? reply to the confirmation email or email/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /brian@simpliintelligent.com/i })).toHaveAttribute(
      "href",
      "mailto:brian@simpliintelligent.com",
    );
    expect(screen.queryByRole("link", { name: /book 15 minutes with brian/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/cal\.com|calendly/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
  });

  it("places a later signup in the $69 tier without a spot number", () => {
    render(<ThankYou result={{ ...result, foundingSpot: 51, foundingPrice: 69 }} />);
    expect(
      screen.getByText(/you're in line for a founding spot at \$69\/month \(next 50\)/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/you're spot \d/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\b51\b/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book 15 minutes with brian/i })).not.toBeInTheDocument();
  });
});
