import { useState } from "react";
import { Link } from "react-router-dom";

const lenders = [
  { name: "Macquarie", value: "$3.10M", color: "#57A8A1", details: "Weekly repayment (P&I) $12,340" },
  { name: "CBA", value: "$2.92M", color: "#E5C826", details: "Solid ceiling, still sensitive to card limits" },
  { name: "NAB", value: "$2.78M", color: "#111111", details: "Lower after buffer and expense treatment" },
  { name: "Westpac", value: "$2.64M", color: "#E33A32", details: "More conservative on this scenario" },
  { name: "ANZ", value: "$2.48M", color: "#3D8BC3", details: "Lower maximum estimate" },
  { name: "ING", value: "$2.32M", color: "#F06F23", details: "Lowest visible estimate here" },
];

const lenderWidths = ["100%", "86%", "72%", "62%", "50%", "42%"];

function AssessmentPage() {
  const [selectedLender, setSelectedLender] = useState("Macquarie");
  const [mode, setMode] = useState("loaded");

  const selected = lenders.find((lender) => lender.name === selectedLender) ?? lenders[0];
  const isEditing = mode === "editing";
  const isCalculating = mode === "calculating";

  function recalculate() {
    setMode("calculating");
    window.setTimeout(() => setMode("loaded"), 850);
  }

  return (
    <div className="fundora-results-page">
      <main className="fundora-results-phone" aria-label="Fundora borrowing results">
        <div className="fr-status">
          <span>9:41</span>
          <span>5G</span>
        </div>

        <nav className="fr-nav" aria-label="Assessment navigation">
          <Link to="/" className="fr-brand">
            FUNDORA
          </Link>
          <button type="button" className="fr-menu">
            Menu <span />
          </button>
        </nav>

        <div className="fr-progress" aria-label="Assessment progress">
          <div>
            <span>Assessment</span>
            <span>{isCalculating ? "Calculating..." : "8 of 9"}</span>
          </div>
          <i style={{ "--progress": isCalculating ? "64%" : "86%" }} />
        </div>

        <section className="fr-content">
          <p className="fr-step">Results</p>
          <h1>Your buying range</h1>

          {isCalculating ? (
            <div className="fr-calculating">
              <i />
              <strong>Recalculating your range...</strong>
            </div>
          ) : (
            <strong className="fr-hero-number">Up to $3.10M</strong>
          )}

          <p className="fr-result-copy">
            Macquarie gives the highest estimate. The comfortable number may be lower.
          </p>

          {isEditing ? (
            <AssumptionsEditor />
          ) : (
            <>
              <ScenarioChips disabled={isCalculating} />
              <LenderResults
                selectedLender={selectedLender}
                onSelect={setSelectedLender}
                showDetails={!isCalculating}
              />
              {!isCalculating && selectedLender === "Macquarie" && (
                <SelectedLenderDetails lender={selected} />
              )}
              {isCalculating && <RecalculatingRows />}
            </>
          )}
        </section>

        <div className="fr-bottom-actions">
          {isEditing ? (
            <>
              <button type="button" className="fr-primary" onClick={recalculate}>
                Update results
              </button>
              <button type="button" className="fr-secondary" onClick={() => setMode("loaded")}>
                Cancel
              </button>
            </>
          ) : isCalculating ? (
            <>
              <button type="button" className="fr-primary fr-disabled" disabled>
                Calculating...
              </button>
              <button type="button" className="fr-secondary" onClick={() => setMode("loaded")}>
                Back
              </button>
            </>
          ) : (
            <>
              <button type="button" className="fr-primary">
                Continue
              </button>
              <button type="button" className="fr-secondary" onClick={() => setMode("editing")}>
                Adjust assumptions
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function ScenarioChips({ disabled = false }) {
  return (
    <div className={`fr-scenario-chips ${disabled ? "is-disabled" : ""}`}>
      <span>NSW</span>
      <span>Owner occupied</span>
      <span>Savings $3.56M</span>
    </div>
  );
}

function LenderResults({ selectedLender, onSelect, showDetails }) {
  return (
    <section className="fr-lender-section">
      <h2>Max purchase price by lender</h2>
      <div className="fr-lender-list">
        {lenders.map((lender, index) => {
          const selected = lender.name === selectedLender;

          return (
            <button
              type="button"
              key={lender.name}
              className="fr-lender-row"
              aria-pressed={selected}
              onClick={() => onSelect(lender.name)}
            >
              <span>{lender.name}</span>
              <i style={{ width: lenderWidths[index], backgroundColor: lender.color }} />
              <strong>{lender.value}</strong>
              <b>{selected && showDetails ? "^" : ">"}</b>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SelectedLenderDetails({ lender }) {
  return (
    <section className="fr-lender-detail" aria-label={`${lender.name} lender detail`}>
      <div>
        <span>{lender.details}</span>
        <strong>$12,340</strong>
      </div>
      <div>
        <span>Interest rate</span>
        <strong>6.34% p.a.</strong>
      </div>
      <div>
        <span>Loan amount</span>
        <strong>$2.79M</strong>
      </div>
      <div>
        <span>LVR</span>
        <strong>78%</strong>
      </div>
    </section>
  );
}

function AssumptionsEditor() {
  return (
    <section className="fr-assumptions" aria-label="Edit result assumptions">
      <label>
        <span>State</span>
        <div className="fr-pill-group">
          <button type="button" aria-pressed="true">
            NSW
          </button>
          <button type="button">VIC</button>
          <button type="button">QLD</button>
          <button type="button">WA</button>
        </div>
      </label>

      <label>
        <span>Purpose</span>
        <div className="fr-pill-group two">
          <button type="button" aria-pressed="true">
            Owner occupied
          </button>
          <button type="button">Investment</button>
        </div>
      </label>

      <label>
        <span>Savings</span>
        <div className="fr-input">
          $3,560,000 <button type="button" aria-label="Clear savings">x</button>
        </div>
      </label>

      <button type="button" className="fr-more-assumptions">
        Show more assumptions v
      </button>

      <span className="fr-edit-hint">Changing assumptions updates the lender range shown above.</span>
    </section>
  );
}

function RecalculatingRows() {
  return (
    <section className="fr-recalc-list" aria-label="Loading lender results">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index}>
          <span />
          <i />
          <b />
        </div>
      ))}
    </section>
  );
}

export default AssessmentPage;
