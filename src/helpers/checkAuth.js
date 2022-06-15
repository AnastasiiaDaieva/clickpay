import { Navigate } from "react-router-dom";

export function RequireAuth({ children, redirectTo = "/" }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));
  console.log("isauthREQ", isAuthenticated);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export function GeneralAccess({ children, redirectTo = "/" }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));
  console.log("isauthGEN", isAuthenticated);

  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}
