import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveDialog } from "../components/ResponsiveDialog";
import anzLogo from "../assets/buying-range/lenders/anz.png";
import ampLogo from "../assets/buying-range/lenders/amp.svg";
import athenaLogo from "../assets/buying-range/lenders/athena.png";
import bankwestLogo from "../assets/buying-range/lenders/bankwest.svg";
import bendigoBankLogo from "../assets/buying-range/lenders/bendigo-bank.png";
import boqLogo from "../assets/buying-range/lenders/boq.svg";
import cbaLogo from "../assets/buying-range/lenders/commbank.svg";
import hsbcLogo from "../assets/buying-range/lenders/hsbc.svg";
import ingLogo from "../assets/buying-range/lenders/ing.png";
import macquarieLogo from "../assets/buying-range/lenders/macquarie.png";
import nabLogo from "../assets/buying-range/lenders/nab.png";
import suncorpBankLogo from "../assets/buying-range/lenders/suncorp-bank.png";
import ubankLogo from "../assets/buying-range/lenders/ubank.svg";
import westpacLogo from "../assets/buying-range/lenders/westpac.png";
import {
  BAR_DOMAIN_MAX,
  INCOME_DEFAULT,
  INCOME_MAX,
  INCOME_MIN,
  INCOME_STEP,
  LENDERS,
  WORKED_EXAMPLE,
  barRatio,
  incomeStepFor,
  rankResults,
  resultsForIncome,
  snapIncome,
  workedExampleSummary,
} from "./landing-b/model";
import "../landing-b.css";

const PAGE_TITLE = "Fundora | Find the home you can really afford";
const PAGE_DESCRIPTION =
  "Calculate and compare your property purchase power across 14 Australian lenders without affecting your credit score.";

const LENDER_LOGOS = {
  amp: ampLogo,
  anz: anzLogo,
  athena: athenaLogo,
  bankwest: bankwestLogo,
  bendigo: bendigoBankLogo,
  boq: boqLogo,
  cba: cbaLogo,
  hsbc: hsbcLogo,
  ing: ingLogo,
  macquarie: macquarieLogo,
  nab: nabLogo,
  suncorp: suncorpBankLogo,
  ubank: ubankLogo,
  westpac: westpacLogo,
};

const LENDER_MARKS = [
  ["cba", "CommBank"],
  ["nab", "NAB"],
  ["westpac", "Westpac"],
  ["anz", "ANZ"],
  ["macquarie", "Macquarie"],
  ["ing", "ING"],
  ["athena", "Athena"],
  ["bankwest", "Bankwest"],
  ["suncorp", "Suncorp"],
  ["bendigo", "Bendigo Bank"],
  ["boq", "BOQ"],
  ["amp", "AMP"],
  ["hsbc", "HSBC"],
  ["ubank", "ubank"],
].map(([id, name]) => ({ id, name, logo: LENDER_LOGOS[id] }));

export function fmtPrice(value) {
  if (value >= 1000000) {
    const precision = value >= 10000000 ? 1 : 2;
    return `$${(value / 1000000).toFixed(precision)}M`;
  }
  return `$${Math.round(value / 1000)}k`;
}

function fmtMoney(value) {
  return `$${Math.round(value).toLocaleString("en-AU")}`;
}

function fmtIncome(value) {
  return `$${value.toLocaleString("en-AU")}`;
}

function fmtRate(value) {
  return `${value.toFixed(2)}%`;
}

function useVisibility(ref, rootMargin = "100px") {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isVisible;
}

function ResultStat({ label, value, note }) {
  return (
    <div className="lpb-detail-stat">
      <span>{label}</span>
      <strong className="lpb-num">{value}</strong>
      {note ? <small>{note}</small> : null}
    </div>
  );
}

