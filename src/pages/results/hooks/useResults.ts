// Spec: results-page-implementation-guide.md §2.4 (state model)
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_SCENARIO } from "../engine/fixtures";
import type { EngineResult, LenderResult, Scenario, ServiceabilityEngine } from "../engine/types";

export type ResultsStatus = "loading" | "ready" | "recalculating" | "empty" | "error";
export type SortKey = "maxPrice" | "monthlyRepayment" | "rate" | "comparisonRate" | "maxLoan" | "lvr" | "funds";

const STORAGE_KEY = "fundiq:results:v1";

interface PersistedState {
  scenario: Scenario;
  sortBy: SortKey;
}

function readPersisted(): PersistedState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { scenario: DEFAULT_SCENARIO, sortBy: "maxPrice", ...JSON.parse(raw) } : { scenario: DEFAULT_SCENARIO, sortBy: "maxPrice" };
  } catch {
    return { scenario: DEFAULT_SCENARIO, sortBy: "maxPrice" };
  }
}

function sortValue(lender: LenderResult, sortBy: SortKey) {
  if (sortBy === "funds") return lender.funds.cashToSettle;
  if (sortBy === "comparisonRate") return lender.comparisonRate ?? Number.POSITIVE_INFINITY;
  return lender[sortBy];
}

function sortLenders(lenders: LenderResult[], sortBy: SortKey) {
  const direction = sortBy === "monthlyRepayment" || sortBy === "rate" || sortBy === "comparisonRate" || sortBy === "funds" ? 1 : -1;
  return [...lenders].sort((a, b) => {
    const av = sortValue(a, sortBy);
    const bv = sortValue(b, sortBy);
    if (av === bv) return b.maxPrice - a.maxPrice;
    return (av - bv) * direction;
  });
}

export function useResults(engine: ServiceabilityEngine) {
  const persisted = useMemo(readPersisted, []);
  const [scenario, setScenario] = useState(persisted.scenario);
  const [sortBy, setSortBy] = useState<SortKey>(persisted.sortBy);
  const [status, setStatus] = useState<ResultsStatus>("loading");
  const [result, setResult] = useState<EngineResult | null>(null);
  const [error, setError] = useState("");
  const sequence = useRef(0);

  const runCalculation = useCallback(
    async (nextScenario: Scenario, nextStatus: ResultsStatus = "loading") => {
      const seq = sequence.current + 1;
      sequence.current = seq;
      setStatus(nextStatus);
      setError("");
      try {
        const next = await engine.calculate(nextScenario);
        if (seq !== sequence.current) return;
        setResult(next);
        setStatus(next.lenders.length > 0 ? "ready" : "empty");
      } catch (err) {
        if (seq !== sequence.current) return;
        setError(err instanceof Error ? err.message : "Unknown error");
        setStatus("error");
      }
    },
    [engine],
  );

  useEffect(() => {
    void runCalculation(scenario, "loading");
  }, [runCalculation, scenario]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ scenario, sortBy }));
  }, [scenario, sortBy]);

  const lenders = result?.lenders ?? [];
  const sortedLenders = useMemo(() => sortLenders(lenders, sortBy), [lenders, sortBy]);
  const maxPriceLeader = useMemo(() => sortLenders(lenders, "maxPrice")[0] ?? null, [lenders]);

  const saveScenario = useCallback(
    async (nextScenario: Scenario) => {
      setScenario(nextScenario);
      await runCalculation(nextScenario, "recalculating");
    },
    [runCalculation],
  );

  return {
    asAt: result?.asAt ?? "",
    error,
    lenders,
    maxPriceLeader,
    partialFailures: result?.partialFailures ?? 0,
    retry: () => runCalculation(scenario, "loading"),
    saveScenario,
    scenario,
    setSortBy,
    sortBy,
    sortedLenders,
    status,
  };
}
