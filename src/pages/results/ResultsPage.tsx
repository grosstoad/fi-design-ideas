// Spec: results-page-spec.md §4.1 (route shell)
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./results.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LenderList } from "./components/LenderList";
import { ListSkeleton, StatePanel } from "./components/PageStates";
import { createFixtureEngine } from "./engine/fixtureEngine";
import { useResults } from "./hooks/useResults";
import { copy } from "./lib/copy";

const engine = createFixtureEngine({ delayMs: 450 });

export default function ResultsPage() {
  const [params, setParams] = useSearchParams();
  const [announcement, setAnnouncement] = useState("");
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState<"save" | "update" | null>(null);
  const results = useResults(engine);

  const selectedId = params.get("lender");
  const defaultSelectedId = results.sortedLenders[0]?.id ?? null;
  const selected = useMemo(() => {
    return results.sortedLenders.find((lender) => lender.id === selectedId) ?? results.sortedLenders[0] ?? null;
  }, [results.sortedLenders, selectedId]);

  useEffect(() => {
    if (!defaultSelectedId) return;
    if (!selectedId || !results.sortedLenders.some((lender) => lender.id === selectedId)) {
      setParams({ lender: defaultSelectedId }, { replace: true });
    }
  }, [defaultSelectedId, results.sortedLenders, selectedId, setParams]);

  function selectLender(id: string) {
    const lender = results.sortedLenders.find((item) => item.id === id);
    setParams({ lender: id });
    if (lender) setAnnouncement(copy.list.announcement(lender.name, lender.product));
  }

  return (
    <div className="rp-page">
      <div className="rp-shell">
        <Header onSaveExit={() => setUtilityOpen("save")} />
        <main className="rp-main">
          <Hero leader={results.maxPriceLeader} asAt={results.asAt} loading={results.status === "loading"} onExplain={() => setExplainerOpen(true)} />
          <div className="rp-grid">
            {results.status === "loading" ? (
              <ListSkeleton />
            ) : results.status === "error" ? (
              <StatePanel kind="error" onRetry={results.retry} onUpdate={() => setUtilityOpen("update")} />
            ) : results.status === "empty" ? (
              <StatePanel kind="empty" onUpdate={() => setUtilityOpen("update")} />
            ) : (
              <LenderList
                lenders={results.sortedLenders}
                leader={results.maxPriceLeader}
                selectedId={selected?.id ?? null}
                sortBy={results.sortBy}
                isRecalculating={results.status === "recalculating"}
                partialFailures={results.partialFailures}
                onSelect={selectLender}
                onSortChange={results.setSortBy}
              />
            )}
            <aside className="rp-detail-placeholder" aria-live="polite">
              <h2>{selected ? `${selected.name} ${selected.product}` : copy.card.selected}</h2>
              <p>{results.status === "recalculating" ? copy.loading.checking(results.lenders.length) : "Detail card lands in milestone 3."}</p>
            </aside>
          </div>
          <div className="rp-live" aria-live="polite">
            {announcement}
          </div>
        </main>
      </div>
      {explainerOpen ? (
        <div className="rp-utility-dialog" role="dialog" aria-modal="true" aria-label="How we estimate">
          <button type="button" className="rp-dialog-scrim" aria-label={copy.update.cancel} onClick={() => setExplainerOpen(false)} />
          <div className="rp-dialog-panel">
            <h2>How we estimate</h2>
            <p>{copy.hero.explainer}</p>
            <p>{copy.hero.comparisonWarning}</p>
            <button type="button" className="rp-primary-small" onClick={() => setExplainerOpen(false)}>
              {copy.update.back}
            </button>
          </div>
        </div>
      ) : null}
      {utilityOpen ? (
        <div className="rp-toast" role="status">
          {utilityOpen === "save" ? copy.saveExit.success : copy.update.title}
          <button type="button" onClick={() => setUtilityOpen(null)}>
            {copy.update.cancel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
