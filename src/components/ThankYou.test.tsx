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
  it("hides the booking link when no booking URL is set", () => {
    render(<ThankYou result={result} bookingUrl={null} />);

    expect(screen.getByRole("heading", { name: /you're on the list/i })).toBeInTheDocument();
    expect(
      screen.getByText(/you're spot 2 of the first 50, locked in line for the \$49\/month founding rate/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book 15 minutes with brian/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/prefer to talk/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
  });

  it("places a later spot inside the $69 tier", () => {
    render(
      <ThankYou
        result={{ ...result, foundingSpot: 51, foundingPrice: 69 }}
        bookingUrl={null}
      />,
    );
    expect(
      screen.getByText(
        /you're spot 1 of the next 50 \(spots 51-100\), in line for the \$69\/month founding rate/i,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book 15 minutes with brian/i })).not.toBeInTheDocument();
  });

  it("shows the booking link when a URL is set", () => {
    render(<ThankYou result={result} bookingUrl="https://cal.example/brian" />);

    expect(screen.getByText(/prefer to talk/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book 15 minutes with brian/i })).toHaveAttribute(
      "href",
      "https://cal.example/brian",
    );
  });
});
