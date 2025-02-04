import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PublicRoute = ({ element }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/profile" />;
  }
  return element;
};

export default PublicRoute;
