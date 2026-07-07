import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BrokerOverlay } from "../components/BrokerOverlay";
import { createFixtureEngine } from "../engine/fixtureEngine";
import { DEFAULT_SCENARIO } from "../engine/fixtures";
import { copy } from "../lib/copy";

afterEach(() => cleanup());

async function setup() {
  const result = await createFixtureEngine().calculate(DEFAULT_SCENARIO);
  const onSubmitted = vi.fn();
  render(<BrokerOverlay lenders={result.lenders} selected={result.lenders[1]} submitted={false} onSubmitted={onSubmitted} onClose={vi.fn()} />);
  return { result, onSubmitted };
}

describe("BrokerOverlay", () => {
  it("§13: validates required fields and submits to success state", async () => {
    const user = userEvent.setup();
    const { onSubmitted } = await setup();

    await user.click(screen.getByRole("button", { name: copy.broker.submit }));
    expect(screen.getByText(copy.broker.errors.first)).toBeTruthy();

    await user.type(screen.getByLabelText(copy.broker.first), "Sarah");
    await user.type(screen.getByLabelText(copy.broker.last), "Ng");
    await user.type(screen.getByLabelText(copy.broker.mobile), "0400 123 456");
    await user.type(screen.getByLabelText(copy.broker.email), "sarah@example.com");
    await user.click(screen.getByRole("button", { name: copy.broker.stages[1] }));
    await user.click(screen.getByLabelText(copy.broker.consent));
    await user.click(screen.getByRole("button", { name: copy.broker.submit }));

    await waitFor(() => expect(onSubmitted).toHaveBeenCalledTimes(1));
    expect(screen.getByText(copy.broker.successTitle("Sarah"))).toBeTruthy();
  });
});
