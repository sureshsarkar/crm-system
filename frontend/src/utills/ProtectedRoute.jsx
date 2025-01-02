import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // Redirect to login if user is not authenticated
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
