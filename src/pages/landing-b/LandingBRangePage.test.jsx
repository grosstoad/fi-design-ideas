import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { axe } from "vitest-axe";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import LandingBRangePage from "../LandingBRangePage";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
  };
});

afterEach(() => {
  document.body.style.overflow = "";
  cleanup();
});

function renderPage() {
  return render(
    <MemoryRouter>
      <LandingBRangePage />
    </MemoryRouter>
  );
}

describe("Landing B range experience", () => {
  it("renders the approved copy and complete fourteen-lender comparison", () => {
    renderPage();

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Find the home you can really afford."
    );
    expect(
      screen.getByText(
        "Compare what you could borrow across 14+ lenders, based on real lender rules, rates and purchase costs."
      )
    ).toBeTruthy();
    expect(screen.getByText("Your purchase power range")).toBeTruthy();

    const comparison = screen.getByLabelText("Illustrative lender comparison");
    const lenderRows = comparison.querySelectorAll(".lpb-comparison-row");
    expect(lenderRows).toHaveLength(14);
    expect([...lenderRows].some((row) => row.textContent?.includes("Athena"))).toBe(true);
    expect(screen.getByText("The maximum property price you could afford.")).toBeTruthy();
    expect(screen.getByText("Monthly repayment")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /pause logos/i })).toBeNull();
    const lenderProof = screen.getByLabelText("All 14 lenders included in the comparison");
    expect(lenderProof.querySelectorAll(".lpb-lender-rail:not([aria-hidden]) .lpb-lender-mark")).toHaveLength(14);
  });

  it("supports the one-million-dollar income endpoint", () => {
    renderPage();
    const slider = screen.getByRole("slider", { name: "Household income" });
    expect(slider.getAttribute("max")).toBe("1000000");

    fireEvent.change(slider, { target: { value: "1000000" } });

    expect(slider.value).toBe("1000000");
    expect(slider.getAttribute("aria-valuetext")).toBe("$1,000,000 household income a year");
    expect(screen.getByText("$2.49M")).toBeTruthy();
  });

  it("opens assumptions as a dialog with honest illustrative disclosure", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "How we worked this out" }));

    const dialog = screen.getByRole("dialog", { name: "How this example was worked out" });
    expect(
      within(dialog).getByText(/not connected to live lender policy/i)
    ).toBeTruthy();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("keeps every lender row presentational and inert", () => {
    renderPage();
    const comparison = screen.getByLabelText("Illustrative lender comparison");
    expect(comparison.querySelectorAll("button")).toHaveLength(0);
    expect(comparison.querySelectorAll("[aria-hidden='true'].lpb-comparison-row")).toHaveLength(14);
    expect(screen.getAllByText(/\/mth$/).length).toBeGreaterThan(0);
  });

  it("shows all three walkthrough states without tab interactions", () => {
    renderPage();
    const howItWorks = screen.getByRole("heading", { name: "From your details to a number you can use." }).closest("section");
    expect(within(howItWorks).getByRole("heading", { name: "Add your details" })).toBeTruthy();
    expect(within(howItWorks).getByRole("heading", { name: "Compare lender results" })).toBeTruthy();
    expect(within(howItWorks).getByRole("heading", { name: "Understand your costs" })).toBeTruthy();
    expect(within(howItWorks).queryByRole("button")).toBeNull();
    expect(within(howItWorks).getByText("Annual income")).toBeTruthy();
    expect(within(howItWorks).getByText("Purchase power range")).toBeTruthy();
    expect(within(howItWorks).getByText("Funding breakdown")).toBeTruthy();
    expect(within(howItWorks).getByText("Loan from CBA (79% LVR)")).toBeTruthy();
    expect(within(howItWorks).getByText("Deposit")).toBeTruthy();
    expect(within(howItWorks).getByText("Savings left over")).toBeTruthy();
  });

  it("renders three borderless proposition columns with the approved copy", () => {
    renderPage();
    const section = screen.getByRole("heading", { name: "A borrowing number you can trust." }).closest("section");
    expect(within(section).getAllByRole("article")).toHaveLength(3);
    expect(within(section).getByRole("heading", { name: "Compare every lender side by side" })).toBeTruthy();
    expect(within(section).getByRole("heading", { name: "Built on real lender calculations" })).toBeTruthy();
    expect(within(section).getByRole("heading", { name: "Test changes before you make them" })).toBeTruthy();
    expect(section.querySelector(".lpb-flow-number")).toBeNull();
  });

  it("has no automated accessibility violations in its default state", async () => {
    const { container } = renderPage();
    const result = await axe(container);
    expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  });
});
