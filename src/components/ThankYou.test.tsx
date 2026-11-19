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
  it("states the public price and points people to email instead of a booking link", () => {
    render(<ThankYou result={result} />);

    expect(screen.getByRole("heading", { name: /you're on the list/i })).toBeInTheDocument();
    expect(screen.getByText(/\$49 per user per month/i)).toBeInTheDocument();
    expect(screen.queryByText(/\$69/)).not.toBeInTheDocument();
    expect(screen.queryByText(/you're spot \d/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bspot 2\b/i)).not.toBeInTheDocument();
    expect(screen.getByText(/the founder will follow up personally/i)).toBeInTheDocument();
    expect(screen.queryByText(/\bBrian\b/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/prefer to talk\? reply to the confirmation email or email/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /hello@simpliintelligent.com/i })).toHaveAttribute(
      "href",
      "mailto:hello@simpliintelligent.com",
    );
    expect(screen.queryByRole("link", { name: /book 15 minutes/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/cal\.com|calendly/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByText(/this signup does not buy the product/i)).toBeInTheDocument();
  });

  it("does not quote a second price when the database spot is later", () => {
    render(<ThankYou result={{ ...result, foundingSpot: 51, foundingPrice: 69 }} />);
    expect(screen.getByText(/\$49 per user per month/i)).toBeInTheDocument();
    expect(screen.queryByText(/\$69/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\b51\b/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book 15 minutes/i })).not.toBeInTheDocument();
  });
});
