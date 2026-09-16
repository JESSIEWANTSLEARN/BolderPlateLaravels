import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../auth";

export default function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Computer Cafe Station Manager</h1>
          <p>Administrator Panel</p>
        </div>

        <button className="secondary-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <nav className="nav-tabs">
        <NavLink
          to="/stations"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Station List
        </NavLink>

        <NavLink
          to="/stations/add"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Station
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}