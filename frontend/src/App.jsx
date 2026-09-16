import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddStation from "./pages/AddStation";
import Login from "./pages/Login";
import StationDetails from "./pages/StationDetails";
import StationList from "./pages/StationList";

export default function App() {
  return (
    <Routes>
      {/* Login is the default screen */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Everything below requires login */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/stations" element={<StationList />} />
          <Route path="/stations/add" element={<AddStation />} />
          <Route path="/stations/:id" element={<StationDetails />} />
        </Route>
      </Route>

      {/* Unknown URLs go back to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}