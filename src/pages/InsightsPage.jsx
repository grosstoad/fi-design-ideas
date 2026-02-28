import { Link } from "react-router-dom";
import BorrowingPowerCard from "../components/BorrowingPowerCard";
import LendingTable from "../components/LendingTable";

function InsightsPage() {
  return (
    <div className="fundiq-page insights-page">
      <nav className="top-nav insights-nav">
        <Link className="mono brand" to="/">
          [ FUNDIQ ]
        </Link>
        <div className="top-actions">
          <span className="mono system-copy">INTELLIGENCE VIEW // BORROWING POWER</span>
          <Link className="btn-primary" to="/">
            Return Home
          </Link>
        </div>
      </nav>

      <main className="insights-main">
        <section className="insights-hero">
          <div className="section-cap mono">
            <span>[ BORROWING POWER ANALYTICS ]</span>
            <div className="section-line" />
            <span>MORTGAGE FIT EXPLAINED</span>
          </div>
          <h1>
            Deeper borrowing
            <br />
            power intelligence.
          </h1>
          <p>
            This route keeps the updated borrowing-power card as a reusable component, then extends it with the
            full lender table for deeper decision support.
          </p>
        </section>

        <section className="insights-layout">
          <BorrowingPowerCard showAction={false} />
          <aside className="insights-note-box">
            <div className="mono insights-note-title">PROFILE SIGNALS</div>
            <div className="insights-note-grid">
              <div>
                <h3>Max likely range</h3>
                <p>A$2.26M - A$2.52M across high-confidence lender tiers.</p>
              </div>
              <div>
                <h3>Fastest high-fit lever</h3>
                <p>Closing revolving debt can meaningfully increase approval headroom.</p>
              </div>
              <div>
                <h3>Recommended next move</h3>
                <p>Request pre-approval from top two lender tiers to lock current capacity.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="insights-table-wrap">
          <LendingTable />
        </section>
      </main>
    </div>
  );
}

export default InsightsPage;
