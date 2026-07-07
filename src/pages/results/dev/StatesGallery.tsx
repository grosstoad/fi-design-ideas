// Spec: results-page-implementation-guide.md §5.3 (states gallery)
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { BrokerOverlay } from "../components/BrokerOverlay";
import { Hero } from "../components/Hero";
import { LenderDetail } from "../components/LenderDetail";
import { LenderList } from "../components/LenderList";
import { ListSkeleton, StatePanel } from "../components/PageStates";
import { UpdateDetailsOverlay } from "../components/UpdateDetailsOverlay";
import { createFixtureEngine } from "../engine/fixtureEngine";
import { DEFAULT_SCENARIO } from "../engine/fixtures";
import type { EngineResult } from "../engine/types";

function Cell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rp-gallery-cell">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function StatesGallery() {
  const [healthy, setHealthy] = useState<EngineResult | null>(null);
  const [partial, setPartial] = useState<EngineResult | null>(null);
  const [shortfall, setShortfall] = useState<EngineResult | null>(null);

  useEffect(() => {
    void createFixtureEngine().calculate(DEFAULT_SCENARIO).then(setHealthy);
    void createFixtureEngine({ mode: "partial" }).calculate(DEFAULT_SCENARIO).then(setPartial);
    void createFixtureEngine({ mode: "shortfall" }).calculate({ ...DEFAULT_SCENARIO, savings: 120000 }).then(setShortfall);
  }, []);

  const first = healthy?.lenders[0] ?? null;
  const second = healthy?.lenders[1] ?? null;

  return (
    <div className="rp-page">
      <main className="rp-gallery">
        <header>
          <h1>Results states gallery</h1>
          <p>Fixture-only review surface for loading, default, sorted, edit, funds, broker, empty, error, partial, shortfall, and reduced-motion states.</p>
        </header>
        <div className="rp-gallery-grid">
          <Cell title="Loading staged">
            <Hero leader={null} asAt="" loading onExplain={() => undefined} />
            <ListSkeleton />
          </Cell>
          {healthy && first ? (
            <Cell title="Default">
              <Hero leader={first} asAt={healthy.asAt} onExplain={() => undefined} />
              <LenderList
                lenders={healthy.lenders}
                leader={first}
                selectedId={first.id}
                sortBy="maxPrice"
                onSelect={() => undefined}
                onSortChange={() => undefined}
              />
            </Cell>
          ) : null}
          {healthy && first ? (
            <Cell title="Selected detail + funds">
              <LenderDetail lender={first} leader={first} scenario={DEFAULT_SCENARIO} sortBy="maxPrice" onBroker={() => undefined} onUpdate={() => undefined} />
            </Cell>
          ) : null}
          {healthy && first && second ? (
            <Cell title="Sorted + compare footer">
              <LenderDetail lender={second} leader={first} scenario={DEFAULT_SCENARIO} sortBy="monthlyRepayment" onBroker={() => undefined} onUpdate={() => undefined} />
            </Cell>
          ) : null}
          <Cell title="Update details chooser">
            <UpdateDetailsOverlay scenario={DEFAULT_SCENARIO} onClose={() => undefined} onSave={async () => undefined} />
          </Cell>
          {healthy && first ? (
            <Cell title="Broker form">
              <BrokerOverlay lenders={healthy.lenders} selected={first} submitted={false} onSubmitted={() => undefined} onClose={() => undefined} />
            </Cell>
          ) : null}
          {healthy && first ? (
            <Cell title="Broker success">
              <BrokerOverlay lenders={healthy.lenders} selected={first} submitted onSubmitted={() => undefined} onClose={() => undefined} />
            </Cell>
          ) : null}
          <Cell title="Empty">
            <StatePanel kind="empty" onUpdate={() => undefined} />
          </Cell>
          <Cell title="Error">
            <StatePanel kind="error" onRetry={() => undefined} onUpdate={() => undefined} />
          </Cell>
          {partial && first ? (
            <Cell title="Partial">
              <LenderList
                lenders={partial.lenders}
                leader={partial.lenders[0]}
                selectedId={partial.lenders[0].id}
                sortBy="maxPrice"
                partialFailures={partial.partialFailures}
                onSelect={() => undefined}
                onSortChange={() => undefined}
              />
            </Cell>
          ) : null}
          {shortfall && shortfall.lenders[0] ? (
            <Cell title="Shortfall funds">
              <LenderDetail
                lender={shortfall.lenders[0]}
                leader={shortfall.lenders[0]}
                scenario={{ ...DEFAULT_SCENARIO, savings: 120000 }}
                sortBy="maxPrice"
                onBroker={() => undefined}
                onUpdate={() => undefined}
              />
            </Cell>
          ) : null}
          {healthy && first ? (
            <Cell title="Reduced motion">
              <div className="rp-reduced-preview">
                <LenderDetail lender={first} leader={first} scenario={DEFAULT_SCENARIO} sortBy="maxPrice" onBroker={() => undefined} onUpdate={() => undefined} />
              </div>
            </Cell>
          ) : null}
        </div>
      </main>
    </div>
  );
}
