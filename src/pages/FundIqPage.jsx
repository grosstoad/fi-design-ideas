import { Link } from "react-router-dom";
import ArcGauge from "../components/ArcGauge";
import BorrowingPowerCard from "../components/BorrowingPowerCard";
import BridgeBenefitGrid from "../components/BridgeBenefitGrid";
import LendingTable from "../components/LendingTable";

function FundIqPage() {
  return (
    <div className="fundiq-page">
      <nav className="top-nav">
        <div className="mono brand">[ FUNDIQ ]</div>
        <div className="top-actions">
          <span className="mono system-copy">SYSTEM: PRE-APPROVAL ENGINE v4.1</span>
          <Link className="btn-primary" to="/insights">
            Access Intelligence
          </Link>
        </div>
      </nav>

      <header className="hero-shell">
        <div className="hero-inner">
          <div className="hero-arc fade-in-up" style={{ animationDelay: "0.2s" }}>
            <ArcGauge />
          </div>

          <div className="hero-grid fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <h1 className="hero-title">
                Homebuying.
                <br />
                Quantified.
              </h1>
            </div>
            <div className="hero-summary">
              <p>
                FundIQ acts as the essential intelligence layer, translating complex market data into clear
                borrowing power for buyers and brokers.
              </p>
              <div className="mono scroll-copy">SCROLL TO ANALYZE LENDING TIERS v</div>
            </div>
          </div>
        </div>

        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />
      </header>

      <main className="main-content">
        <section className="content-section border-top">
          <div className="section-inner">
            <div className="section-cap mono">
              <span>[ 01 ]</span>
              <div className="section-line" />
              <span>LENDING INTELLIGENCE</span>
            </div>

            <div className="split-heading">
              <h2>
                Actionable
                <br />
                Loan Limits.
              </h2>
              <p>
                Real-time calculations of fundability across top-tier brokers, eliminating guesswork from the
                search process.
              </p>
            </div>

            <LendingTable />

            <div className="example-wrap">
              <div className="section-cap mono">
                <span>[ EXAMPLE OUTPUT ]</span>
                <div className="section-line" />
                <span>WHAT YOU CAN FIND OUT WITH YOUR BORROWING POWER</span>
              </div>
              <BorrowingPowerCard />
            </div>
          </div>
        </section>

        <section className="content-section border-top">
          <div className="section-inner">
            <div className="section-cap mono">
              <span>[ 02 ]</span>
              <div className="section-line" />
              <span>THE BRIDGE ARCHITECTURE</span>
            </div>

            <div className="split-heading">
              <h2>
                Precision for buyers.
                <br />
                Efficiency for brokers.
              </h2>
              <p>
                FundIQ streamlines the path to ownership by aligning financial readiness with lender requirements
                through advanced data synthesis.
              </p>
            </div>

            <BridgeBenefitGrid />
          </div>
        </section>

        <footer className="site-footer border-top">
          <div className="footer-cta border-bottom">
            <div>
              <div className="mono footer-kicker">[ SECURE YOUR FUTURE ]</div>
              <h2>
                Bridge the
                <br />
                funding gap.
              </h2>
            </div>
            <div className="footer-actions">
              <Link className="btn-primary" to="/assessment">
                Start Assessment
              </Link>
              <span className="mono footer-note">
                VERIFIED INTELLIGENCE // ISO 27001 CERTIFIED DATA SECURITY
              </span>
            </div>
          </div>

          <div className="footer-legal border-top">
            <span className="mono">(c) 2024 FUNDIQ TECHNOLOGIES. BUILT FOR PRECISION.</span>
            <span className="mono">
              [ ENGINE V4.1.0 ] // NOT FINANCIAL ADVICE. LENDING TERMS SUBJECT TO VERIFICATION.
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default FundIqPage;
