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
}

function RatePair({ lender }: { lender: LenderResult }) {
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
    </div>
  );
}

function StatementRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rp-statement-row">
      <span>{label}</span>
      <strong>{value}</strong>
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

export function LenderDetail({ lender, leader, scenario, sortBy, submitted = false, onBroker, onUpdate }: LenderDetailProps) {
  const repaymentSuffix = scenario.loan.repay === "io" ? " (interest only)" : "";
  const repayLabel = scenario.loan.repay === "io" ? "Interest only" : "P&I";
  const rateLabel = scenario.loan.rateType === "fixed" ? "Fixed" : "Variable";

  return (
    <aside className="rp-detail-card" aria-labelledby="rp-detail-title">
      <div className="rp-identity-band">
        <div>
          <h2 id="rp-detail-title">{`${lender.name} ${lender.product}`}</h2>
          <p>{`${lender.name} · ${repayLabel} · ${rateLabel}`}</p>
        </div>
        <div className="rp-corner-tag">
          <span>{copy.card.maxPriceTag}</span>
          <strong>{fmtPrice(lender.maxPrice)}</strong>
        </div>
      </div>

      <RatePair lender={lender} />

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

      <div className="rp-statement">
        <StatementRow label={copy.card.rows.repayment} value={`${fmtMoney(lender.monthlyRepayment)}${repaymentSuffix}`} />
        <StatementRow label={copy.card.rows.lvr} value={lender.lmi > 0 ? `${fmtLvr(lender.lvr)} · incl. LMI ${fmtMoney(lender.lmi)}` : fmtLvr(lender.lvr)} />
      </div>

      <FundsToComplete lender={lender} scenario={scenario} onUpdate={onUpdate} />
      <CompareFooter lender={lender} leader={leader} sortBy={sortBy} />
      <CtaRow submitted={submitted} onBroker={onBroker} onUpdate={onUpdate} />
    </aside>
  );
}
