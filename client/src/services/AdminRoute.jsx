import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const userRole = useSelector((state) => state.auth?.user?.role);

  if (isLoggedIn && userRole === "admin") {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
}

export default AdminRoute;
