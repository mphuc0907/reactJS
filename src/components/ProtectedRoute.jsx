import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}
