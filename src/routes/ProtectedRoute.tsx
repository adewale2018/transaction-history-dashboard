import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // Check for token in localStorage

  if (!token) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return <>{children}</>;
};

export default ProtectedRoute;
