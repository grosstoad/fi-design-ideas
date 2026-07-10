export const INCOME_MIN = 60000;
export const INCOME_MAX = 1000000;
export const INCOME_STEP = 5000;
export const INCOME_DEFAULT = 145000;

export function incomeStepFor(value) {
  if (value < 200000) return 5000;
  if (value < 500000) return 10000;
  return 25000;
}

export function snapIncome(value) {
  const bounded = Math.min(INCOME_MAX, Math.max(INCOME_MIN, value));
  if (bounded <= 200000) return Math.round(bounded / 5000) * 5000;
  if (bounded <= 500000) return 200000 + Math.round((bounded - 200000) / 10000) * 10000;
  return 500000 + Math.round((bounded - 500000) / 25000) * 25000;
}

// Illustrative marketing-demo curves. These are intentionally isolated from
// the results engine so the UI cannot accidentally present them as a credit
// assessment or a lender offer.
export const LENDERS = [
  { id: "macquarie", name: "Macquarie", color: "#4b5563", multiplier: 6.7, cap: 1750000, rate: 5.89, comparisonRate: 5.94 },
  { id: "cba", name: "CommBank", color: "#eab308", multiplier: 6.9, cap: 1150000, rate: 5.84, comparisonRate: 5.96 },
  { id: "nab", name: "NAB", color: "#7c2d12", multiplier: 6.3, cap: 1400000, rate: 5.92, comparisonRate: 6.02 },
  { id: "westpac", name: "Westpac", color: "#e11d48", multiplier: 6.0, cap: 1500000, rate: 5.99, comparisonRate: 6.12 },
  { id: "anz", name: "ANZ", color: "#2563eb", multiplier: 5.8, cap: 1300000, rate: 5.94, comparisonRate: 6.04 },
  { id: "ing", name: "ING", color: "#ea580c", multiplier: 6.5, cap: 1000000, rate: 5.87, comparisonRate: 5.98 },
  { id: "bankwest", name: "Bankwest", color: "#7e22ce", multiplier: 6.2, cap: 1200000, rate: 5.91, comparisonRate: 6.03 },
  { id: "suncorp", name: "Suncorp", color: "#15803d", multiplier: 5.9, cap: 1250000, rate: 5.95, comparisonRate: 6.07 },
  { id: "bendigo", name: "Bendigo Bank", color: "#a16207", multiplier: 5.7, cap: 1100000, rate: 5.97, comparisonRate: 6.09 },
  { id: "boq", name: "BOQ", color: "#1e3a8a", multiplier: 6.1, cap: 1050000, rate: 5.9, comparisonRate: 6.01 },
  { id: "amp", name: "AMP", color: "#0e7490", multiplier: 5.6, cap: 1350000, rate: 5.93, comparisonRate: 6.05 },
  { id: "hsbc", name: "HSBC", color: "#dc2626", multiplier: 6.4, cap: 950000, rate: 5.85, comparisonRate: 5.97 },
  { id: "ubank", name: "ubank", color: "#4f46e5", multiplier: 6.6, cap: 900000, rate: 5.88, comparisonRate: 5.99 },
  { id: "athena", name: "Athena", color: "#059669", multiplier: 5.5, cap: 1150000, rate: 5.86, comparisonRate: 5.96 },
];

export const DEMO_SAVINGS_CONTRIBUTION = 180000;

export function estimatePurchasePower(income, lender) {
  const raw = income * lender.multiplier;
  const softened = raw <= lender.cap ? raw : lender.cap + (raw - lender.cap) * 0.15;
  return Math.round(softened / 1000) * 1000;
}

export function monthlyRepayment(principal, annualRate, years = 30) {
  const monthlyRate = annualRate / 100 / 12;
  const payments = years * 12;
  if (!monthlyRate) return principal / payments;
  return (
    (principal * monthlyRate * (1 + monthlyRate) ** payments) /
    ((1 + monthlyRate) ** payments - 1)
  );
}

export function formatMonthlyRepayment(value) {
  return `$${Math.round(value).toLocaleString("en-AU")}/mth`;
}

export function resultsForIncome(income) {
  return LENDERS.map((lender) => {
    const maxPropertyPrice = estimatePurchasePower(income, lender);
    const maxLoan = Math.max(0, maxPropertyPrice - DEMO_SAVINGS_CONTRIBUTION);
    return {
      ...lender,
      maxPropertyPrice,
      maxLoan,
      monthlyRepayment: Math.round(monthlyRepayment(maxLoan, lender.rate)),
      lvr: maxPropertyPrice ? (maxLoan / maxPropertyPrice) * 100 : 0,
    };
  });
}

export function rankResults(results) {
  return [...results].sort((a, b) => b.maxPropertyPrice - a.maxPropertyPrice);
}

const maximumResult = Math.max(
  ...LENDERS.map((lender) => estimatePurchasePower(INCOME_MAX, lender))
);

export const BAR_DOMAIN_MAX = Math.ceil((maximumResult * 1.08) / 100000) * 100000;

export function barRatio(maxPropertyPrice) {
  return Math.min(1, Math.max(0, maxPropertyPrice / BAR_DOMAIN_MAX));
}

export const WORKED_EXAMPLE = {
  purpose: "owner-occupier",
  lender: "CBA",
  propertyPrice: 760000,
  stampDuty: 30000,
  legalAndOtherCosts: 5400,
  loan: 600000,
  savingsAvailable: 210000,
};

export function workedExampleSummary(example = WORKED_EXAMPLE) {
  const totalPropertyCosts =
    example.propertyPrice + example.stampDuty + example.legalAndOtherCosts;
  const savingsUsed = totalPropertyCosts - example.loan;
  const savingsRemaining = example.savingsAvailable - savingsUsed;
  const lvr = (example.loan / example.propertyPrice) * 100;
  const savingsShare = (savingsUsed / example.propertyPrice) * 100;
  return { totalPropertyCosts, savingsUsed, savingsRemaining, lvr, savingsShare };
}
