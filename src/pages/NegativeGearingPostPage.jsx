import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  { id: "short-version", label: "Intro" },
  { id: "what-changes", label: "What changes" },
  { id: "borrowing-power", label: "Borrowing power" },
  { id: "borrower-scenarios", label: "Model" },
  { id: "scenario-map", label: "Scenarios" },
  { id: "fine-print", label: "Fine print" },
];

const lenderModels = [
  {
    id: "panel",
    label: "Panel range",
    note: "Across the sample lender panel",
    rows: [
      { scenario: "Owner occupier", note: "Buying a home to live in", today: [704000, 854000], future: [704000, 854000], status: "No change" },
      { scenario: "Investment before Budget night", note: "Purchased before the announcement", today: [1009000, 1224000], future: [1009000, 1224000], status: "Grandfathered" },
      { scenario: "New-build investment", note: "Investment purpose, going forward", today: [1009000, 1224000], future: [1009000, 1224000], status: "Still eligible" },
      { scenario: "Established investment", note: "Investment purpose, going forward", today: [1009000, 1224000], future: [856000, 1038000], status: "Lower range" },
    ],
  },
  {
    id: "athena",
    label: "Athena",
    note: "Anchored to the FundIQ serviceability research note",
    rows: [
      { scenario: "Owner occupier", note: "Buying a home to live in", today: 853955, future: 853955, status: "No change" },
      { scenario: "Investment before Budget night", note: "Purchased before the announcement", today: 1224092, future: 1224092, status: "Grandfathered" },
      { scenario: "New-build investment", note: "Investment purpose, going forward", today: 1224092, future: 1224092, status: "Still eligible" },
      { scenario: "Established investment", note: "Investment purpose, going forward", today: 1224092, future: 1038229, status: "-$185,863" },
    ],
  },
  {
    id: "macquarie",
    label: "Macquarie",
    note: "Scaled from the current FundIQ lender panel example",
    rows: [
      { scenario: "Owner occupier", note: "Buying a home to live in", today: 819000, future: 819000, status: "No change" },
      { scenario: "Investment before Budget night", note: "Purchased before the announcement", today: 1174000, future: 1174000, status: "Grandfathered" },
      { scenario: "New-build investment", note: "Investment purpose, going forward", today: 1174000, future: 1174000, status: "Still eligible" },
      { scenario: "Established investment", note: "Investment purpose, going forward", today: 1174000, future: 995000, status: "-$179,000" },
    ],
  },
  {
    id: "cba",
    label: "CBA",
    note: "Scaled from the current FundIQ lender panel example",
    rows: [
      { scenario: "Owner occupier", note: "Buying a home to live in", today: 768000, future: 768000, status: "No change" },
      { scenario: "Investment before Budget night", note: "Purchased before the announcement", today: 1101000, future: 1101000, status: "Grandfathered" },
      { scenario: "New-build investment", note: "Investment purpose, going forward", today: 1101000, future: 1101000, status: "Still eligible" },
      { scenario: "Established investment", note: "Investment purpose, going forward", today: 1101000, future: 934000, status: "-$167,000" },
    ],
  },
  {
    id: "westpac",
    label: "Westpac",
    note: "Scaled from the current FundIQ lender panel example",
    rows: [
      { scenario: "Owner occupier", note: "Buying a home to live in", today: 704000, future: 704000, status: "No change" },
      { scenario: "Investment before Budget night", note: "Purchased before the announcement", today: 1009000, future: 1009000, status: "Grandfathered" },
      { scenario: "New-build investment", note: "Investment purpose, going forward", today: 1009000, future: 1009000, status: "Still eligible" },
      { scenario: "Established investment", note: "Investment purpose, going forward", today: 1009000, future: 856000, status: "-$153,000" },
    ],
  },
];

const maxScenarioValue = Math.max(
  ...lenderModels.flatMap((model) =>
    model.rows.flatMap((row) => (Array.isArray(row.future) ? row.future : [row.future])),
  ),
);

