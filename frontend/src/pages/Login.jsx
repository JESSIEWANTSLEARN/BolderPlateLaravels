import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "../auth";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, go directly to the station list
  if (isAuthenticated()) {
    return <Navigate to="/stations" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    // Inline validation - no alert()
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (!login(username.trim(), password)) {
      setError("Invalid username or password.");
      return;
    }

    navigate("/stations", { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-icon">PC</div>

        <h1>Computer Cafe Login</h1>
        <p>Sign in as administrator to manage rental stations.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>

          {error && <p className="inline-error">{error}</p>}

          <button className="primary-button full-width" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}