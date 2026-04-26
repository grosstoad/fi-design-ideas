import { Link } from "react-router-dom";
import InstagramAffordabilityCard from "../components/InstagramAffordabilityCard";
import AssessmentInsightExperiments from "../components/AssessmentInsightExperiments";

function AssessmentPage() {
  return (
    <div className="fundiq-page assessment-page">
      <nav className="top-nav insights-nav">
        <Link className="mono brand" to="/">
          [ FUNDIQ ]
        </Link>
        <div className="top-actions">
          <span className="mono system-copy">SHARE CARD // PERSONAL SNAPSHOT</span>
          <Link className="btn-primary" to="/insights">
            View Full Insights
          </Link>
        </div>
      </nav>

      <main className="assessment-main">
        <section className="assessment-intro">
          <div className="section-cap mono">
            <span>[ PERSONAL SHARE CARD ]</span>
            <div className="section-line" />
            <span>INSTAGRAM-READY BORROWING POWER SNAPSHOT</span>
          </div>
          <h1>
            My Homebuying
            <br />
            Reach Snapshot.
          </h1>
          <p>
            A share-ready card concept that highlights maximum borrowing power, top lender fit, and property reach in
            your state.
          </p>
        </section>

        <section className="assessment-card-wrap">
          <InstagramAffordabilityCard />
        </section>

        <section className="assessment-experiments">
          <div className="section-cap mono">
            <span>[ EXPERIMENTAL VISUALS ]</span>
            <div className="section-line" />
            <span>ALTERNATE WAYS TO COMMUNICATE BORROWING POWER</span>
          </div>

          <div className="split-heading assessment-experiment-heading">
            <h2>
              More ways to read
              <br />
              your borrowing edge.
            </h2>
            <p>
              Concept visuals designed to compare sensitivity, surface strategic actions, and explain how borrowing
              confidence evolves over time.
            </p>
          </div>

          <AssessmentInsightExperiments />
        </section>
      </main>
    </div>
  );
}

export default AssessmentPage;