function formatMoney(value) {
  return value.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });
}

function formatScenarioValue(value) {
  if (!Array.isArray(value)) {
    return formatMoney(value);
  }

  return `${formatMoney(value[0])} - ${formatMoney(value[1])}`;
}

function formatShortMoney(value) {
  return `$${Math.round(value / 1000)}k`;
}

function barStyle(value) {
  if (!Array.isArray(value)) {
    return {
      left: 0,
      width: `${(value / maxScenarioValue) * 100}%`,
    };
  }

  return {
    left: `${(value[0] / maxScenarioValue) * 100}%`,
    width: `${((value[1] - value[0]) / maxScenarioValue) * 100}%`,
  };
}

function barValueClass(value) {
  return Array.isArray(value) ? "learn-bar-value learn-bar-value-range" : "learn-bar-value";
}

function reductionLabel(row, baselineRow) {
  if (!baselineRow || row.status !== "Lower range") {
    return row.status;
  }

  if (Array.isArray(row.future) && Array.isArray(baselineRow.future)) {
    return `Down ${formatShortMoney(baselineRow.future[0] - row.future[0])}-${formatShortMoney(baselineRow.future[1] - row.future[1])}`;
  }

  if (!Array.isArray(row.future) && !Array.isArray(baselineRow.future)) {
    return `Down ${formatShortMoney(baselineRow.future - row.future)}`;
  }

  return row.status;
}

function Header() {
  return (
    <header className="paperlp-nav">
      <Link to="/" className="paperlp-logo" aria-label="FundIQ home">
        fundiq
      </Link>
      <nav className="paperlp-links" aria-label="Primary navigation">
        <Link to="/#how-it-works">How it works</Link>
        <Link to="/learn/negative-gearing-budget">Learn</Link>
        <Link to="/#contact" className="paperlp-mobile-optional">Contact</Link>
        <Link to="/assessment" className="paperlp-nav-button">
          Calculate
        </Link>
      </nav>
    </header>
  );
}

