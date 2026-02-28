import { Navigate, Route, Routes } from "react-router-dom";
import FundIqPage from "./pages/FundIqPage";
import InsightsPage from "./pages/InsightsPage";
import AssessmentPage from "./pages/AssessmentPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FundIqPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
