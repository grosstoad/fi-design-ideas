// Spec: results-page-spec.md §4.3 (engine data contract)
export type AustralianState = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";

export type LoanPurpose = "oo" | "inv";
export type RepaymentType = "pi" | "io";
export type RateType = "variable" | "fixed";
export type ProductType = "package" | "basic";

export interface Scenario {
  savings: number;
  state: AustralianState;
  firstHomeBuyer: boolean;
  propertyPriceInMind?: number;
  capitaliseCosts: boolean;
  loan: {
    purpose: LoanPurpose;
    repay: RepaymentType;
    termYears: number;
    interestOnlyYears: number;
    productType: ProductType;
    rateType: RateType;
    fixedYears: number;
  };
}

export interface LenderFees {
  application: number;
  legal: number;
  other: number;
}

export interface FundsBreakdown {
  propertyPrice: number;
  stampDuty: number;
  transferLegal: number;
  lenderFees: number;
  lmi: number;
  fundsRequired: number;
  loanSource: number;
  savingsSource: number;
  totalAvailable: number;
  remainingCash: number;
  cashToSettle: number;
}

export interface LenderResult {
  id: string;
  name: string;
  product: string;
  maxLoan: number;
  rate: number;
  comparisonRate: number | null;
  monthlyRepayment: number;
  maxPrice: number;
  lvr: number;
  fees: LenderFees;
  lmi: number;
  eligible: boolean;
  colour: string;
  funds: FundsBreakdown;
}

export interface EngineResult {
  lenders: LenderResult[];
  asAt: string;
  partialFailures?: number;
  constraint?: string;
}

export interface ServiceabilityEngine {
  /**
   * Calculates lender results for the current scenario.
   * The real serviceability implementation must satisfy the same contract tests
   * as this fixture engine so UI components can be swapped without edits.
   */
  calculate(scenario: Scenario): Promise<EngineResult>;
}

export type EngineMode = "healthy" | "slow" | "fail" | "empty" | "partial" | "shortfall";
