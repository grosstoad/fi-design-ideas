// Spec: results-page-spec.md §4.1 (route shell)
import "./results.css";
import { createFixtureEngine } from "./engine/fixtureEngine";
import { DEFAULT_SCENARIO } from "./engine/fixtures";

const engine = createFixtureEngine({ delayMs: 0 });

export default function ResultsPage() {
  void engine.calculate(DEFAULT_SCENARIO);

  return (
    <div className="rp-page">
      <div className="rp-shell">
        <main className="rp-main">
          <div className="rp-blank">Results prototype scaffold</div>
        </main>
      </div>
    </div>
  );
}
