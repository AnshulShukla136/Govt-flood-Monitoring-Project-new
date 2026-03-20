import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DashboardLayout from "./layouts/Dashboardlayout";
import MainDashboard from "./pages/dashboard/MainDashboard";
import Upload from "./pages/dashboard/Upload";
import DataList from "./pages/dashboard/DataList.jsx";
import Analytics from "./pages/dashboard/Analytics";
import Alerts from "./pages/dashboard/Alerts";
import MapPage from "./pages/dashboard/MapPage";

export default function App() {
  return (
    <Routes>

      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Secure Dashboard Section */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/data" element={<DataList />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/map" element={<MapPage />} />
      </Route>

    </Routes>
  );
}
