import { describe, expect, it } from "vitest";
import {
  BAR_DOMAIN_MAX,
  DEFAULT_SCENARIO,
  INCOME_MAX,
  INCOME_MIN,
  INCOME_STEP,
  LENDERS,
  barRatio,
  estimatePurchasePower,
  formatMonthlyRepayment,
  incomeStepFor,
  resultsForIncome,
  scenarioFundingSummary,
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

  it("reconciles the shared default scenario and responds to scenario changes", () => {
    const summary = scenarioFundingSummary();
    expect(summary.totalPropertyCosts).toBe(
      summary.propertyPrice + summary.stampDuty + summary.legalAndOtherCosts
    );
    expect(summary.totalPropertyCosts).toBe(summary.loan + summary.savingsUsed);
    expect(summary.savingsRemaining).toBe(DEFAULT_SCENARIO.savings - summary.savingsUsed);
    expect(summary.savingsRemaining).toBe(14600);
    expect(summary.lender.name).toBe("CommBank");

    const investor = scenarioFundingSummary({
      ...DEFAULT_SCENARIO,
      income: 300000,
      savings: 250000,
      purpose: "investor",
      location: "VIC",
    });
    expect(investor.propertyPrice).toBeGreaterThan(summary.propertyPrice);
    expect(investor.stampDuty).toBeGreaterThan(summary.stampDuty);
    expect(investor.totalPropertyCosts).toBe(investor.loan + investor.savingsUsed);
  });

  it("keeps every supported scenario finite, non-negative and reconciled", () => {
    for (const income of [INCOME_MIN, INCOME_MAX]) {
      for (const savings of [50000, 1000000]) {
        for (const purpose of ["owner-occupier", "investor"]) {
          for (const location of ["NSW", "VIC", "QLD", "SA", "WA"]) {
            const summary = scenarioFundingSummary({ income, savings, purpose, location });
            expect(Object.values(summary).filter((value) => typeof value === "number").every(Number.isFinite)).toBe(true);
            expect(summary.propertyPrice).toBeGreaterThan(0);
            expect(summary.loan).toBeGreaterThanOrEqual(0);
            expect(summary.savingsUsed).toBeGreaterThanOrEqual(0);
            expect(summary.savingsRemaining).toBeGreaterThanOrEqual(0);
            expect(summary.totalPropertyCosts).toBe(summary.loan + summary.savingsUsed);
            expect(summary.savingsRemaining).toBe(savings - summary.savingsUsed);
          }
        }
      }
    }
  });
});
