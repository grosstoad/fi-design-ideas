import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import nabLogo from "../assets/buying-range/lenders/nab-symbol.svg";
import suncorpBankLogo from "../assets/buying-range/lenders/suncorp-bank.png";
import ubankLogo from "../assets/buying-range/lenders/ubank.svg";
import westpacLogo from "../assets/buying-range/lenders/westpac.png";
import {
  INCOME_DEFAULT,
  INCOME_MAX,
  INCOME_MIN,
  INCOME_STEP,
  LENDERS,
  WORKED_EXAMPLE,
  barRatio,
  formatMonthlyRepayment,
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

const ICON_ONLY_LENDERS = new Set(["cba", "nab", "westpac", "anz", "macquarie", "ing", "athena"]);

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
].map(([id, name]) => ({ id, name, logo: LENDER_LOGOS[id], iconOnly: ICON_ONLY_LENDERS.has(id) }));

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

export function RangeModule() {
  const [income, setIncome] = useState(INCOME_DEFAULT);
  const [order, setOrder] = useState(() =>
    rankResults(resultsForIncome(INCOME_DEFAULT)).map((result) => result.id)
  );
  const [dragging, setDragging] = useState(false);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const draggingRef = useRef(false);
  const incomeRef = useRef(INCOME_DEFAULT);
  const settleTimer = useRef(null);
  const rowRefs = useRef(new Map());
  const previousRowPositions = useRef(null);

  const results = useMemo(() => resultsForIncome(income), [income]);
  const resultById = useMemo(
    () => Object.fromEntries(results.map((result) => [result.id, result])),
    [results]
  );
  const orderedResults = order.map((id) => resultById[id]).filter(Boolean);
  const values = results.map((result) => result.maxPropertyPrice);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const sliderRatio = (income - INCOME_MIN) / (INCOME_MAX - INCOME_MIN);

  function commitOrder(nextIncome) {
    const nextResults = rankResults(resultsForIncome(nextIncome));
    previousRowPositions.current = new Map(
      [...rowRefs.current].map(([id, node]) => [id, node.getBoundingClientRect().top])
    );
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

  useLayoutEffect(() => {
    const previous = previousRowPositions.current;
    if (!previous) return;

    rowRefs.current.forEach((node, id) => {
      const previousTop = previous.get(id);
      if (previousTop === undefined) return;
      const delta = previousTop - node.getBoundingClientRect().top;
      if (!delta) return;
      node.style.transition = "none";
      node.style.transform = `translateY(${delta}px)`;
      node.getBoundingClientRect();
      node.style.transition = "transform 360ms var(--ease-in-out)";
      node.style.transform = "translateY(0)";
    });

    previousRowPositions.current = null;
  }, [order]);

  return (
    <>
      <section className="lpb-module" aria-labelledby="lpb-module-title" data-asset="range-module">
        <div className="lpb-module-head">
          <div>
            <h2 className="lpb-module-title" id="lpb-module-title">Your purchase power range</h2>
            <p className="lpb-module-subtitle">The maximum property price you could afford.</p>
          </div>
          <p key={income} className="lpb-module-range lpb-num lpb-number-update" aria-label={`From ${fmtMoney(minimum)} to ${fmtMoney(maximum)}`}>
            {fmtPrice(minimum)}<span>–</span>{fmtPrice(maximum)}
          </p>
        </div>

        <div className="lpb-comparison-head" aria-hidden="true">
          <span>Lender</span>
          <span>Max property price</span>
          <span>Loan amount</span>
          <span>Interest rate</span>
          <span>Comparison rate</span>
          <span>Monthly repayment</span>
        </div>

        <div
          className={`lpb-comparison-list ${dragging ? "is-adjusting" : ""}`}
          id="lpb-comparison-list"
          role="region"
          aria-label="Illustrative lender comparison"
        >
          {orderedResults.map((result) => (
            <div
              className="lpb-comparison-row"
              key={result.id}
              aria-hidden="true"
              ref={(node) => {
                if (node) rowRefs.current.set(result.id, node);
                else rowRefs.current.delete(result.id);
              }}
            >
              <span className="lpb-lender-cell">
                <span>{result.name}</span>
              </span>
              <span className="lpb-property-cell">
                <span className="lpb-row-track" aria-hidden="true">
                  <span
                    className="lpb-row-fill"
                    style={{ "--lpb-bar-ratio": barRatio(result.maxPropertyPrice) }}
                  />
                </span>
                <strong className="lpb-num"><span key={`${income}-price`} className="lpb-number-update">{fmtPrice(result.maxPropertyPrice)}</span></strong>
              </span>
              <span className="lpb-num lpb-desktop-metric"><span key={`${income}-loan`} className="lpb-number-update">{fmtPrice(result.maxLoan)}</span></span>
              <span className="lpb-num lpb-desktop-metric">{fmtRate(result.rate)}</span>
              <span className="lpb-num lpb-desktop-metric">{fmtRate(result.comparisonRate)}</span>
              <span className="lpb-num lpb-desktop-metric"><span key={`${income}-repayment`} className="lpb-number-update">{formatMonthlyRepayment(result.monthlyRepayment)}</span></span>
            </div>
          ))}
        </div>
        <p className="lpb-sr">
          {orderedResults.map((result) => `${result.name}: max property price ${fmtMoney(result.maxPropertyPrice)}, loan amount ${fmtMoney(result.maxLoan)}, interest rate ${fmtRate(result.rate)}, comparison rate ${fmtRate(result.comparisonRate)}, monthly repayment ${formatMonthlyRepayment(result.monthlyRepayment)}`).join(". ")}
        </p>

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
          <div className="lpb-module-foot">
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

    </>
  );
}

function LenderProof() {
  function lenderMarks(duplicate = false) {
    return LENDER_MARKS.map((lender) => (
      <li key={`${duplicate ? "duplicate-" : ""}${lender.id}`} className="lpb-lender-mark" data-lender={lender.id}>
        <span className={`lpb-lender-lockup ${lender.iconOnly ? "is-symbol" : "is-wordmark"}`} aria-hidden="true">
          <img src={lender.logo} alt="" width="120" height="36" loading="lazy" decoding="async" />
          {lender.iconOnly ? <span>{lender.name}</span> : null}
        </span>
        <span className="lpb-sr">{lender.name}</span>
      </li>
    ));
  }

  return (
    <section className="lpb-lender-proof" aria-labelledby="lpb-lender-proof-title">
      <div className="lpb-wrap">
        <div className="lpb-lender-proof-head">
          <p className="lpb-lender-proof-caption" id="lpb-lender-proof-title">
            Compare how much you can borrow across 14 lenders
          </p>
        </div>
        <div className="lpb-lender-marquee" aria-label="All 14 lenders included in the comparison">
          <div className="lpb-lender-track">
            <ul className="lpb-lender-rail" aria-label="Lenders included in the comparison">{lenderMarks()}</ul>
            <ul className="lpb-lender-rail" aria-hidden="true">{lenderMarks(true)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputPreview({ phase }) {
  const incomeUpdated = phase >= 2;
  const purposeOpen = phase === 2;
  const settled = phase >= 3;

  return (
    <div className="lpb-input-preview" aria-hidden="true">
      <div className={`lpb-preview-field lpb-preview-field--wide ${phase === 1 || phase === 2 ? "is-focused" : ""}`}>
        <span>Annual income</span>
        <strong className="lpb-num">{incomeUpdated ? "$185,000" : "$145,000"}</strong>
        <small>a year</small>
      </div>
      <div className={`lpb-preview-field lpb-preview-field--wide ${purposeOpen ? "is-open" : ""}`}>
        <span>Buying purpose</span>
        <strong>{settled ? "Home to live in" : "Choose a purpose"}</strong>
        <span className="lpb-preview-chevron" aria-hidden="true">⌄</span>
        {purposeOpen ? <span className="lpb-preview-option">Home to live in</span> : null}
      </div>
      <div className="lpb-preview-field">
        <span>Property location</span>
        <strong>New South Wales</strong>
      </div>
      <div className={`lpb-preview-field ${settled ? "is-updated" : ""}`}>
        <span>Savings</span>
        <strong className="lpb-num">{settled ? "$210,000" : "$180,000"}</strong>
      </div>
    </div>
  );
}

function MiniComparison({ phase }) {
  const updated = phase >= 5;
  const rows = rankResults(resultsForIncome(updated ? 185000 : INCOME_DEFAULT)).slice(0, 4);
  const values = rows.map((row) => row.maxPropertyPrice);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  return (
    <div className={`lpb-mini-comparison ${phase >= 4 ? "is-revealed" : ""} ${updated ? "is-updated" : ""}`}>
      <div className="lpb-mini-head">
        <span>Purchase power range</span>
        <strong className="lpb-num">{fmtPrice(minimum)}<i>–</i>{fmtPrice(maximum)}</strong>
      </div>
      <div className={`lpb-mini-list ${phase === 5 ? "is-scrolling" : ""}`} aria-hidden="true">
        {rows.map((row) => (
          <div className="lpb-mini-row" key={row.id}>
            <strong>{row.name}</strong>
            <span className="lpb-mini-bar"><i style={{ "--lpb-mini-ratio": barRatio(row.maxPropertyPrice) }} /></span>
            <span className="lpb-num">{formatMonthlyRepayment(row.monthlyRepayment)}</span>
          </div>
        ))}
      </div>
      <p className="lpb-sr">Example lender comparison across CommBank, Macquarie, ING and HSBC, including purchase power bars and monthly repayments.</p>
    </div>
  );
}

export function FundsCard({ compact = false, purpose = WORKED_EXAMPLE.purpose, phase = 8 }) {
  const summary = workedExampleSummary();
  const homeLabel = purpose === "investor" ? "investment property" : "home";

  return (
    <div className={`lpb-funds-card lpb-funds-card--phase-${phase} ${compact ? "is-compact" : ""}`}>
      <div className="lpb-funds-zone lpb-funds-costs">
        <h3>You could afford a {fmtMoney(WORKED_EXAMPLE.propertyPrice)} {homeLabel}</h3>
        <p className="lpb-funds-total"><strong className="lpb-num">{fmtMoney(summary.totalPropertyCosts)}</strong> in total property costs</p>
        <div className="lpb-segmented-bar" aria-hidden="true">
          <span style={{ flexGrow: WORKED_EXAMPLE.propertyPrice, background: "#0072ac" }} />
          <span style={{ flexGrow: WORKED_EXAMPLE.stampDuty, background: "#f2bd00" }} />
          <span style={{ flexGrow: WORKED_EXAMPLE.legalAndOtherCosts, background: "#d5002b" }} />
        </div>
        <ul className="lpb-funds-list">
          <li><span className="lpb-funds-legend"><i style={{ background: "#0072ac" }} aria-hidden="true" />Property price</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.propertyPrice)}</strong></li>
          <li><span className="lpb-funds-legend"><i style={{ background: "#f2bd00" }} aria-hidden="true" />Stamp duty</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.stampDuty)}</strong></li>
          <li><span className="lpb-funds-legend"><i style={{ background: "#d5002b" }} aria-hidden="true" />Legal and other costs</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.legalAndOtherCosts)}</strong></li>
        </ul>
      </div>
      <div className="lpb-funds-zone lpb-funds-funding">
        <h4>Funding breakdown</h4>
        <div className="lpb-segmented-bar" aria-hidden="true">
          <span style={{ flexGrow: WORKED_EXAMPLE.loan, background: "#005eb8" }} />
          <span style={{ flexGrow: summary.savingsUsed, background: "#4fc5b8" }} />
        </div>
        <ul className="lpb-funds-list">
          <li><span>Loan from {WORKED_EXAMPLE.lender} ({Math.round(summary.lvr)}% LVR)</span><strong className="lpb-num">{fmtMoney(WORKED_EXAMPLE.loan)}</strong></li>
          <li><span>Deposit</span><strong className="lpb-num">{fmtMoney(summary.savingsUsed)}</strong></li>
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
    title: "Add your details",
    body: "Tell us about your income, savings and the property you are planning to buy.",
  },
  {
    title: "Compare lender results",
    body: "Compare borrowing calculations across 14+ lenders and counting.",
  },
  {
    title: "Understand your costs",
    body: "See the property costs, how the purchase is funded and what remains after settlement.",
  },
];

