import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LenderDetail } from "../components/LenderDetail";
import { createFixtureEngine } from "../engine/fixtureEngine";
import { DEFAULT_SCENARIO } from "../engine/fixtures";
import { copy } from "../lib/copy";

afterEach(() => cleanup());

async function setupDetail(index = 0) {
  const result = await createFixtureEngine().calculate(DEFAULT_SCENARIO);
  render(
    <LenderDetail
      lender={result.lenders[index]}
      leader={result.lenders[0]}
      scenario={DEFAULT_SCENARIO}
      sortBy="maxPrice"
      onBroker={vi.fn()}
      onUpdate={vi.fn()}
    />,
  );
  return result;
}

describe("LenderDetail", () => {
  it("§7.6/A13: renders max property price and loan amount as equal capacity tiles", async () => {
    await setupDetail();
    const pair = screen.getByTestId("capacity-pair");
    const tiles = pair.querySelectorAll(":scope > div");

    expect(within(pair).getByText(copy.pair.price)).toBeTruthy();
    expect(within(pair).getByText(copy.pair.loan)).toBeTruthy();
    expect(tiles).toHaveLength(2);
  });

  it("§12a/A14: gives rate and comparison rate identical value classes", async () => {
    await setupDetail();
    const ratePair = screen.getByTestId("rate-pair");
    const values = within(ratePair).getAllByText(/% p\.a\./);

    expect(values).toHaveLength(2);
    expect(values[0].className).toBe(values[1].className);
  });

  it("§8: expands funds to complete breakdown", async () => {
    const user = userEvent.setup();
    await setupDetail();

    await user.click(screen.getByRole("button", { name: copy.funds.view }));
    expect(screen.getByText(copy.funds.needed)).toBeTruthy();
    expect(screen.getByText(copy.funds.sources)).toBeTruthy();
    expect(screen.getByText(copy.funds.remaining)).toBeTruthy();
  });

  it("§7.8a: shows compare footer when selected lender is not the leader", async () => {
    await setupDetail(1);
    expect(screen.getByLabelText(copy.card.compareAria).textContent).toContain(copy.compare.caption("max property price", "Macquarie"));
  });
});
