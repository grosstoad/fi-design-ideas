import { cleanup, render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BrokerOverlay } from "../components/BrokerOverlay";
import { LenderDetail } from "../components/LenderDetail";
import { createFixtureEngine } from "../engine/fixtureEngine";
import { DEFAULT_SCENARIO } from "../engine/fixtures";

afterEach(() => cleanup());

describe("results accessibility", () => {
  it("§3.4/§13: has no axe violations on the detail card and broker form", async () => {
    const result = await createFixtureEngine().calculate(DEFAULT_SCENARIO);
    const { container, rerender } = render(
      <LenderDetail
        lender={result.lenders[0]}
        leader={result.lenders[0]}
        scenario={DEFAULT_SCENARIO}
        sortBy="maxPrice"
        onBroker={vi.fn()}
        onUpdate={vi.fn()}
      />,
    );
    expect((await axe(container)).violations).toHaveLength(0);

    rerender(<BrokerOverlay lenders={result.lenders} selected={result.lenders[0]} submitted={false} onSubmitted={vi.fn()} onClose={vi.fn()} />);
    expect((await axe(container)).violations).toHaveLength(0);
  });
});
