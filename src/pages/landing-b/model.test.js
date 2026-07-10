import { describe, expect, it } from "vitest";
import {
  BAR_DOMAIN_MAX,
  INCOME_MAX,
  INCOME_MIN,
  INCOME_STEP,
  LENDERS,
  barRatio,
  estimatePurchasePower,
  formatMonthlyRepayment,
  incomeStepFor,
  resultsForIncome,
  snapIncome,
  workedExampleSummary,
} from "./model";

describe("Landing B illustrative comparison model", () => {
  it("contains the complete fourteen-lender set including Athena", () => {
    expect(LENDERS).toHaveLength(14);
    expect(new Set(LENDERS.map((lender) => lender.id)).size).toBe(14);
    expect(LENDERS.some((lender) => lender.id === "athena")).toBe(true);
  });

  it("uses one fixed chart domain that contains every supported result", () => {
    for (let income = INCOME_MIN; income <= INCOME_MAX; income += INCOME_STEP) {
      for (const result of resultsForIncome(income)) {
        expect(result.maxPropertyPrice).toBeLessThanOrEqual(BAR_DOMAIN_MAX);
        expect(barRatio(result.maxPropertyPrice)).toBeGreaterThanOrEqual(0);
        expect(barRatio(result.maxPropertyPrice)).toBeLessThanOrEqual(1);
      }
    }
  });

  it("uses progressively larger income increments without losing the endpoints", () => {
    expect(incomeStepFor(145000)).toBe(5000);
    expect(incomeStepFor(300000)).toBe(10000);
    expect(incomeStepFor(750000)).toBe(25000);
    expect(snapIncome(147000)).toBe(145000);
    expect(snapIncome(306000)).toBe(310000);
    expect(snapIncome(742000)).toBe(750000);
    expect(snapIncome(INCOME_MIN)).toBe(INCOME_MIN);
    expect(snapIncome(INCOME_MAX)).toBe(INCOME_MAX);
  });

  it("never renders a shorter bar when a lender result rises", () => {
    for (const lender of LENDERS) {
      let previousAmount = -Infinity;
      let previousRatio = -Infinity;
      for (let income = INCOME_MIN; income <= INCOME_MAX; income += INCOME_STEP) {
        const amount = estimatePurchasePower(income, lender);
        const ratio = barRatio(amount);
        expect(amount).toBeGreaterThanOrEqual(previousAmount);
        expect(ratio).toBeGreaterThanOrEqual(previousRatio);
        previousAmount = amount;
        previousRatio = ratio;
      }
    }
  });

  it("maps the same amount to the same bar ratio", () => {
    expect(barRatio(1000000)).toBeCloseTo(1000000 / BAR_DOMAIN_MAX, 8);
    expect(barRatio(500000)).toBeCloseTo(barRatio(1000000) / 2, 8);
  });

  it("formats monthly repayments with the approved suffix", () => {
    expect(formatMonthlyRepayment(11323.4)).toBe("$11,323/mth");
  });

  it("reconciles the worked example costs and funding sources", () => {
    expect(workedExampleSummary()).toEqual({
      totalPropertyCosts: 795400,
      savingsUsed: 195400,
      savingsRemaining: 14600,
      lvr: expect.closeTo(78.947368, 5),
      savingsShare: expect.closeTo(25.710526, 5),
    });
  });
});
