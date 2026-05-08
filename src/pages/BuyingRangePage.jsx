import { Link } from "react-router-dom";
import fundoraImage from "../assets/buying-range/fundora.png";
import pencilImage from "../assets/buying-range/pencil.png";
import calculatorImage from "../assets/buying-range/calculator.png";
import backpackImage from "../assets/buying-range/backpack.png";
import splitPathImage from "../assets/buying-range/split-path.png";
import affordableIcon from "../assets/buying-range/features/affordable-price-icon.png";
import lenderIcon from "../assets/buying-range/features/lender-comparison-icon.png";
import reachIcon from "../assets/buying-range/features/property-reach-icon.png";
import scenarioIcon from "../assets/buying-range/features/scenario-stress-test-icon.png";
import anzLogo from "../assets/buying-range/lenders/anz.png";
import athenaLogo from "../assets/buying-range/lenders/athena.png";
import cbaLogo from "../assets/buying-range/lenders/cba.png";
import ingLogo from "../assets/buying-range/lenders/ing.png";
import macquarieLogo from "../assets/buying-range/lenders/macquarie.png";
import nabLogo from "../assets/buying-range/lenders/nab.png";
import westpacLogo from "../assets/buying-range/lenders/westpac.png";

const lenders = [
  { name: "Athena", logo: athenaLogo },
  { name: "CBA", logo: cbaLogo },
  { name: "Westpac", logo: westpacLogo },
  { name: "NAB", logo: nabLogo },
  { name: "ANZ", logo: anzLogo },
  { name: "Macquarie", logo: macquarieLogo },
  { name: "ING", logo: ingLogo },
];

const rangeBars = [
  { name: "Athena", value: "$845k", width: "100%", tone: "dark" },
  { name: "Macquarie", value: "$812k", width: "87%", tone: "mid" },
  { name: "CBA", value: "$762k", width: "68%", tone: "gold" },
];

const featureCards = [
  {
    index: "01",
    title: "Your realistic buying range",
    body: "A property price range that includes deposit, purchase costs, LMI and lender assumptions.",
    image: affordableIcon,
  },
  {
    index: "02",
    title: "Where lender rules change your options",
    body: "The same buyer can be assessed differently when lender buffers, shading and policy settings change.",
    image: lenderIcon,
  },
  {
    index: "03",
    title: "Which inspections are worth your Saturday",
    body: "Shortlist suburbs and listings before you spend the weekend falling for places outside range.",
    image: reachIcon,
  },
  {
    index: "04",
    title: "What could move your number",
    body: "Test rate changes, expenses, income and deposit scenarios before you apply.",
    image: scenarioIcon,
  },
];

