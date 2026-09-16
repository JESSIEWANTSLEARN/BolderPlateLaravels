import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth";

export default function ProtectedRoute() {
  // Block every protected route if the user is not logged in
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}