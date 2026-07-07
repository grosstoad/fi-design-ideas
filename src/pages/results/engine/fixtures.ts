// Spec: results-page-spec.md §4.3, §5.6 (fixture lender data)
import type { Scenario } from "./types";

export const DEFAULT_SCENARIO: Scenario = {
  savings: 620000,
  state: "NSW",
  firstHomeBuyer: false,
  capitaliseCosts: false,
  loan: {
    purpose: "oo",
    repay: "pi",
    termYears: 30,
    interestOnlyYears: 3,
    productType: "package",
    rateType: "variable",
    fixedYears: 2,
  },
};

export const RATES_AS_AT = "7 July 2026";

export const LENDER_COLOURS = [
  "#6E9BC4",
  "#D9C34A",
  "#D98E7A",
  "#C2462C",
  "#5E8FB5",
  "#E59A3B",
  "#7FA37A",
  "#C98AB0",
] as const;

export const LENDER_FIXTURES = [
  { id: "macquarie", name: "Macquarie", product: "Basic Home Loan", baseLoan: 2680000, rate: 6.09, comparisonRate: 6.21, fees: 2850 },
  { id: "cba", name: "CBA", product: "Extra Home Loan", baseLoan: 2520000, rate: 6.18, comparisonRate: 6.42, fees: 3200 },
  { id: "nab", name: "NAB", product: "Tailored Home Loan", baseLoan: 2390000, rate: 6.24, comparisonRate: 6.37, fees: 3000 },
  { id: "westpac", name: "Westpac", product: "Flexi First Option", baseLoan: 2260000, rate: 6.31, comparisonRate: 6.48, fees: 3350 },
  { id: "anz", name: "ANZ", product: "Simplicity Plus", baseLoan: 2110000, rate: 6.36, comparisonRate: 6.51, fees: 2950 },
  { id: "ing", name: "ING", product: "Mortgage Simplifier", baseLoan: 1960000, rate: 6.41, comparisonRate: 6.57, fees: 2600 },
  { id: "bankwest", name: "Bankwest", product: "Complete Home Loan", baseLoan: 1840000, rate: 6.46, comparisonRate: 6.62, fees: 3100 },
  { id: "stgeorge", name: "St.George", product: "Advantage Package", baseLoan: 1710000, rate: 6.52, comparisonRate: 6.69, fees: 3400 },
] as const;
