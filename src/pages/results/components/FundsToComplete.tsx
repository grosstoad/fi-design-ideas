// Spec: results-page-spec.md §8 (C5 funds to complete)
import { useState } from "react";
import type { LenderResult, Scenario } from "../engine/types";
import { copy } from "../lib/copy";
import { fmtMoney, fmtMoneyShort } from "../lib/format";

interface FundsToCompleteProps {
  lender: LenderResult;
  scenario: Scenario;
  onUpdate: () => void;
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`rp-funds-row${strong ? " is-strong" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function FundsToComplete({ lender, scenario, onUpdate }: FundsToCompleteProps) {
  const [expanded, setExpanded] = useState(false);
  const funds = lender.funds;
  const shortfall = funds.remainingCash < 0;
  const remainingLabel = shortfall ? "Shortfall" : copy.funds.remaining;

  return (
    <section className="rp-funds">
      <div className="rp-funds-summary">
        <div>
          <h3>{copy.funds.title}</h3>
          <p>{copy.funds.note(fmtMoneyShort(funds.cashToSettle))}</p>
        </div>
        <button type="button" className="rp-link-button rp-funds-toggle" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
          {expanded ? copy.funds.hide : copy.funds.view}
        </button>
      </div>

      {expanded ? (
        <div className="rp-funds-breakdown">
          <div className="rp-funds-group">
            <h4>{copy.funds.needed}</h4>
            <Row label={copy.funds.propertyPrice} value={fmtMoney(funds.propertyPrice)} />
            <Row label={copy.funds.stampDuty(scenario.state)} value={fmtMoney(funds.stampDuty)} />
            <Row label={copy.funds.transferLegal} value={fmtMoney(funds.transferLegal)} />
            <Row label={copy.funds.lenderFees(lender.name)} value={fmtMoney(funds.lenderFees)} />
            {funds.lmi > 0 ? <Row label={copy.funds.lmi} value={fmtMoney(funds.lmi)} /> : null}
            <Row label={copy.funds.required} value={fmtMoney(funds.fundsRequired)} strong />
          </div>
          <div className="rp-funds-group">
            <h4>{copy.funds.sources}</h4>
            <Row label={copy.funds.loanFrom(lender.name)} value={fmtMoney(funds.loanSource)} />
            <Row label={copy.funds.savings} value={fmtMoney(funds.savingsSource)} />
            <Row label={copy.funds.totalAvailable} value={fmtMoney(funds.totalAvailable)} strong />
          </div>
          <div className={`rp-verdict${shortfall ? " is-shortfall" : ""}`}>
            <div>
              <span>{copy.funds.required}</span>
              <strong>{fmtMoney(funds.fundsRequired)}</strong>
            </div>
            <div>
              <span>{copy.funds.available}</span>
              <strong>{fmtMoney(funds.totalAvailable)}</strong>
            </div>
            <div>
              <span>{remainingLabel}</span>
              <strong>{fmtMoney(funds.remainingCash)}</strong>
              {!shortfall ? <em>{copy.funds.leftOver}</em> : null}
            </div>
          </div>
          {shortfall ? (
            <div className="rp-shortfall">
              {copy.funds.shortfall}{" "}
              <button type="button" className="rp-link-button" onClick={onUpdate}>
                {copy.cta.secondary}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