function SectionNav({ activeSection }) {
  return (
    <aside className="learn-post-side" aria-label="Article sections">
      <span>In this article</span>
      <nav>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={activeSection === section.id ? "is-active" : undefined}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function ScenarioBars() {
  const [selectedModelId, setSelectedModelId] = useState("panel");
  const selectedModel = lenderModels.find((model) => model.id === selectedModelId) ?? lenderModels[0];
  const baselineRow = selectedModel.rows.find((row) => row.scenario === "Investment before Budget night");

  return (
    <section className="learn-visual" id="borrower-scenarios" aria-labelledby="scenario-visual-title">
      <div className="learn-visual-head">
        <div className="learn-visual-topline">
          <span>FundIQ serviceability model</span>
          <a href="#fine-print">How we worked this out</a>
        </div>
        <div>
          <h2 id="scenario-visual-title">Impact on maximum borrowing capacity</h2>
        </div>
        <p>{selectedModel.note}. Investment scenarios include $700 weekly rent and $5,000 annual property costs.</p>
      </div>

      <div className="learn-model-tabs" aria-label="Choose model view">
        {lenderModels.map((model) => (
          <button
            type="button"
            key={model.id}
            className={model.id === selectedModelId ? "is-active" : undefined}
            onClick={() => setSelectedModelId(model.id)}
          >
            {model.label}
          </button>
        ))}
      </div>

      <div className="learn-bars" aria-label="Borrowing power by scenario">
        {selectedModel.rows.map((row) => {
          const isLowerRange = row.status === "Lower range" || row.status.startsWith("-");

          return (
            <article className={isLowerRange ? "learn-bar-group is-lower" : "learn-bar-group"} key={row.scenario}>
              <div className="learn-bar-copy">
                <strong>{row.scenario}</strong>
                <span>{row.note}</span>
              </div>
              <div className="learn-bar-line">
                <div className="learn-bar-track">
                  <i style={barStyle(row.future)} />
                </div>
                <b className={barValueClass(row.future)}>{formatScenarioValue(row.future)}</b>
              </div>
              <span className={row.status.startsWith("-") || row.status.includes("Lower") ? "learn-status is-lower" : "learn-status"}>
                {reductionLabel(row, baselineRow)}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function NegativeGearingPostPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionIds = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + 140;
      const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      const current = isAtPageEnd
        ? sectionIds[sectionIds.length - 1]
        : sectionIds.reduce((active, id) => {
            const node = document.getElementById(id);

            if (!node) {
              return active;
            }

            return node.offsetTop <= scrollMarker ? id : active;
          }, sections[0].id);

      setActiveSection(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return (
    <div className="paperlp-page learn-post-page">
      <Header />
      <main className="learn-post-shell">
        <SectionNav activeSection={activeSection} />

        <article className="learn-post">
          <header className="learn-post-hero" id="short-version">
            <span className="paperlp-pill">Learn</span>
            <p className="learn-post-kicker">2026 Federal Budget</p>
            <h1>What the negative gearing changes mean for borrowing power</h1>
            <p>
              Tiny myth-bust: negative gearing is not being marched out of the building. Investors can still often
              borrow more than owner occupiers because rent counts as income. The catch is narrower. For affected
              established properties, losses help against rental income, not against all income. Same lever, shorter reach.
            </p>
          </header>

          <section className="learn-copy-section" id="what-changes">
            <h2>What changes</h2>
            <p>
              From 1 July 2027, losses on affected established residential investment properties can only reduce
              residential property income and capital gains. If there is no matching property income this year, the loss gets carried forward.
            </p>
            <p>
              If you already held the property before 7:30pm AEST on 12 May 2026, the Budget says you can keep using the
              old negative gearing rules until you sell. Eligible new builds also keep the full offset.
            </p>
          </section>

          <section className="learn-copy-section" id="borrowing-power">
            <h2>Why lenders care</h2>
            <p>
              In serviceability, negative gearing can lift after-tax income because the rental loss reduces taxable salary income.
              When the loss is quarantined, it may still be useful later, but it does not help this year's monthly cash flow.
            </p>
            <p>
              That is why the FundIQ model still shows investors ahead of owner occupiers, just not as far ahead for a future
              established purchase. Same borrower, same deal shape, different tax treatment.
            </p>
          </section>

          <ScenarioBars />

          <section className="learn-copy-section" id="scenario-map">
            <h2>What each scenario means</h2>
            <ul className="learn-scenario-list">
              <li><strong>Owner occupier:</strong> no rental loss, so the negative gearing change does not move the borrowing number in this example.</li>
              <li><strong>Investment before Budget night:</strong> if the property was held before the announcement, the old treatment can keep applying until sale.</li>
              <li><strong>New-build investment:</strong> investment purpose new properties can still use losses against other income.</li>
              <li><strong>Established investment:</strong> investment purpose existing properties purchased later can only offset losses against rental income and capital gains.</li>
            </ul>
          </section>

          <section className="learn-action">
            <h2>In the market for a property?</h2>
            <p>
              In the market for a property? If you're a first home buyer, owner occupier, or investor, we'll help you
              calculate an accurate range so you can get real on what you can afford.
            </p>
            <Link to="/assessment" className="learn-action-button">
              Calculate my max purchase power
            </Link>
          </section>

          <section className="learn-copy-section" id="fine-print">
            <h2>A little fine print</h2>
            <p>
              This is a serviceability example, not tax advice. The Budget settings still need final law and ATO guidance.
              Dates, definitions, and new-build eligibility matter.
            </p>
            <p className="learn-source-line">
              Sources:{" "}
              <a href="https://budget.gov.au/content/factsheets/download/tax-explainers-negative-gearing-capital-gains-tax.pdf">
                Australian Government 2026-27 Budget negative gearing and CGT factsheet
              </a>
              , plus the FundIQ serviceability research note for the Athena scenario.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}

export default NegativeGearingPostPage;
