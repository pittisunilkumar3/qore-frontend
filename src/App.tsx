import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import CompanyAdminDashboard from "./pages/dashboard/CompanyAdminDashboard";
import MainLayout from "./components/layout/MainLayout";
import RolesPage from "./pages/roles/RolesPage";
import AddRolePage from "./pages/roles/AddRolePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <CompanyAdminDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/roles"
          element={
            <MainLayout>
              <RolesPage />
            </MainLayout>
          }
        />
        <Route
          path="/roles/add"
          element={
            <MainLayout>
              <AddRolePage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
