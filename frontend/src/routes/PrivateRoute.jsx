import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="size-16 rounded-full border-[10px] border-gray-300 border-r-blue-800 dark:border-neutral-200 dark:border-r-neutral-700 animate-spin"></div>
      </div>
    );

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
