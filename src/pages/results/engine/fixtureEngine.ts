// Spec: results-page-spec.md §5 (fixture calculation definitions)
import { DEFAULT_SCENARIO, LENDER_COLOURS, LENDER_FIXTURES, RATES_AS_AT } from "./fixtures";
import type { EngineMode, EngineResult, LenderResult, Scenario, ServiceabilityEngine } from "./types";

const TRANSFER_AND_LEGAL = 4200;

function stampDuty(price: number, scenario: Scenario) {
  // Spec §5.2, FILL-IN #6: placeholder NSW-like curve until engine rules land.
  const concession = scenario.firstHomeBuyer && price < 1000000 ? 0.45 : 1;
  const stateFactor = scenario.state === "NSW" ? 1 : scenario.state === "VIC" ? 1.04 : 0.96;
  return Math.round((price * 0.052 + 1300) * stateFactor * concession);
}

function lmiFor(maxLoan: number, price: number) {
  // Spec §7.6, FILL-IN #7: fixture-only LMI approximation for LVR > 80%.
  const lvr = maxLoan / price;
  return lvr > 0.8 ? Math.round(maxLoan * (lvr - 0.8) * 0.24) : 0;
}

function monthlyRepayment(principal: number, annualRate: number, scenario: Scenario) {
  if (scenario.loan.repay === "io") {
    return Math.round((principal * (annualRate / 100)) / 12);
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = scenario.loan.termYears * 12;
  const repayment = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
  return Math.round(repayment);
}

function adjustedLoan(baseLoan: number, scenario: Scenario) {
  let factor = 1;
  if (scenario.loan.purpose === "inv") factor -= 0.085;
  if (scenario.loan.repay === "io") factor -= 0.06;
  if (scenario.loan.termYears < 30) factor -= (30 - scenario.loan.termYears) * 0.008;
  if (scenario.loan.productType === "basic") factor += 0.018;
  if (scenario.loan.rateType === "fixed") factor -= scenario.loan.fixedYears * 0.006;
  return Math.max(240000, Math.round(baseLoan * factor));
}

function adjustedRate(rate: number, scenario: Scenario) {
  let value = rate;
  if (scenario.loan.purpose === "inv") value += 0.3;
  if (scenario.loan.repay === "io") value += 0.2;
  if (scenario.loan.productType === "basic") value -= 0.05;
  if (scenario.loan.rateType === "fixed") value -= 0.08;
  return Number(value.toFixed(2));
}

function solvePrice(maxLoan: number, lenderFees: number, scenario: Scenario) {
  // Spec §5.3: usableDeposit = savings - costs(price); maxPrice = maxLoan + usableDeposit.
  let price = maxLoan + scenario.savings;
  for (let i = 0; i < 12; i += 1) {
    const duty = stampDuty(price, scenario);
    const lmi = lmiFor(maxLoan, price);
    const cashCosts = duty + TRANSFER_AND_LEGAL + lenderFees + (scenario.capitaliseCosts ? 0 : lmi);
    price = Math.max(maxLoan * 1.02, maxLoan + scenario.savings - cashCosts);
  }
  return Math.round(price / 1000) * 1000;
}

export function createFixtureEngine(options: { delayMs?: number; mode?: EngineMode } = {}): ServiceabilityEngine {
  const delayMs = options.delayMs ?? 0;
  const mode = options.mode ?? "healthy";

  return {
    async calculate(scenario = DEFAULT_SCENARIO): Promise<EngineResult> {
      if (delayMs > 0) {
        await new Promise((resolve) => globalThis.setTimeout(resolve, delayMs));
      }

      if (mode === "fail") {
        throw new Error("Fixture engine failure");
      }

      if (mode === "empty") {
        return { lenders: [], asAt: RATES_AS_AT, constraint: "Your deposit is below the minimum lenders accept." };
      }

      const fixtures = mode === "partial" ? LENDER_FIXTURES.slice(0, 6) : LENDER_FIXTURES;
      const lenders: LenderResult[] = fixtures
        .map((lender, index) => {
          const maxLoan = adjustedLoan(lender.baseLoan, scenario);
          const rate = adjustedRate(lender.rate, scenario);
          const lenderFees = lender.fees;
          const maxPrice = solvePrice(maxLoan, lenderFees, scenario);
          const lmi = lmiFor(maxLoan, maxPrice);
          const stamp = stampDuty(maxPrice, scenario);
          const fundsRequired = maxPrice + stamp + TRANSFER_AND_LEGAL + lenderFees + (scenario.capitaliseCosts ? 0 : lmi);
          const totalAvailable = maxLoan + scenario.savings;
          const remainingCash = totalAvailable - fundsRequired;

          return {
            id: lender.id,
            name: lender.name,
            product: lender.product,
            maxLoan,
            rate,
            comparisonRate: lender.comparisonRate,
            monthlyRepayment: monthlyRepayment(maxLoan, rate, scenario),
            maxPrice,
            lvr: maxLoan / maxPrice,
            fees: { application: Math.round(lenderFees * 0.55), legal: 1500, other: Math.round(lenderFees * 0.45) - 1500 },
            lmi,
            eligible: mode !== "shortfall" || index < 5,
            colour: LENDER_COLOURS[index % LENDER_COLOURS.length],
            funds: {
              propertyPrice: maxPrice,
              stampDuty: stamp,
              transferLegal: TRANSFER_AND_LEGAL,
              lenderFees,
              lmi,
              fundsRequired,
              loanSource: maxLoan,
              savingsSource: scenario.savings,
              totalAvailable,
              remainingCash,
              cashToSettle: fundsRequired - maxLoan,
            },
          };
        })
        .filter((lender) => lender.eligible)
        .sort((a, b) => b.maxPrice - a.maxPrice);

      return {
        lenders,
        asAt: RATES_AS_AT,
        partialFailures: mode === "partial" ? LENDER_FIXTURES.length - fixtures.length : 0,
      };
    },
  };
}
