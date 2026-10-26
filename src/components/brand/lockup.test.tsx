import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Lockup } from "@/components/brand/Lockup";

describe("brand lockup", () => {
  it("stacks SIMPLI over the product line", () => {
    render(<Lockup product="check" surface="light" />);
    expect(screen.getByText("SIMPLI")).toBeInTheDocument();
    expect(screen.getByText("CHECK")).toBeInTheDocument();
  });
});
