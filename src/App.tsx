import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import CompanyAdminDashboard from "./pages/dashboard/CompanyAdminDashboard";
import MainLayout from "./components/layout/MainLayout";
import RolesPage from "./pages/roles/RolesPage";
import AddRolePage from "./pages/roles/AddRolePage";
import RoleDetailsPage from "./pages/roles/RoleDetailsPage";
import RoleEditPage from "./pages/roles/RoleEditPage";
import RolePermissionsPage from "./pages/roles/RolePermissionsPage";
import PermissionGroupsPage from "./pages/roles/PermissionGroupsPage";

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
        <Route
          path="/roles/edit/:roleId"
          element={
            <MainLayout>
              <RoleEditPage />
            </MainLayout>
          }
        />
        <Route
          path="/roles/permissions/:roleId"
          element={
            <MainLayout>
              <RolePermissionsPage />
            </MainLayout>
          }
        />
        <Route
          path="/roles/permission-groups"
          element={
            <MainLayout>
              <PermissionGroupsPage />
            </MainLayout>
          }
        />
        <Route
          path="/roles/:roleId"
          element={
            <MainLayout>
              <RoleDetailsPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
