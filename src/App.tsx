import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import CompanyAdminDashboard from "./pages/dashboard/CompanyAdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <CompanyAdminDashboard />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
