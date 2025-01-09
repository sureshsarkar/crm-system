import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {


  const isLoggedIn = localStorage.getItem("user"); // Check if user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return children;


  // const { currentUser } = useContext(AuthContext);

  // // Redirect to login if user is not authenticated
  // return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
