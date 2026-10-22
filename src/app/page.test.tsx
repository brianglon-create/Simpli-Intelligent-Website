import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { NAV_LINKS, PRODUCTS, SITE } from "@/lib/site";

describe("Simpli Intelligent homepage", () => {
  it("renders the brand wordmark and hero content", () => {
    render(<Home />);

    expect(
      screen.getAllByText(SITE.wordmark).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /built for small business\. built by small business\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /we're creating a connected family of business applications/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /explore our products/i }),
    ).toHaveAttribute("href", "#products");
  });

  it("renders the founder message under Why We Built Simpli", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /why we built simpli/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /build practical business tools that save time, reduce stress/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/your software shouldn't make it harder\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/— Brian Glon/i)).toBeInTheDocument();
    expect(screen.getByText(/founder, simpli intelligent/i)).toBeInTheDocument();
  });

  it("exposes primary navigation anchors for each section", () => {
    render(<Home />);

    const nav = screen.getByRole("navigation", { name: /primary/i });

    for (const link of NAV_LINKS) {
      expect(
        within(nav).getByRole("link", { name: link.label }),
      ).toHaveAttribute("href", link.href);
    }
  });

  it("renders product cards with the correct status badges", () => {
    render(<Home />);

    for (const product of PRODUCTS) {
      expect(
        screen.getByRole("heading", { level: 3, name: product.name }),
      ).toBeInTheDocument();
      expect(screen.getByText(product.status)).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: `View ${product.name}` }),
      ).toHaveAttribute("href", product.href);
    }
  });

  it("uses the shared contact email beside the signup form", () => {
    render(<Home />);

    expect(screen.getByRole("button", { name: /join the list/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: SITE.contactEmail }),
    ).toHaveAttribute("href", `mailto:${SITE.contactEmail}`);
  });

  it("includes company footprint details in the footer", () => {
    render(<Home />);

    expect(
      screen.getByText(`© ${SITE.copyrightYear} ${SITE.name}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Operated by ${SITE.legalEntity}`),
    ).toBeInTheDocument();
    expect(screen.getAllByText(SITE.location).length).toBeGreaterThanOrEqual(1);
  });

  it("opens and closes the mobile navigation menu", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const menuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(menuButton);

    const mobileNav = screen.getByRole("navigation", { name: /mobile/i });
    expect(mobileNav).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(
      screen.queryByRole("navigation", { name: /mobile/i }),
    ).not.toBeInTheDocument();
  });
});