function LenderDetail({ result }) {
  if (!result) return null;
  return (
    <div className="lpb-detail-content">
      <div className="lpb-detail-product">
        <span className="lpb-lender-dot" style={{ background: result.color }} aria-hidden="true" />
        <div>
          <strong>{result.name}</strong>
          <span>Illustrative variable home loan · Owner-occupier · P&amp;I</span>
        </div>
      </div>
      <div className="lpb-detail-grid">
        <ResultStat label="Maximum property price" value={fmtMoney(result.maxPropertyPrice)} />
        <ResultStat label="Loan amount" value={fmtMoney(result.maxLoan)} note={`${Math.round(result.lvr)}% LVR`} />
        <ResultStat label="Interest rate" value={fmtRate(result.rate)} note="Illustrative" />
        <ResultStat label="Comparison rate" value={fmtRate(result.comparisonRate)} note="Illustrative" />
        <ResultStat label="Estimated repayment" value={`${fmtMoney(result.monthlyRepayment)} /mo`} />
      </div>
      <p className="lpb-dialog-note">
        This example does not use your complete financial position or live lender policy.
      </p>
      <Link to="/assessment" className="lpb-btn lpb-btn--primary lpb-dialog-cta">
        Calculate with my details
      </Link>
    </div>
  );
}

