import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CheckOrderForm } from "@/components/check/CheckOrderForm";
import { CheckLanding } from "@/components/marketing/CheckLanding";

describe("Check order form", () => {
  it("shows the Early Adopter total and the agreement line", () => {
    render(<CheckOrderForm />);
    expect(screen.getByText(/early adopter/i)).toBeInTheDocument();
    expect(screen.getByText(/\$49 × 1 = \$49 per month/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /simpli check agreement/i })).toHaveAttribute("href", "/legal");
  });

  it("shows field errors and does not offer checkout for 5 or more inspectors", async () => {
    const user = userEvent.setup();
    render(<CheckOrderForm />);
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText(/enter a first name/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 10 digits/i)).toBeInTheDocument();
    expect(screen.getByText(/5-digit zip code/i)).toBeInTheDocument();
    expect(screen.getByText(/complete the security check/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "5+" }));
    expect(screen.getByRole("link", { name: /contact us for 5 or more inspectors/i })).toHaveAttribute(
      "href",
      "/#contact",
    );
    expect(screen.queryByRole("button", { name: "Continue" })).not.toBeInTheDocument();
    expect(screen.queryByText(/\$49 ×/)).not.toBeInTheDocument();
  });
});

describe("Simpli Check buy buttons", () => {
  it("opens the order form and leaves Archive on a placeholder", () => {
    render(<CheckLanding />);
    const checkLinks = screen.getAllByRole("link", { name: /get simpli check/i });
    expect(checkLinks.length).toBeGreaterThan(0);
    for (const link of checkLinks) {
      expect(link).toHaveAttribute("href", "/check/order");
    }
    const archive = screen.getByRole("link", { name: /add simpli archive/i });
    expect(archive).toHaveAttribute("href", "#checkout-not-connected");
  });
});
