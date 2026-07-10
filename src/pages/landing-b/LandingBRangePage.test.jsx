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
    const lenderButtons = within(comparison).getAllByRole("button");
    expect(lenderButtons).toHaveLength(14);
    expect(lenderButtons.some((button) => button.getAttribute("aria-label")?.startsWith("Athena,"))).toBe(true);
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

  it("opens a lender detail dialog containing both rate types", async () => {
    const user = userEvent.setup();
    renderPage();
    const comparison = screen.getByLabelText("Illustrative lender comparison");
    await user.click(within(comparison).getAllByRole("button")[0]);

    const dialog = screen.getByRole("dialog", { name: /example$/i });
    expect(within(dialog).getByText("Interest rate")).toBeTruthy();
    expect(within(dialog).getByText("Comparison rate")).toBeTruthy();
  });

  it("switches between interactive walkthrough components", async () => {
    const user = userEvent.setup();
    renderPage();

    const incomeInput = screen.getByRole("textbox", { name: /Household income/i });
    await user.clear(incomeInput);
    await user.type(incomeInput, "180000");
    expect(incomeInput.value).toBe("180,000");

    await user.click(screen.getByRole("button", { name: /See how the lenders stack up/i }));
    expect(screen.getByText("Selected lender")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /See your total costs/i }));
    expect(screen.getAllByText("Where the funds are sourced from").length).toBeGreaterThan(0);
  });

  it("has no automated accessibility violations in its default state", async () => {
    const { container } = renderPage();
    const result = await axe(container);
    expect(result.violations).toHaveLength(0);
  });
});
