import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FundIqPage from "./pages/FundIqPage";
import InsightsPage from "./pages/InsightsPage";
import AssessmentPage from "./pages/AssessmentPage";
import "./dashboard-comparison.css";

const LibraryComparisonPage = lazy(() => import("./pages/LibraryComparisonPage"));
const RechartsDashboardPage = lazy(() => import("./pages/recharts-dashboard"));
const PolarisVizDashboardPage = lazy(() => import("./pages/polaris-viz-dashboard"));
const FundIqChartsComparisonPage = lazy(() => import("./pages/FundIqChartsComparisonPage"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<FundIqPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/comparison" element={<FundIqChartsComparisonPage />} />
        <Route path="/comparison/lending-analytics" element={<LibraryComparisonPage />} />
        <Route path="/comparison/recharts" element={<RechartsDashboardPage />} />
        <Route path="/comparison/polaris" element={<PolarisVizDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