const steps = [
  {
    index: "01",
    title: "Tell us the basics",
    body: "Income, deposit, expenses and debts. No appointment needed.",
    image: pencilImage,
  },
  {
    index: "02",
    title: "We estimate your range",
    body: "FundIQ applies the kinds of checks lenders use, plus purchase-cost assumptions.",
    image: calculatorImage,
  },
  {
    index: "03",
    title: "Search with a plan",
    body: "Leave with a realistic range, key assumptions and next questions to check before applying.",
    image: backpackImage,
    featured: true,
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="br-arrow">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="br-calculator-icon">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M8 6h8" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  );
}

function CtaLink({ children, secondary = false, className = "" }) {
  return (
    <Link
      to="/assessment"
      className={`br-button${secondary ? " br-button-secondary" : ""}${className ? ` ${className}` : ""}`}
    >
      <span>{children}</span>
      {!secondary ? <ArrowIcon /> : null}
    </Link>
  );
}

function Header() {
  return (
    <header className="br-nav">
      <Link to="/" className="br-logo" aria-label="FundIQ home">
        fundiq
      </Link>
      <nav className="br-nav-links" aria-label="Primary navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#learn">Learn</a>
        <a href="#contact">Contact</a>
        <CtaLink className="br-nav-cta">
          <CalculatorIcon />
          Check my buying range
        </CtaLink>
      </nav>
    </header>
  );
}

function RangeCard() {
  return (
    <aside className="br-range-wrap" aria-label="Likely buying range example">
      <img className="br-fundora br-fundora-hero" src={fundoraImage} alt="" aria-hidden="true" />
      <div className="br-range-card">
        <div className="br-range-topline">
          <span>Your likely buying range</span>
          <span>Estimate only</span>
        </div>
        <strong className="br-range-value">$760k - $845k</strong>
        <p>Same buyer. $149k difference depending on lender policy.</p>
        <div className="br-range-bars">
          {rangeBars.map((bar) => (
            <div className="br-range-row" key={bar.name}>
              <span>{bar.name}</span>
              <div className="br-track">
                <i className={`br-fill br-fill-${bar.tone}`} style={{ width: bar.width }} />
              </div>
              <strong>{bar.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <p className="br-safe-note">
        The highest number is not always the safest number. FundIQ shows the range and assumptions so you can
        compare options more calmly.
      </p>
    </aside>
  );
}

function LenderStrip() {
  return (
    <section className="br-lender-strip" id="lenders" aria-labelledby="lender-strip-title">
      <h2 id="lender-strip-title">Compared against Australian lender rules</h2>
      <div className="br-lender-list" aria-label="Example lender panel">
        {lenders.map((lender) => (
          <span className="br-lender-chip" key={lender.name}>
            <span className="br-lender-icon">
              <img src={lender.logo} alt="" loading="lazy" />
            </span>
            {lender.name}
          </span>
        ))}
      </div>
      <p>Lender names are shown for comparison context only. FundIQ shows the range; you choose what to do next.</p>
    </section>
  );
}

function ComparisonBlock() {
  return (
    <div className="br-comparison-card" aria-label="Generic calculators compared with FundIQ">
      <div className="br-comparison-head">
        <img src={splitPathImage} alt="" aria-hidden="true" />
        <div>
          <span>Generic calculators vs FundIQ</span>
          <h3>The same buyer can get two very different answers</h3>
        </div>
        <div className="br-range-shift">
          <strong>Range shift</strong>
          <span>Lender rules can change the answer</span>
        </div>
      </div>
      <div className="br-answer-grid">
        <article>
          <div className="br-answer-title">
            <h4>Generic calculator</h4>
            <span aria-hidden="true">i</span>
          </div>
          <p>Loan-only borrowing estimate</p>
          <strong>$1.08M</strong>
          <ul>
            <li>Purchase costs can be missing</li>
            <li>Lender buffers are hidden</li>
            <li>Hard to know what to inspect</li>
          </ul>
        </article>
        <article className="br-fundiq-answer">
          <div className="br-answer-title">
            <h4>FundIQ estimate</h4>
            <span aria-hidden="true">OK</span>
          </div>
          <p>Likely buying range</p>
          <strong>$760k - $845k</strong>
          <ul>
            <li>Stamp duty and LMI included</li>
            <li>Lender rules compared</li>
            <li>Assumptions shown before you apply</li>
          </ul>
        </article>
      </div>
      <div className="br-comparison-footer">
        <strong>Before you book inspections</strong>
        <strong>Know which homes are worth your time</strong>
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="br-problem" id="learn" aria-labelledby="problem-title">
      <div className="br-problem-copy">
        <span className="br-eyebrow">The problem</span>
        <h2 id="problem-title">A borrowing number is not the same as a buying budget</h2>
        <p>
          Simple calculators can miss stamp duty, LMI, deposit limits, lender buffers and everyday expenses - the
          things that shape what you can realistically bid.
        </p>
        <div className="br-callout">
          <img src={pencilImage} alt="" aria-hidden="true" />
          <p>Open homes move fast. Know the range before you get attached, book inspections or make an offer.</p>
        </div>
      </div>
      <ComparisonBlock />
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className="br-features" aria-labelledby="features-title">
      <div className="br-section-head">
        <span className="br-eyebrow">What you'll know after the assessment</span>
        <h2 id="features-title">Walk into inspections with a realistic range</h2>
        <p>
          You get a buyer-friendly estimate that shows the assumptions, the purchase costs and where lender policy
          changes your options.
        </p>
      </div>
      <div className="br-feature-grid">
        {featureCards.map((card) => (
          <article className="br-feature-card" key={card.index}>
            <div className="br-feature-image">
              <img src={card.image} alt="" loading="lazy" />
            </div>
            <div className="br-card-copy">
              <span>{card.index}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="br-how" id="how-it-works" aria-labelledby="how-title">
      <div className="br-section-head">
        <span className="br-eyebrow">How it works</span>
        <h2 id="how-title">Three steps to a range you can use</h2>
      </div>
      <div className="br-step-grid">
        {steps.map((step) => (
          <article className={`br-step-card${step.featured ? " br-step-card-featured" : ""}`} key={step.index}>
            <img src={step.image} alt="" />
            <span>{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
      <div className="br-result-strip" aria-label="Example likely buying range inclusions">
        <div>
          <span>Likely buying range</span>
          <strong>$760k - $845k</strong>
        </div>
        <ul>
          <li>Stamp duty included</li>
          <li>LMI checked</li>
          <li>Lender policy range</li>
          <li>Repayment stress test</li>
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="br-footer" id="contact">
      <section className="br-final-cta" aria-labelledby="final-cta-title">
        <img className="br-fundora" src={fundoraImage} alt="" aria-hidden="true" />
        <div>
          <h2 id="final-cta-title">Check your buying range before the next inspection</h2>
          <p>Private estimate. No broker call unless you ask. No credit enquiry needed.</p>
          <CtaLink>Check my buying range</CtaLink>
        </div>
      </section>
      <div className="br-footer-inner">
        <div className="br-footer-brand">
          <Link to="/" className="br-logo" aria-label="FundIQ home">
            fundiq
          </Link>
          <p>A private estimate for buyers before they apply.</p>
          <p>&copy; 2026 fundiq Pty Ltd</p>
        </div>
        <nav className="br-footer-links" aria-label="Footer navigation">
          <div>
            <strong>Product</strong>
            <a href="#top">Calculator</a>
            <a href="#how-it-works">How it works</a>
            <a href="#learn">Learn</a>
            <a href="#lenders">Lender panel</a>
          </div>
          <div>
            <strong>Company</strong>
            <a href="#contact">About us</a>
            <a href="#contact">Careers</a>
            <a href="#contact">Press</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="#contact">Privacy policy</a>
            <a href="#contact">Terms of service</a>
            <a href="#contact">Credit guide</a>
            <a href="#contact">Disclosures</a>
          </div>
        </nav>
        <p className="br-disclaimer">
          FundIQ estimates are general information only and do not constitute a credit decision, financial advice or a
          loan application. Results depend on the assumptions provided and lender assessment settings.
        </p>
      </div>
    </footer>
  );
}

function BuyingRangePage() {
  return (
    <div className="buying-range-page" id="top">
      <Header />
      <main>
        <section className="br-hero" aria-labelledby="hero-title">
          <div className="br-hero-copy">
            <div className="br-trust-chips" aria-label="Privacy and application reassurance">
              <span>Private estimate</span>
              <span>No broker call unless you ask</span>
              <span>Not a loan application</span>
              <span>No credit enquiry needed</span>
            </div>
            <h1 id="hero-title">Know your buying range before the inspection</h1>
            <p>
              See which homes are realistically worth inspecting, with stamp duty, LMI, deposit limits and lender rules
              already factored in.
            </p>
            <div className="br-hero-actions">
              <CtaLink>Check my buying range</CtaLink>
              <a className="br-button br-button-secondary" href="#how-it-works">
                See how it works
              </a>
            </div>
          </div>
          <RangeCard />
        </section>
        <LenderStrip />
        <ProblemSection />
        <FeatureGrid />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default BuyingRangePage;
