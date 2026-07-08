// Spec: results-page-spec.md §7.7 (Update details loop)
import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import type { Scenario } from "../engine/types";
import { copy } from "../lib/copy";
import { fmtMoneyShort } from "../lib/format";

export type UpdateDetailsStep = "chooser" | "property" | "loan" | "financial";

interface UpdateDetailsOverlayProps {
  scenario: Scenario;
  initialStep?: UpdateDetailsStep;
  onClose: () => void;
  onSave: (scenario: Scenario) => Promise<void>;
}

const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;

function FieldRow({ label, children, conditional = false }: { label: string; children: ReactNode; conditional?: boolean }) {
  return (
    <label className={`rp-edit-row${conditional ? " is-conditional" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export function UpdateDetailsOverlay({ scenario, initialStep = "chooser", onClose, onSave }: UpdateDetailsOverlayProps) {
  const [step, setStep] = useState<UpdateDetailsStep>(initialStep);
  const [draft, setDraft] = useState<Scenario>(scenario);
  const [saving, setSaving] = useState(false);
  const [deadend, setDeadend] = useState("");
  const titleId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function save() {
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    onClose();
  }

  const chooser = (
    <>
      <h2 id={titleId}>{copy.update.title}</h2>
      <p>{copy.update.sub}</p>
      <div className="rp-update-choices">
        <button type="button" onClick={() => setStep("property")}>
          <span aria-hidden="true">⌂</span>
          <b>{copy.update.rows.property[0]}</b>
          <em>{copy.update.rows.property[1]}</em>
          <i aria-hidden="true">›</i>
        </button>
        <button type="button" onClick={() => setStep("loan")}>
          <span aria-hidden="true">□</span>
          <b>{copy.update.rows.loan[0]}</b>
          <em>{copy.update.rows.loan[1]}</em>
          <i aria-hidden="true">›</i>
        </button>
        <button type="button" onClick={() => setStep("financial")}>
          <span aria-hidden="true">▣</span>
          <b>{copy.update.rows.financial[0]}</b>
          <em>{copy.update.rows.financial[1]}</em>
          <i aria-hidden="true">›</i>
        </button>
      </div>
    </>
  );

  const property = (
    <>
      <div className="rp-eyebrow">{copy.update.property.eyebrow}</div>
      <h2 id={titleId}>{copy.update.property.title}</h2>
      <p>{copy.update.property.sub}</p>
      <div className="rp-edit-card">
        <FieldRow label="State">
          <select value={draft.state} onChange={(event) => setDraft({ ...draft, state: event.target.value as Scenario["state"] })}>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </FieldRow>
        <FieldRow label="Purpose">
          <select
            value={draft.loan.purpose}
            onChange={(event) => setDraft({ ...draft, loan: { ...draft.loan, purpose: event.target.value as Scenario["loan"]["purpose"] } })}
          >
            <option value="oo">Owner occupied</option>
            <option value="inv">Investment</option>
          </select>
        </FieldRow>
        <FieldRow label="First home buyer">
          <input type="checkbox" checked={draft.firstHomeBuyer} onChange={(event) => setDraft({ ...draft, firstHomeBuyer: event.target.checked })} />
        </FieldRow>
        <FieldRow label="Savings">
          <input
            type="number"
            min="0"
            step="1000"
            value={draft.savings}
            onChange={(event) => setDraft({ ...draft, savings: Number(event.target.value) })}
            aria-label="Savings"
          />
        </FieldRow>
        <FieldRow label="Property price in mind">
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="Optional"
            value={draft.propertyPriceInMind ?? ""}
            onChange={(event) => setDraft({ ...draft, propertyPriceInMind: event.target.value ? Number(event.target.value) : undefined })}
            aria-label="Property price in mind"
          />
        </FieldRow>
        <FieldRow label="Capitalise purchase costs">
          <input type="checkbox" checked={draft.capitaliseCosts} onChange={(event) => setDraft({ ...draft, capitaliseCosts: event.target.checked })} />
        </FieldRow>
      </div>
      <div className="rp-edit-preview">{fmtMoneyShort(draft.savings)} savings in this prototype scenario</div>
    </>
  );

  const loan = (
    <>
      <div className="rp-eyebrow">{copy.update.loan.eyebrow}</div>
      <h2 id={titleId}>{copy.update.loan.title}</h2>
      <p>{copy.update.loan.sub}</p>
      <div className="rp-edit-card">
        <FieldRow label="Loan term">
          <select value={draft.loan.termYears} onChange={(event) => setDraft({ ...draft, loan: { ...draft.loan, termYears: Number(event.target.value) } })}>
            {Array.from({ length: 21 }, (_, index) => 10 + index).map((year) => (
              <option key={year} value={year}>
                {year} years
              </option>
            ))}
          </select>
        </FieldRow>
        <FieldRow label="Repayment type">
          <select value={draft.loan.repay} onChange={(event) => setDraft({ ...draft, loan: { ...draft.loan, repay: event.target.value as Scenario["loan"]["repay"] } })}>
            <option value="pi">P&I</option>
            <option value="io">Interest only</option>
          </select>
        </FieldRow>
        {draft.loan.repay === "io" ? (
          <FieldRow label="Interest-only term" conditional>
            <select
              value={draft.loan.interestOnlyYears}
              onChange={(event) => setDraft({ ...draft, loan: { ...draft.loan, interestOnlyYears: Number(event.target.value) } })}
            >
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year} years
                </option>
              ))}
            </select>
          </FieldRow>
        ) : null}
        <FieldRow label="Product type">
          <select
            value={draft.loan.productType}
            onChange={(event) => setDraft({ ...draft, loan: { ...draft.loan, productType: event.target.value as Scenario["loan"]["productType"] } })}
          >
            <option value="package">Package</option>
            <option value="basic">Basic</option>
          </select>
        </FieldRow>
        <FieldRow label="Rate type">
          <select
            value={draft.loan.rateType}
            onChange={(event) => setDraft({ ...draft, loan: { ...draft.loan, rateType: event.target.value as Scenario["loan"]["rateType"] } })}
          >
            <option value="variable">Variable</option>
            <option value="fixed">Fixed</option>
          </select>
        </FieldRow>
        {draft.loan.rateType === "fixed" ? (
          <FieldRow label="Fixed-rate term" conditional>
            <select value={draft.loan.fixedYears} onChange={(event) => setDraft({ ...draft, loan: { ...draft.loan, fixedYears: Number(event.target.value) } })}>
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year} years
                </option>
              ))}
            </select>
          </FieldRow>
        ) : null}
      </div>
    </>
  );

  const financial = (
    <>
      <div className="rp-eyebrow">{copy.update.financial.eyebrow}</div>
      <h2 id={titleId}>{copy.update.financial.title}</h2>
      <p>{copy.update.financial.sub}</p>
      <div className="rp-update-choices">
        {["Income", "Expenses", "Liabilities", "Existing properties"].map((label) => (
          <button key={label} type="button" onClick={() => setDeadend(copy.update.financial.deadend)}>
            <b>{label}</b>
            <em>{copy.update.financial.sub}</em>
            <i aria-hidden="true">›</i>
          </button>
        ))}
      </div>
      <div className="rp-financial-note">{deadend || copy.update.financial.note}</div>
    </>
  );

  return (
    <div className="rp-update-overlay" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="rp-update-scrim" aria-label={copy.update.cancel} onClick={onClose} />
      <div className="rp-update-panel">
        <div className="rp-sheet-handle" aria-hidden="true" />
        <button type="button" className="rp-close-button" aria-label={copy.update.cancel} onClick={onClose}>
          ×
        </button>
        {step === "chooser" ? chooser : step === "property" ? property : step === "loan" ? loan : financial}
        {step === "property" || step === "loan" ? (
          <div className="rp-update-footer">
            <button type="button" className="rp-primary-cta" disabled={saving} onClick={save}>
              {saving ? copy.update.saving : copy.update.save}
            </button>
            <button type="button" className="rp-secondary-cta" onClick={onClose}>
              {copy.update.cancel}
            </button>
          </div>
        ) : step === "financial" ? (
          <div className="rp-update-footer">
            <button type="button" className="rp-primary-cta" onClick={onClose}>
              {copy.update.back}
            </button>
            <button type="button" className="rp-secondary-cta" onClick={onClose}>
              {copy.update.cancel}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