export function RangeModule() {
  const [income, setIncome] = useState(INCOME_DEFAULT);
  const [order, setOrder] = useState(() =>
    rankResults(resultsForIncome(INCOME_DEFAULT)).map((result) => result.id)
  );
  const [dragging, setDragging] = useState(false);
  const [selectedLenderId, setSelectedLenderId] = useState(null);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [showAllLenders, setShowAllLenders] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const draggingRef = useRef(false);
  const incomeRef = useRef(INCOME_DEFAULT);
  const comparisonListRef = useRef(null);
  const settleTimer = useRef(null);

  const results = useMemo(() => resultsForIncome(income), [income]);
  const resultById = useMemo(
    () => Object.fromEntries(results.map((result) => [result.id, result])),
    [results]
  );
  const orderedResults = order.map((id) => resultById[id]).filter(Boolean);
  const selectedResult = selectedLenderId ? resultById[selectedLenderId] : null;
  const values = results.map((result) => result.maxPropertyPrice);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const sliderRatio = (income - INCOME_MIN) / (INCOME_MAX - INCOME_MIN);

  function commitOrder(nextIncome) {
    const nextResults = rankResults(resultsForIncome(nextIncome));
    setOrder(nextResults.map((result) => result.id));
    setAnnouncement(
      `Purchase power range ${fmtPrice(nextResults.at(-1).maxPropertyPrice)} to ${fmtPrice(
        nextResults[0].maxPropertyPrice
      )}`
    );
  }

  function scheduleCommit(nextIncome) {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => commitOrder(nextIncome), 180);
  }

  function updateIncome(rawValue) {
    const nextIncome = snapIncome(rawValue);
    incomeRef.current = nextIncome;
    setIncome(nextIncome);
    if (!draggingRef.current) scheduleCommit(nextIncome);
  }

  function endPointerAdjustment() {
    draggingRef.current = false;
    setDragging(false);
    window.clearTimeout(settleTimer.current);
    commitOrder(incomeRef.current);
  }

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  return (
    <>
      <section className="lpb-module" aria-labelledby="lpb-module-title" data-asset="range-module">
        <div className="lpb-module-head">
          <div>
            <p className="lpb-demo-label">Example comparison</p>
            <h2 className="lpb-module-title" id="lpb-module-title">Your purchase power range</h2>
          </div>
          <p className="lpb-module-range lpb-num" aria-label={`From ${fmtMoney(minimum)} to ${fmtMoney(maximum)}`}>
            {fmtPrice(minimum)}<span>–</span>{fmtPrice(maximum)}
          </p>
        </div>

        <div className="lpb-comparison-head" aria-hidden="true">
          <span>Lender</span>
          <span>Maximum property price</span>
          <span>Loan amount</span>
          <span>Interest rate</span>
          <span>Comparison rate</span>
          <span>Est. monthly</span>
        </div>

        <div
          ref={comparisonListRef}
          className={`lpb-comparison-list ${dragging ? "is-adjusting" : ""} ${showAllLenders ? "is-expanded" : ""}`}
          id="lpb-comparison-list"
          aria-label="Illustrative lender comparison"
        >
          {orderedResults.map((result) => (
            <button
              className="lpb-comparison-row"
              key={result.id}
              type="button"
              onClick={() => setSelectedLenderId(result.id)}
              aria-label={`${result.name}, maximum property price ${fmtMoney(result.maxPropertyPrice)}, loan ${fmtMoney(result.maxLoan)}, interest rate ${fmtRate(result.rate)}, comparison rate ${fmtRate(result.comparisonRate)}, estimated monthly repayment ${fmtMoney(result.monthlyRepayment)}. View details.`}
            >
              <span className="lpb-lender-cell">
                <span className="lpb-lender-dot" style={{ background: result.color }} aria-hidden="true" />
                <span>{result.name}</span>
              </span>
              <span className="lpb-property-cell">
                <span className="lpb-row-track" aria-hidden="true">
                  <span
                    className="lpb-row-fill"
                    style={{ "--lpb-bar-ratio": barRatio(result.maxPropertyPrice), background: result.color }}
                  />
                </span>
                <strong className="lpb-num">{fmtPrice(result.maxPropertyPrice)}</strong>
              </span>
              <span className="lpb-num lpb-desktop-metric">{fmtPrice(result.maxLoan)}</span>
              <span className="lpb-num lpb-desktop-metric">{fmtRate(result.rate)}</span>
              <span className="lpb-num lpb-desktop-metric">{fmtRate(result.comparisonRate)}</span>
              <span className="lpb-num lpb-desktop-metric">{fmtMoney(result.monthlyRepayment)}</span>
              <span className="lpb-row-chevron" aria-hidden="true">›</span>
            </button>
          ))}
        </div>

        <div className="lpb-module-controls">
          <div className="lpb-slider-head">
            <label htmlFor="lpb-income">Household income</label>
            <output className="lpb-slider-value lpb-num" htmlFor="lpb-income">{fmtIncome(income)}</output>
          </div>
          <div className="lpb-slider-control" style={{ "--lpb-slider-ratio": sliderRatio }}>
            <span className="lpb-slider-progress" aria-hidden="true" />
            <input
              id="lpb-income"
              type="range"
              min={INCOME_MIN}
              max={INCOME_MAX}
              step={INCOME_STEP}
              value={income}
              onChange={(event) => updateIncome(Number(event.target.value))}
              onPointerDown={() => {
                draggingRef.current = true;
                setDragging(true);
                window.clearTimeout(settleTimer.current);
              }}
              onPointerUp={endPointerAdjustment}
              onPointerCancel={endPointerAdjustment}
              onBlur={() => {
                if (draggingRef.current) endPointerAdjustment();
              }}
              onKeyDown={(event) => {
                const direction = event.key === "ArrowRight" || event.key === "ArrowUp" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 0;
                if (!direction) return;
                event.preventDefault();
                const multiplier = event.shiftKey ? 5 : 1;
                updateIncome(income + direction * incomeStepFor(income) * multiplier);
              }}
              aria-valuetext={`${fmtIncome(income)} household income a year`}
            />
          </div>
          <div className="lpb-slider-ends lpb-num" aria-hidden="true">
            <span>{fmtIncome(INCOME_MIN)}</span>
            <span>{fmtIncome(INCOME_MAX)}</span>
          </div>
          <div className="lpb-module-foot">
            <button
              type="button"
              className="lpb-view-all"
              aria-expanded={showAllLenders}
              aria-controls="lpb-comparison-list"
              onClick={() => {
                if (showAllLenders) comparisonListRef.current?.scrollTo({ top: 0 });
                setShowAllLenders((visible) => !visible);
              }}
            >
              {showAllLenders ? "Show top 5 lenders" : "View all 14 lenders"}
            </button>
            <span className="lpb-domain-note">Bars use a fixed $0–{fmtPrice(BAR_DOMAIN_MAX)} scale</span>
            <button type="button" className="lpb-text-button" aria-haspopup="dialog" onClick={() => setAssumptionsOpen(true)}>
              How we worked this out
            </button>
          </div>
        </div>
        <span className="lpb-sr" aria-live="polite">{announcement}</span>
      </section>

      <ResponsiveDialog
        isOpen={assumptionsOpen}
        onClose={() => setAssumptionsOpen(false)}
        title="How this example was worked out"
        description="A transparent demonstration of the comparison interface—not a personalised credit assessment."
      >
        <div className="lpb-assumptions-content">
          <div>
            <h3>Example profile</h3>
            <ul>
              <li>Household income selected with the slider</li>
              <li>$180,000 available toward the purchase</li>
              <li>Owner-occupier, principal and interest over 30 years</li>
              <li>No dependants, liabilities or other debts included</li>
            </ul>
          </div>
          <div>
            <h3>What this demonstration does not do</h3>
            <p>
              The values use illustrative curves and example rates. They are not connected to live lender policy, do not represent loan offers and should not be used to make a purchase decision.
            </p>
          </div>
          <Link to="/assessment" className="lpb-btn lpb-btn--primary">Use my details</Link>
        </div>
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={Boolean(selectedResult)}
        onClose={() => setSelectedLenderId(null)}
        title={selectedResult ? `${selectedResult.name} example` : "Lender example"}
        description="The complete row details, including both interest and comparison rates."
      >
        <LenderDetail result={selectedResult} />
      </ResponsiveDialog>
    </>
  );
}

