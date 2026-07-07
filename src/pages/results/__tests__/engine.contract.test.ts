import { describe, expect, it } from "vitest";
import { createFixtureEngine } from "../engine/fixtureEngine";
import { DEFAULT_SCENARIO } from "../engine/fixtures";

describe("fixture engine contract", () => {
  it("§2.3/§5.3: returns eligible lenders ranked by max property price", async () => {
    const result = await createFixtureEngine().calculate(DEFAULT_SCENARIO);

    expect(result.lenders).toHaveLength(8);
    expect(result.lenders.every((lender) => lender.eligible)).toBe(true);
    expect(result.lenders.map((lender) => lender.maxPrice)).toEqual(
      [...result.lenders.map((lender) => lender.maxPrice)].sort((a, b) => b - a),
    );
  });

  it("§5.3: satisfies usable-deposit invariant within rounding", async () => {
    const result = await createFixtureEngine().calculate(DEFAULT_SCENARIO);

    for (const lender of result.lenders) {
      const cashCosts = lender.funds.stampDuty + lender.funds.transferLegal + lender.funds.lenderFees + lender.funds.lmi;
      expect(Math.abs(lender.maxPrice - lender.maxLoan + cashCosts - DEFAULT_SCENARIO.savings)).toBeLessThanOrEqual(1500);
      expect(lender.lvr).toBeGreaterThan(0);
      expect(lender.lvr).toBeLessThan(1);
      expect(lender.funds.fundsRequired).toBeGreaterThan(0);
      expect(lender.funds.totalAvailable).toBeGreaterThan(0);
    }
  });

  it("§9.3/§9.4: supports partial and empty states", async () => {
    const partial = await createFixtureEngine({ mode: "partial" }).calculate(DEFAULT_SCENARIO);
    const empty = await createFixtureEngine({ mode: "empty" }).calculate(DEFAULT_SCENARIO);

    expect(partial.partialFailures).toBe(2);
    expect(partial.lenders).toHaveLength(6);
    expect(empty.lenders).toHaveLength(0);
    expect(empty.constraint).toContain("deposit");
  });
});
