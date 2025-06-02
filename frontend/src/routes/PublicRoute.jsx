import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="size-16 rounded-full border-[10px] border-gray-300 border-r-blue-800 dark:border-neutral-200 dark:border-r-neutral-700 animate-spin"></div>
      </div>
    );

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