function LenderProof() {
  const marqueeRef = useRef(null);
  const marqueeIsVisible = useVisibility(marqueeRef);
  const [paused, setPaused] = useState(false);

  function lenderMarks(duplicate = false) {
    return LENDER_MARKS.map((lender) => (
      <li key={`${duplicate ? "duplicate-" : ""}${lender.id}`} className="lpb-lender-mark" data-lender={lender.id}>
        <img src={lender.logo} alt="" width="120" height="36" loading="lazy" decoding="async" />
        <span className="lpb-sr">{lender.name}</span>
      </li>
    ));
  }

  return (
    <section className="lpb-lender-proof" aria-labelledby="lpb-lender-proof-title">
      <div className="lpb-lender-proof-head">
        <p className="lpb-lender-proof-caption" id="lpb-lender-proof-title">
          Compare how much you can borrow across 14 lenders
        </p>
        <button type="button" className="lpb-marquee-toggle" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          {paused ? "Play logos" : "Pause logos"}
        </button>
      </div>
      <div
        ref={marqueeRef}
        className={`lpb-lender-marquee ${marqueeIsVisible ? "is-active" : ""} ${paused ? "is-paused" : ""}`}
        aria-label="All 14 lenders included in the comparison"
      >
        <div className="lpb-lender-track">
          <ul className="lpb-lender-rail" aria-label="Lenders included in the comparison">{lenderMarks()}</ul>
          <ul className="lpb-lender-rail" aria-hidden="true">{lenderMarks(true)}</ul>
        </div>
      </div>
    </section>
  );
}

function InputPreview() {
  const [income, setIncome] = useState("145000");
  const [purpose, setPurpose] = useState("owner");
  const [state, setState] = useState("NSW");
  const [savings, setSavings] = useState("210000");
  const formatInputAmount = (value) => value ? Number(value).toLocaleString("en-AU") : "";
  const digitsOnly = (value) => value.replace(/\D/g, "");

  return (
    <form className="lpb-flow-form" aria-label="Try the example financial and property inputs" onSubmit={(event) => event.preventDefault()}>
      <label>
        <span>Household income</span>
        <span className="lpb-flow-input-affix">
          <span aria-hidden="true">$</span>
          <input type="text" inputMode="numeric" pattern="[0-9,]*" value={formatInputAmount(income)} onChange={(event) => setIncome(digitsOnly(event.target.value))} />
          <small>a year</small>
        </span>
      </label>
      <label>
        <span>Buying purpose</span>
        <select value={purpose} onChange={(event) => setPurpose(event.target.value)}>
          <option value="owner">Home to live in</option>
          <option value="investor">Investment property</option>
        </select>
      </label>
      <div className="lpb-flow-field--split">
        <label>
          <span>Property location</span>
          <select value={state} onChange={(event) => setState(event.target.value)}>
            <option value="NSW">New South Wales</option>
            <option value="VIC">Victoria</option>
            <option value="QLD">Queensland</option>
          </select>
        </label>
        <label>
          <span>Savings</span>
          <span className="lpb-flow-input-affix">
            <span aria-hidden="true">$</span>
            <input type="text" inputMode="numeric" pattern="[0-9,]*" value={formatInputAmount(savings)} onChange={(event) => setSavings(digitsOnly(event.target.value))} />
          </span>
        </label>
      </div>
    </form>
  );
}

