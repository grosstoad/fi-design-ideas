// Spec: results-page-spec.md §7.6 (C4 lender detail)
import type { LenderResult, Scenario } from "../engine/types";
import type { SortKey } from "../hooks/useResults";
import { copy } from "../lib/copy";
import { fmtLvr, fmtMoney, fmtPct, fmtPrice } from "../lib/format";
import { sortLabel } from "./SortControl";
import { FundsToComplete } from "./FundsToComplete";
import { CtaRow } from "./CtaRow";

interface LenderDetailProps {
  lender: LenderResult;
  leader: LenderResult;
  scenario: Scenario;
  sortBy: SortKey;
  submitted?: boolean;
  onBroker: () => void;
  onUpdate: () => void;
  onUpdateLoan?: () => void;
}

function MetricsRow({ lender }: { lender: LenderResult }) {
  const comparison = lender.comparisonRate == null ? "—" : fmtPct(lender.comparisonRate, " p.a.");
  return (
    <div className="rp-rate-pair" data-testid="rate-pair">
      <div>
        <span>{copy.card.rows.rate}</span>
        <strong className="rp-rate-value">{fmtPct(lender.rate, " p.a.")}</strong>
      </div>
      <div>
        <span>{copy.card.rows.comparisonRate}</span>
        <strong className="rp-rate-value">{comparison}</strong>
      </div>
      <div>
        <span>{copy.card.rows.repayment}</span>
        <strong>{fmtMoney(lender.monthlyRepayment)}</strong>
      </div>
    </div>
  );
}

function CompareFooter({ lender, leader, sortBy }: { lender: LenderResult; leader: LenderResult; sortBy: SortKey }) {
  if (lender.id === leader.id) return null;
  const rows = [leader, lender];
  return (
    <section className="rp-compare" aria-label={copy.card.compareAria}>
      {rows.map((item) => (
        <div className={`rp-compare-row${item.id === lender.id ? " is-selected" : ""}`} key={item.id}>
          <span>{item.name}</span>
          <i aria-hidden="true">
            <b style={{ width: `${Math.min(100, (item.maxPrice / (leader.maxPrice * 1.08)) * 100)}%`, backgroundColor: item.colour }} />
          </i>
          <strong>{fmtPrice(item.maxPrice)}</strong>
        </div>
      ))}
      <p>{copy.compare.caption(sortLabel(sortBy), leader.name)}</p>
    </section>
  );
}

export function LenderDetail({ lender, leader, scenario, sortBy, submitted = false, onBroker, onUpdate, onUpdateLoan = onUpdate }: LenderDetailProps) {
  const purposeLabel = scenario.loan.purpose === "inv" ? "Investment" : "Owner occupied";
  const repayLabel = scenario.loan.repay === "io" ? `Interest only ${scenario.loan.interestOnlyYears} years` : "P&I";
  const rateLabel = scenario.loan.rateType === "fixed" ? `Fixed ${scenario.loan.fixedYears} years` : "Variable";
  const loanFields = [
    [copy.card.loanFields.purpose, purposeLabel],
    [copy.card.loanFields.repayment, repayLabel],
    [copy.card.loanFields.rateType, rateLabel],
    [copy.card.loanFields.term, `${scenario.loan.termYears} years`],
    [copy.card.loanFields.lvr, fmtLvr(lender.lvr)],
  ];

  return (
    <aside className="rp-detail-card" aria-labelledby="rp-detail-title">
      <div className="rp-identity-band">
        <div>
          <h2 id="rp-detail-title">{lender.name}</h2>
        </div>
      </div>

      <div className="rp-capacity-pair" data-testid="capacity-pair">
        <div>
          <span>{copy.pair.price}</span>
          <strong>{fmtPrice(lender.maxPrice)}</strong>
        </div>
        <div>
          <span>{copy.pair.loan}</span>
          <strong>{fmtPrice(lender.maxLoan)}</strong>
        </div>
      </div>

      <MetricsRow lender={lender} />

      <section className="rp-loan-setup" aria-label={copy.card.loanDetailsAria}>
        <strong className="rp-product-name">{lender.product}</strong>
        <dl className="rp-loan-fields">
          {loanFields.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <button type="button" className="rp-link-button" onClick={onUpdateLoan}>
          {copy.card.updateLoanDetails}
        </button>
      </section>

      <FundsToComplete lender={lender} scenario={scenario} onUpdate={onUpdate} />
      <CompareFooter lender={lender} leader={leader} sortBy={sortBy} />
      <CtaRow submitted={submitted} onBroker={onBroker} onUpdate={onUpdate} />
    </aside>
  );
}
