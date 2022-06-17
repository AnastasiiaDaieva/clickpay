import { Navigate } from "react-router-dom";

export function RequireAuth({
  children,
  redirectTo = "/",
  errorCode,
  setCurrentUser,
  setErrorCode,
}) {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));
  // if (errorCode === 401) {
  //   setErrorCode(null);
  //   setCurrentUser("");
  //   localStorage.setItem("user", JSON.stringify(""));
  // }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export function GeneralAccess({ children, redirectTo = "/" }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));

  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}