function MiniComparison() {
  const rows = rankResults(resultsForIncome(INCOME_DEFAULT)).slice(0, 4);
  const [selectedId, setSelectedId] = useState(rows[0].id);
  const selected = rows.find((row) => row.id === selectedId) ?? rows[0];

  return (
    <div className="lpb-mini-comparison">
      <div className="lpb-mini-list" aria-label="Example lender results">
        {rows.map((row) => (
          <button key={row.id} type="button" className={row.id === selectedId ? "is-selected" : ""} onClick={() => setSelectedId(row.id)}>
            <span><span className="lpb-lender-dot" style={{ background: row.color }} aria-hidden="true" />{row.name}</span>
            <strong className="lpb-num">{fmtPrice(row.maxPropertyPrice)}</strong>
          </button>
        ))}
      </div>
      <div className="lpb-mini-detail" aria-live="polite">
        <span>Selected lender</span>
        <h4>{selected.name}</h4>
        <dl>
          <div><dt>Loan amount</dt><dd className="lpb-num">{fmtPrice(selected.maxLoan)}</dd></div>
          <div><dt>Rate / comparison</dt><dd className="lpb-num">{fmtRate(selected.rate)} / {fmtRate(selected.comparisonRate)}</dd></div>
          <div><dt>Estimated monthly</dt><dd className="lpb-num">{fmtMoney(selected.monthlyRepayment)}</dd></div>
        </dl>
      </div>
    </div>
  );
}

export function FundsCard({ compact = false, purpose = WORKED_EXAMPLE.purpose }) {
  const summary = workedExampleSummary();
  const homeLabel = purpose === "investor" ? "investment property" : "home";

  return (
    <div className={`lpb-funds-card ${compact ? "is-compact" : ""}`}>
      <div className="lpb-funds-zone">
        <h3>You could afford a {fmtMoney(WORKED_EXAMPLE.propertyPrice)} {homeLabel}</h3>
        <p className="lpb-funds-total"><strong className="lpb-num">{fmtMoney(summary.totalPropertyCosts)}</strong> in total property costs</p>
        <div className="lpb-segmented-bar" aria-hidden="true">
          <span style={{ flexGrow: WORKED_EXAMPLE.propertyPrice, background: "#0072ac" }} />
          <span style={{ flexGrow: WORKED_EXAMPLE.stampDuty, background: "#f2bd00" }} />
          <span style={{ flexGrow: WORKED_EXAMPLE.legalAndOtherCosts, background: "#d5002b" }} />
        </div>
        <ul className="lpb-funds-list">
          <li><span>Property price</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.propertyPrice)}</strong></li>
          <li><span>Stamp duty (NSW)</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.stampDuty)}</strong></li>
          <li><span>Legal and other costs</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.legalAndOtherCosts)}</strong></li>
        </ul>
      </div>
      <div className="lpb-funds-zone">
        <h4>Where the funds are sourced from</h4>
        <div className="lpb-segmented-bar" aria-hidden="true">
          <span style={{ flexGrow: WORKED_EXAMPLE.loan, background: "#005eb8" }} />
          <span style={{ flexGrow: summary.savingsUsed, background: "#4fc5b8" }} />
        </div>
        <ul className="lpb-funds-list">
          <li><span>Loan from {WORKED_EXAMPLE.lender} · {Math.round(summary.lvr)}% LVR</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.loan)}</strong></li>
          <li><span>Your savings used (deposit + costs)</span><strong className="lpb-num">{fmtMoney(summary.savingsUsed)}</strong></li>
        </ul>
      </div>
      <div className="lpb-funds-verdict">
        <span>Savings left over</span>
        <strong className="lpb-num">{fmtMoney(summary.savingsRemaining)}</strong>
      </div>
    </div>
  );
}