function useHowItWorksSequence(sectionRef) {
  const [phase, setPhase] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return 8;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 8 : 0;
  });
  const hasPlayed = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || phase === 8 || typeof IntersectionObserver === "undefined") return undefined;
    const timers = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasPlayed.current) return;
        hasPlayed.current = true;
        observer.disconnect();
        [200, 850, 1500, 2350, 3350, 4250, 5100, 6100].forEach((delay, index) => {
          timers.push(window.setTimeout(() => setPhase(index + 1), delay));
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10%" }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [sectionRef]);

  return phase;
}

function ConnectedStepLine({ phase, children }) {
  const progress = phase >= 6 ? 1 : phase >= 4 ? 0.5 : 0;
  return <ol className="lpb-connected-steps" style={{ "--lpb-step-progress": progress }}>{children}</ol>;
}

function HowItWorks() {
  const sectionRef = useRef(null);
  const phase = useHowItWorksSequence(sectionRef);
  const starts = [1, 4, 6];
  const completes = [4, 6, 8];

  return (
    <section ref={sectionRef} className={`lpb-section lpb-how lpb-how--phase-${phase}`} id="how-it-works" aria-labelledby="lpb-how-title">
      <div className="lpb-wrap">
        <div className="lpb-section-intro lpb-section-intro--compact">
          <h2 className="lpb-h2" id="lpb-how-title">From your details to a number you can use.</h2>
          <p>See what you could borrow, compare lender results and understand the full cost of buying.</p>
        </div>
        <ConnectedStepLine phase={phase}>
          {FLOW_STEPS.map((step, index) => {
            const active = phase >= starts[index] && phase < completes[index];
            const completed = phase >= completes[index];
            return (
              <li className={`${active ? "is-active" : ""} ${completed ? "is-complete" : ""}`} key={step.title}>
                <span className="lpb-step-marker lpb-num">{index + 1}</span>
                <article className="lpb-step-column">
                  <div className="lpb-step-copy">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                  <div className="lpb-step-visual">
                    {index === 0 ? <InputPreview phase={phase} /> : null}
                    {index === 1 ? <MiniComparison phase={phase} /> : null}
                    {index === 2 ? <FundsCard compact phase={phase} /> : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ConnectedStepLine>
      </div>
    </section>
  );
}

const PROPOSITIONS = [
  {
    image: "/landing-b/proposition-lenders-casual-v2.webp",
    alt: "A chalk-textured illustration of four lender folders",
    title: "Compare every lender side by side",
    body: "Compare borrowing calculations across 14+ lenders and counting.",
  },
  {
    image: "/landing-b/proposition-suburbs-casual-v2.webp",
    alt: "A chalk-textured map illustration with three house location pins",
    title: "Built on real lender calculations",
    body: "See estimates informed by lender policies, rates and the costs of purchasing a home.",
  },
  {
    image: "/landing-b/proposition-scenarios-casual-v2.webp",
    alt: "A chalk-textured control board illustration with four sliders",
    title: "Test changes before you make them",
    body: "Adjust your income, deposit or plans and see how your borrowing range responds.",
  },
];

function PropositionGrid() {
  return (
    <section className="lpb-section lpb-propositions" aria-labelledby="lpb-propositions-title">
      <div className="lpb-wrap">
        <div className="lpb-section-intro lpb-section-intro--compact">
          <h2 className="lpb-h2" id="lpb-propositions-title">A borrowing number you can trust.</h2>
          <p>Fundora brings lender calculations, real purchase costs and scenario modelling into one clear view.</p>
        </div>
        <div className="lpb-proposition-grid">
          {PROPOSITIONS.map((item) => (
            <article className="lpb-proposition-card" key={item.title}>
              <div className="lpb-proposition-art"><img src={item.image} alt={item.alt} width="768" height="768" loading="lazy" decoding="async" /></div>
              <div className="lpb-proposition-copy">
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
            <a href="#" className="lpb-topnav-link">About</a>
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
