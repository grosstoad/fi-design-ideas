import { useState } from "react";
import { Link } from "react-router-dom";
import lenderProofBackground from "../assets/fundiq/lender-proof-background-v2.jpg";
import lendersPanelImage from "../assets/what-you-get/lenders-side-by-side-paper-panel.png";
import propertiesPanelImage from "../assets/what-you-get/properties-within-reach-paper-panel.png";
import realPricePanelImage from "../assets/what-you-get/real-price-afford-paper-panel.png";
import stressTestPanelImage from "../assets/what-you-get/stress-test-scenario-paper-panel.png";

const lenders = [
  { name: "Athena", value: "$847k", width: "100%", color: "#83b9eb" },
  { name: "Macquarie", value: "$812k", width: "95.8%", color: "#abd0f1" },
  { name: "CBA", value: "$762k", width: "89.9%", color: "#c2dcf3" },
  { name: "Westpac", value: "$698k", width: "82.4%", color: "#dcecf8" },
];

const lenderLogos = [
  { name: "Athena", domain: "athena.com.au" },
  { name: "CBA", domain: "commbank.com.au" },
  { name: "Westpac", domain: "westpac.com.au" },
  { name: "NAB", domain: "nab.com.au" },
  { name: "ANZ", domain: "anz.com.au" },
  { name: "Macquarie", domain: "macquarie.com.au" },
  { name: "ING", domain: "ing.com.au" },
];

const confidenceCards = [
  {
    index: "01",
    title: "The real price you can afford",
    body: "Not just a borrowing number - your actual property price ceiling, with deposit, stamp duty, LMI, and real lender policy all factored in.",
    image: realPricePanelImage,
  },
  {
    index: "02",
    title: "Every lender, side by side",
    body: "Compare 30+ lenders at once and see who'll give you the most for your circumstances.",
    image: lendersPanelImage,
  },
  {
    index: "03",
    title: "Properties within reach",
    body: "See which suburbs and listings you can actually afford before you fall in love.",
    image: propertiesPanelImage,
  },
  {
    index: "04",
    title: "Stress test any scenario",
    body: "Model rate hikes, expense changes, or income shifts in real time.",
    image: stressTestPanelImage,
  },
];

const steps = [
  {
    index: "01",
    title: "Tell us your finances",
    body: "Income, expenses, deposit, debts. Three minutes of self-serve, no broker appointment required.",
    panel: "input",
  },
  {
    index: "02",
    title: "We calculate across every lender",
    body: "Real serviceability policy, not a generic formula. Every lender on your panel, in parallel.",
    panel: "running",
  },
  {
    index: "03",
    title: "Explore what you can afford",
    body: "Your real property price ceiling, the best lender for you, the suburbs and listings in reach.",
    panel: "result",
  },
];

const calculatorAssumptions = [
  "Income is treated as gross annual household income before tax.",
  "The online calculator estimate uses a broad income multiple and does not model individual lender policy.",
  "The real range assumes a single owner-occupier purchase, principal and interest repayments, and a 30-year loan term.",
  "Deposit, stamp duty, LMI, existing debts, monthly expenses, and lender serviceability buffers are included in the panel range.",
  "The span reflects the difference between the lower and upper lender outcomes for the same buyer profile.",
  "Figures are illustrative only and are not a credit quote, approval, or recommendation from any lender.",
];

function formatShortCurrency(value) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2).replace(/\.00$/, "").replace(/0$/, "")}M`;
  }

  return `$${Math.round(value / 1000)}k`;
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="paperlp-arrow">
      <path d="M4 9h9" />
      <path d="m10 5 4 4-4 4" />
    </svg>
  );
}

function Header() {
  return (
    <header className="paperlp-nav">
      <Link to="/" className="paperlp-logo" aria-label="FundIQ home">
        fundiq
      </Link>
      <nav className="paperlp-links" aria-label="Primary navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#learn">Learn</a>
        <a href="#contact">Contact</a>
        <Link to="/assessment" className="paperlp-nav-button">
          Calculate
        </Link>
      </nav>
    </header>
  );
}

function LenderBars() {
  return (
    <div className="paperlp-lender-card" aria-label="Purchasing power by lender">
      <div className="paperlp-lender-head">
        <span>Your purchasing power by lender</span>
        <span>Live example</span>
      </div>
      <div className="paperlp-bars">
        {lenders.map((lender) => (
          <div className="paperlp-bar-row" key={lender.name}>
            <span>{lender.name}</span>
            <div className="paperlp-bar-track">
              <i style={{ width: lender.width, backgroundColor: lender.color }} />
              <strong>{lender.value}</strong>
            </div>
          </div>
        ))}
      </div>
      <div className="paperlp-spread">
        <span>Spread across panel</span>
        <strong>$149,000</strong>
      </div>
    </div>
  );
}

function LenderLogoStrip() {
  return (
    <div>
      {lenderLogos.map((lender) => (
        <span className="paperlp-lender-logo" key={lender.name}>
          <img
            src={`https://www.google.com/s2/favicons?domain=${lender.domain}&sz=64`}
            alt=""
            loading="lazy"
          />
          {lender.name}
        </span>
      ))}
    </div>
  );
}

