import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createFixtureEngine } from "../engine/fixtureEngine";
import { useResults } from "../hooks/useResults";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

function Harness({ engine }: { engine: ReturnType<typeof createFixtureEngine> }) {
  const results = useResults(engine);
  return (
    <div>
      <div data-testid="status">{results.status}</div>
      <button type="button" onClick={() => results.setSortBy("monthlyRepayment")}>
        sort
      </button>
      <button
        type="button"
        onClick={() =>
          void results.saveScenario({
            ...results.scenario,
            loan: { ...results.scenario.loan, repay: "io" },
          })
        }
      >
        save
      </button>
    </div>
  );
}

describe("useResults", () => {
  it("§7.3a/§7.7: sort does not recalculate; explicit save recalculates exactly once", async () => {
    const user = userEvent.setup();
    const engine = createFixtureEngine();
    const calculate = vi.spyOn(engine, "calculate");
    render(<Harness engine={engine} />);

    await waitFor(() => expect(screen.getByTestId("status").textContent).toBe("ready"));
    calculate.mockClear();

    await user.click(screen.getByRole("button", { name: "sort" }));
    expect(calculate).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "save" }));
    await waitFor(() => expect(screen.getByTestId("status").textContent).toBe("ready"));
    expect(calculate).toHaveBeenCalledTimes(1);
  });
});
