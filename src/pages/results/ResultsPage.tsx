// Spec: results-page-spec.md §4.1 (route shell)
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./results.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LenderDetail } from "./components/LenderDetail";
import { LenderList } from "./components/LenderList";
import { ListSkeleton, StatePanel } from "./components/PageStates";
import { UpdateDetailsOverlay } from "./components/UpdateDetailsOverlay";
import type { UpdateDetailsStep } from "./components/UpdateDetailsOverlay";
import { BottomSheet } from "./components/BottomSheet";
import { Dock } from "./components/Dock";
import { BrokerOverlay } from "./components/BrokerOverlay";
import { createFixtureEngine } from "./engine/fixtureEngine";
import { useResults } from "./hooks/useResults";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { copy } from "./lib/copy";
import { StatesGallery } from "./dev/StatesGallery";

const engine = createFixtureEngine({ delayMs: 450 });

export default function ResultsPage() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const [announcement, setAnnouncement] = useState("");
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState<"save" | "update" | null>(null);
  const [updateStep, setUpdateStep] = useState<UpdateDetailsStep | null>(null);
  const [brokerOpen, setBrokerOpen] = useState(false);
  const [brokerSubmitted, setBrokerSubmitted] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const results = useResults(engine);

  if (location.pathname.endsWith("/dev-states")) {
    return <StatesGallery />;
  }

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
    if (isMobile) setMobileDetailOpen(true);
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
              <StatePanel kind="error" onRetry={results.retry} onUpdate={() => setUpdateStep("chooser")} />
            ) : results.status === "empty" ? (
              <StatePanel kind="empty" onUpdate={() => setUpdateStep("chooser")} />
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
            {selected && results.maxPriceLeader ? (
              <LenderDetail
                lender={selected}
                leader={results.maxPriceLeader}
                scenario={results.scenario}
                sortBy={results.sortBy}
                submitted={brokerSubmitted}
                onBroker={() => setBrokerOpen(true)}
                onUpdate={() => setUpdateStep("chooser")}
                onUpdateLoan={() => setUpdateStep("loan")}
              />
            ) : (
              <aside className="rp-detail-placeholder" aria-live="polite">
                <h2>{copy.card.selected}</h2>
                <p>{copy.loading.checking(8)}</p>
              </aside>
            )}
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
      {isMobile && selected && results.maxPriceLeader && mobileDetailOpen ? (
        <BottomSheet title={`${selected.name} ${selected.product}`} onClose={() => setMobileDetailOpen(false)}>
          <LenderDetail
            lender={selected}
            leader={results.maxPriceLeader}
            scenario={results.scenario}
            sortBy={results.sortBy}
            submitted={brokerSubmitted}
            onBroker={() => setBrokerOpen(true)}
            onUpdate={() => setUpdateStep("chooser")}
            onUpdateLoan={() => setUpdateStep("loan")}
          />
        </BottomSheet>
      ) : null}
      {isMobile ? (
        <Dock
          empty={results.status === "empty"}
          submitted={brokerSubmitted}
          hidden={Boolean(updateStep) || brokerOpen || Boolean(utilityOpen) || mobileDetailOpen || explainerOpen}
          onBroker={() => setBrokerOpen(true)}
          onUpdate={() => setUpdateStep("chooser")}
        />
      ) : null}
      {brokerOpen ? (
        <BrokerOverlay
          lenders={results.lenders}
          selected={selected}
          submitted={brokerSubmitted}
          onSubmitted={() => setBrokerSubmitted(true)}
          onClose={() => setBrokerOpen(false)}
        />
      ) : null}
      {updateStep ? <UpdateDetailsOverlay scenario={results.scenario} initialStep={updateStep} onClose={() => setUpdateStep(null)} onSave={results.saveScenario} /> : null}
    </div>
  );
}