const FLOW_STEPS = [
  {
    title: "Share your details.",
    body: "Your financials, the property you’re after and your savings.",
  },
  {
    title: "See how the lenders stack up.",
    body: "Compare every answer, then open a lender to understand the difference.",
  },
  {
    title: "See your total costs.",
    body: "Understand what buying costs and exactly where the funds come from.",
  },
];

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="lpb-section lpb-how" id="how-it-works" aria-labelledby="lpb-how-title">
      <div className="lpb-wrap">
        <div className="lpb-section-intro lpb-section-intro--compact">
          <p className="lpb-section-index">How Fundora works</p>
          <h2 className="lpb-h2" id="lpb-how-title">From your details to a number you can use.</h2>
        </div>
        <div className="lpb-flow">
          <ol className="lpb-flow-nav">
            {FLOW_STEPS.map((step, index) => (
              <li key={step.title}>
                <button
                  type="button"
                  className={activeStep === index ? "is-active" : ""}
                  aria-pressed={activeStep === index}
                  aria-controls="lpb-flow-stage"
                  onClick={() => setActiveStep(index)}
                >
                  <span className="lpb-flow-number lpb-num">0{index + 1}</span>
                  <span><strong>{step.title}</strong><small>{step.body}</small></span>
                </button>
              </li>
            ))}
          </ol>
          <div className="lpb-flow-stage" id="lpb-flow-stage" aria-live="polite">
            <div className="lpb-flow-stage-head">
              <span className="lpb-num">0{activeStep + 1}</span>
              <strong>{FLOW_STEPS[activeStep].title}</strong>
            </div>
            <div className="lpb-flow-stage-content" key={activeStep}>
              {activeStep === 0 ? <InputPreview /> : null}
              {activeStep === 1 ? <MiniComparison /> : null}
              {activeStep === 2 ? <FundsCard compact /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROPOSITIONS = [
  {
    number: "01",
    image: "/landing-b/proposition-lenders-casual-v2.webp",
    alt: "A chalk-textured illustration of four lender folders",
    title: "Every lender, side by side.",
    body: "See who gives you the most room, and open the detail behind their number.",
  },
  {
    number: "02",
    image: "/landing-b/proposition-suburbs-casual-v2.webp",
    alt: "A chalk-textured map illustration with three house location pins",
    title: "Suburbs and listings within reach.",
    body: "Know where you can realistically buy before you build a shortlist.",
  },
  {
    number: "03",
    image: "/landing-b/proposition-scenarios-casual-v2.webp",
    alt: "A chalk-textured control board illustration with four sliders",
    title: "Stress test any scenario.",
    body: "Model a rate rise or life change and see how your range responds.",
  },
];

function PropositionGrid() {
  return (
    <section className="lpb-section lpb-propositions" aria-labelledby="lpb-propositions-title">
      <div className="lpb-wrap">
        <div className="lpb-section-intro lpb-section-intro--compact">
          <p className="lpb-section-index">More than one number</p>
          <h2 className="lpb-h2" id="lpb-propositions-title">A clearer view of what comes next.</h2>
        </div>
        <div className="lpb-proposition-grid">
          {PROPOSITIONS.map((item) => (
            <article className="lpb-proposition-card" key={item.number}>
              <div className="lpb-proposition-art"><img src={item.image} alt={item.alt} width="768" height="768" loading="lazy" decoding="async" /></div>
              <div className="lpb-proposition-copy">
                <span className="lpb-flow-number lpb-num">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function usePageMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const pageUrl = new URL("/landing-b", window.location.origin).toString();
    const shareImageUrl = new URL("/landing-b/og-share-v2.png", window.location.origin).toString();
    const metadata = [
      ["name", "description", PAGE_DESCRIPTION],
      ["property", "og:type", "website"],
      ["property", "og:title", PAGE_TITLE],
      ["property", "og:description", PAGE_DESCRIPTION],
      ["property", "og:url", pageUrl],
      ["property", "og:image", shareImageUrl],
      ["property", "og:image:width", "1200"],
      ["property", "og:image:height", "630"],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", PAGE_TITLE],
      ["name", "twitter:description", PAGE_DESCRIPTION],
      ["name", "twitter:image", shareImageUrl],
    ];
    const restore = [];
    document.title = PAGE_TITLE;

    metadata.forEach(([attribute, key, content]) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      const created = !element;
      const previousContent = element?.getAttribute("content");
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
      restore.push(() => {
        if (created) element.remove();
        else if (previousContent === null) element.removeAttribute("content");
        else element.setAttribute("content", previousContent);
      });
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;
    const previousCanonical = canonical?.getAttribute("href");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    return () => {
      document.title = previousTitle;
      restore.forEach((restoreMetadata) => restoreMetadata());
      if (createdCanonical) canonical.remove();
      else if (previousCanonical === null) canonical.removeAttribute("href");
      else canonical.setAttribute("href", previousCanonical);
    };
  }, []);
}

export default function LandingBRangePage() {
  usePageMetadata();

  return (
    <div className="lpb-page" id="top">
      <header className="lpb-topbar">
        <nav className="lpb-wrap lpb-topbar-row" aria-label="Main">
          <Link to="/landing-b" className="lpb-wordmark">Ask Fundora</Link>
          <div className="lpb-topnav">
            <a href="#why-fundora" className="lpb-topnav-link">About</a>
            <a href="#how-it-works" className="lpb-topnav-link">Learn</a>
          </div>
          <Link to="/assessment" className="lpb-btn lpb-btn--primary lpb-header-cta">
            <span className="lpb-header-cta-long">Run your scenario</span>
            <span className="lpb-header-cta-short">Start</span>
          </Link>
        </nav>
      </header>

      <main>
        <section className="lpb-hero" aria-labelledby="lpb-hero-title">
          <div className="lpb-wrap">
            <div className="lpb-hero-head">
              <h1 className="lpb-h1" id="lpb-hero-title">Find the home you can really afford.</h1>
              <p className="lpb-subhead">
                Compare what you could borrow across 14+ lenders, based on real lender rules, rates and purchase costs.
              </p>
              <div className="lpb-hero-actions">
                <div className="lpb-cta-row">
                  <Link to="/assessment" className="lpb-btn lpb-btn--primary">Run your scenario</Link>
                  <a href="#how-it-works" className="lpb-btn lpb-btn--secondary">See how it works</a>
                </div>
                <p className="lpb-trust">Free. No impact on your credit score.</p>
              </div>
            </div>
            <RangeModule />
          </div>
        </section>

        <LenderProof />
        <HowItWorks />

        <section className="lpb-section lpb-costs" id="why-fundora" aria-labelledby="lpb-costs-title">
          <div className="lpb-wrap lpb-costs-layout">
            <span className="lpb-anchor-target" id="ceiling" aria-hidden="true" />
            <div className="lpb-costs-copy">
              <p className="lpb-section-index">Your real price ceiling</p>
              <h2 className="lpb-h2" id="lpb-costs-title">The number you actually shop with.</h2>
              <p>
                Your savings have to cover more than the deposit. Fundora brings the property price, buying costs, lender loan and remaining cash into one reconciled view.
              </p>
            </div>
            <FundsCard />
          </div>
        </section>

        <PropositionGrid />

        <section className="lpb-section lpb-closing" aria-label="Get started with Fundora">
          <div className="lpb-wrap">
            <div className="lpb-closing-card">
              <img src="/landing-b/affordable-price-casual.webp" alt="A chalk-textured illustration of a house, price tag and ruler" width="768" height="768" loading="lazy" decoding="async" />
              <div>
                <p className="lpb-section-index">Ready when you are</p>
                <h2 className="lpb-h2" id="lpb-closing-title">Find the home you can really afford.</h2>
                <p className="lpb-closing-sub">Your personalised range is three minutes away.</p>
                <Link to="/assessment" className="lpb-btn lpb-btn--primary">Run your scenario</Link>
                <p className="lpb-closing-trust">Free to check. No impact on your credit score.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="lpb-disclaimer">
        <p className="lpb-wrap">
          This illustrative comparison is not connected to live lender policy. Personalised estimates are general information, not loan offers, pre-approval or personal credit advice.
        </p>
      </div>
      <footer className="lpb-wrap lpb-footer">
        <p>© 2026 Ask Fundora</p>
        <p>Not financial advice</p>
      </footer>
    </div>
  );
}
