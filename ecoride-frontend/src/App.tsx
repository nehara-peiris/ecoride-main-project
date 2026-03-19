import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import VehiclesPage from "./pages/VehiclesPage";
import MaintenancePage from "./pages/MaintenancePage";

export default function App() {
  return (
    <div style={{ background: "#f4f7fb", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          {/* default route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* modules */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Routes>
      </div>
    </div>
  );
}