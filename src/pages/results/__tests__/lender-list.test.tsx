import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LenderList } from "../components/LenderList";
import { createFixtureEngine } from "../engine/fixtureEngine";
import { DEFAULT_SCENARIO } from "../engine/fixtures";

afterEach(() => cleanup());

async function setupList() {
  const result = await createFixtureEngine().calculate(DEFAULT_SCENARIO);
  const onSelect = vi.fn();
  const onSortChange = vi.fn();
  render(
    <LenderList
      lenders={result.lenders}
      leader={result.lenders[0]}
      selectedId={result.lenders[0].id}
      sortBy="maxPrice"
      onSelect={onSelect}
      onSortChange={onSortChange}
    />,
  );
  return { result, onSelect, onSortChange };
}

describe("LenderList", () => {
  it("§7.4: click and arrow keys select lender rows", async () => {
    const user = userEvent.setup();
    const { result, onSelect } = await setupList();

    await user.click(screen.getByRole("option", { name: /2\. CBA/ }));
    expect(onSelect).toHaveBeenLastCalledWith("cba");

    const first = screen.getByRole("option", { name: /1\. Macquarie/ });
    first.focus();
    await user.keyboard("{ArrowDown}");
    expect(onSelect).toHaveBeenLastCalledWith(result.lenders[1].id);
  });

  it("§7.3a: sort changes order intent without recalculating", async () => {
    const user = userEvent.setup();
    const engine = createFixtureEngine();
    const calculate = vi.spyOn(engine, "calculate");
    const result = await engine.calculate(DEFAULT_SCENARIO);
    calculate.mockClear();
    const onSortChange = vi.fn();

    render(
      <LenderList
        lenders={result.lenders}
        leader={result.lenders[0]}
        selectedId={result.lenders[0].id}
        sortBy="maxPrice"
        onSelect={vi.fn()}
        onSortChange={onSortChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Sort" }));
    await user.click(screen.getByRole("radio", { name: "Monthly repayment" }));

    expect(onSortChange).toHaveBeenCalledWith("monthlyRepayment");
    expect(calculate).not.toHaveBeenCalled();
  });
});