function LenderProof() {
  return (
    <section className="paperlp-proof" id="lender-panel" aria-label="Purchasing power proof">
      <div className="paperlp-proof-visual">
        <img src={lenderProofBackground} alt="" aria-hidden="true" />
        <div className="paperlp-proof-overlay">
          <LenderBars />
        </div>
      </div>
      <div className="paperlp-lenders" aria-label="Powered by leading lenders">
        <p>Powered by Australia's leading lenders</p>
        <LenderLogoStrip />
      </div>
    </section>
  );
}

function GuessworkPanel() {
  const [income, setIncome] = useState(120000);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const sliderPercent = ((income - 80000) / (320000 - 80000)) * 100;
  const incomeRatio = income / 120000;
  const typicalEstimate = 720000 * incomeRatio;
  const rangeLow = 698000 * incomeRatio;
  const rangeHigh = 847000 * incomeRatio;
  const rangeSpan = rangeHigh - rangeLow;

  return (
    <div className="paperlp-guess-card">
      <div className="paperlp-guess-top">
        <div>
          <span>Try it with your income</span>
        </div>
        <label className="paperlp-slider">
          <span className="paperlp-sr-only">Annual income</span>
          <input
            type="range"
            min="80000"
            max="320000"
            step="5000"
            value={income}
            onInput={(event) => setIncome(Number(event.currentTarget.value))}
            onChange={(event) => setIncome(Number(event.target.value))}
            style={{ "--paperlp-slider-position": `${sliderPercent}%` }}
          />
        </label>
        <div className="paperlp-guess-income">
          <span>Drag the slider</span>
          <strong>{income.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 })}</strong>
        </div>
      </div>
      <div className="paperlp-estimate">
        <span>Typical online calculator<br /><small>one rough estimate</small></span>
        <strong>{formatShortCurrency(typicalEstimate)}</strong>
      </div>
      <div className="paperlp-range">
        <div className="paperlp-range-label">
          <span>Your real range</span>
          <small>across your lender panel</small>
        </div>
        <span className="paperlp-range-span">{formatShortCurrency(rangeSpan)} span</span>
        <strong className="paperlp-range-min">{formatShortCurrency(rangeLow)}</strong>
        <div className="paperlp-range-bar">
          <i />
        </div>
        <strong className="paperlp-range-max">{formatShortCurrency(rangeHigh)}</strong>
      </div>
      <button type="button" className="paperlp-assumptions" onClick={() => setShowAssumptions(true)}>
        See assumptions <ArrowIcon />
      </button>
      {showAssumptions && (
        <div
          className="paperlp-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAssumptions(false);
            }
          }}
        >
          <section
            className="paperlp-assumptions-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="paperlp-assumptions-title"
          >
            <div className="paperlp-assumptions-head">
              <div>
                <span>Calculator assumptions</span>
                <h3 id="paperlp-assumptions-title">How this example is modelled</h3>
              </div>
              <button type="button" onClick={() => setShowAssumptions(false)} aria-label="Close assumptions">
                ×
              </button>
            </div>
            <ul>
              {calculatorAssumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

function FeatureGrid() {
  return (
    <div className="paperlp-feature-grid">
      {confidenceCards.map((card) => (
        <article className="paperlp-feature-card" key={card.index}>
          <div className="paperlp-feature-visual" aria-hidden="true">
            <img src={card.image} alt="" loading="lazy" />
          </div>
          <div className="paperlp-feature-copy">
            <span>{card.index}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function StepPanel({ type }) {
  if (type === "input") {
    return (
      <div className="paperlp-step-card paperlp-step-form">
        <div className="paperlp-step-card-head">
          <span>Your finances</span>
          <span>1 of 4</span>
        </div>
        <label>
          Annual income
          <input type="text" inputMode="numeric" defaultValue="$120,000" aria-label="Annual income" />
        </label>
        <label>
          Monthly expenses
          <input type="text" inputMode="numeric" defaultValue="$3,600" aria-label="Monthly expenses" />
        </label>
        <label>
          Deposit saved
          <input type="text" inputMode="numeric" defaultValue="$150,000" aria-label="Deposit saved" />
        </label>
      </div>
    );
  }

  if (type === "running") {
    return (
      <div className="paperlp-step-card paperlp-running-card">
        <div className="paperlp-step-card-head">
          <span>Running across panel</span>
          <span>4 of 7</span>
        </div>
        <ul>
          {lenders.map((lender) => (
            <li key={lender.name}>
              <span><i />{lender.name}</span>
              <strong>{lender.value}</strong>
            </li>
          ))}
          <li className="paperlp-muted-row">
            <span><i />NAB, ANZ, ING</span>
            <em>calculating...</em>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="paperlp-step-card paperlp-result-card">
      <span>Your max purchasing power</span>
      <strong>$847k</strong>
      <p>with Athena, your best lender</p>
      <div>
        <span><b>18</b>Suburbs</span>
        <span><b>142</b>Listings</span>
        <span><b>$149k</b>Spread</span>
      </div>
    </div>
  );
}

function Steps() {
  return (
    <div className="paperlp-steps">
      {steps.map((step) => (
        <article className="paperlp-step" key={step.index}>
          <div className="paperlp-step-dot" aria-hidden="true" />
          <div className="paperlp-step-copy">
            <span>{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
          <StepPanel type={step.panel} />
        </article>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="paperlp-footer" id="contact">
      <div className="paperlp-footer-main">
        <div className="paperlp-footer-brand">
          <Link to="/">fundiq</Link>
          <p>The honest way to know what you can afford. Australian-built, lender-agnostic, free for buyers.</p>
          <span>(c) 2026 fundiq Pty Ltd</span>
        </div>
        <nav aria-label="Product">
          <span>Product</span>
          <a href="#calculator">Calculator</a>
          <a href="#how-it-works">How it works</a>
          <a href="#learn">Learn</a>
          <a href="#lender-panel">Lender panel</a>
        </nav>
        <nav aria-label="Company">
          <span>Company</span>
          <a href="#about">About us</a>
          <a href="#careers">Careers</a>
          <a href="#press">Press</a>
          <a href="#contact">Contact</a>
        </nav>
        <nav aria-label="Legal">
          <span>Legal</span>
          <a href="#privacy">Privacy policy</a>
          <a href="#terms">Terms of service</a>
          <a href="#credit-guide">Credit guide</a>
          <a href="#disclosures">Disclosures</a>
        </nav>
      </div>
      <p className="paperlp-disclaimer">
        fundiq Pty Ltd (ACN 000 000 000) operates under Australian Credit Licence 000000. Borrowing power figures are estimates only and do not constitute a credit offer. Eligibility is subject to lender approval, credit assessment, and the responsible lending obligations of the National Consumer Credit Protection Act 2009 (Cth). Read our credit guide and disclosures before relying on any figure shown.
      </p>
    </footer>
  );
}

function FundIqPage() {
  return (
    <div className="paperlp-page">
      <Header />
      <main>
        <section className="paperlp-hero" id="calculator">
          <p className="paperlp-pill">For Australian property buyers</p>
          <h1>Know exactly what you can afford</h1>
          <p className="paperlp-subhead">
            See your real purchasing power across every lender - and lock in the right home before someone else does.
          </p>
          <Link to="/assessment" className="paperlp-primary">
            Calculate my purchasing power <ArrowIcon />
          </Link>
        </section>

        <LenderProof />

        <section className="paperlp-problem" id="learn">
          <span className="paperlp-eyebrow">The problem</span>
          <h2>Online calculators are guesswork</h2>
          <p>
            They give you a ballpark borrowing number - not what you can actually afford once deposit, costs, and real lender policy come into play. And between lenders, the gap can be $80,000 to $150,000 on top. Guesswork won't land you a home.
          </p>
          <GuessworkPanel />
        </section>

        <section className="paperlp-confidence">
          <span className="paperlp-eyebrow">What you get</span>
          <h2>Everything you need to buy with confidence</h2>
          <FeatureGrid />
        </section>

        <section className="paperlp-process" id="how-it-works">
          <span className="paperlp-eyebrow">How it works</span>
          <h2>Three steps to your real number</h2>
          <Steps />
        </section>

        <section className="paperlp-cta">
          <h2>Stop guessing. Start buying with confidence.</h2>
          <p>Your real purchasing power is 3 minutes away.</p>
          <Link to="/assessment" className="paperlp-primary">
            Calculate my purchasing power <ArrowIcon />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default FundIqPage;
