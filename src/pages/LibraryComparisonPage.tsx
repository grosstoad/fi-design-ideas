import { Link } from "react-router-dom";
import { ComparisonPageShell } from "../components/dashboard-comparison/shared";
import PolarisVizDashboardPage from "./polaris-viz-dashboard";
import RechartsDashboardPage from "./recharts-dashboard";

export default function LibraryComparisonPage() {
  return (
    <ComparisonPageShell>
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
          Route shortcuts: <code>/comparison/lending-analytics</code>,{" "}
          <code>/comparison/recharts</code>, <code>/comparison/polaris</code>
        </p>
        <Link
          to="/"
          style={{
            fontSize: 12,
            color: "#111827",
            textDecoration: "none",
            border: "1px solid #e8e8e8",
            borderRadius: 999,
            padding: "8px 12px",
            background: "#fff",
          }}
        >
          Back to FundIQ
        </Link>
      </div>
      <RechartsDashboardPage />
      <PolarisVizDashboardPage />
    </ComparisonPageShell>
  );
}
