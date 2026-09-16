// Simple client-side authentication for the lab exam.
// Credentials are intentionally hardcoded because the exam requires it.

export const USERNAME = "cafe_admin";
export const PASSWORD = "pccafe2026";

export function isAuthenticated() {
  return sessionStorage.getItem("cafe_auth") === "true";
}

export function login(username, password) {
  if (username === USERNAME && password === PASSWORD) {
    sessionStorage.setItem("cafe_auth", "true");
    return true;
  }

  return false;
}

export function logout() {
  sessionStorage.removeItem("cafe_auth");
}