import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PublicRoute = ({ element: Component }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div class="w-14 h-14 border-8 border-solid border-gray-200 dark:border-neutral-600 border-r-blue-800 dark:border-r-white rounded-full animate-spin"></div>
      </div>
    );
  }
  return user ? <Navigate to="/profile" /> : <Component />;
};

export default PublicRoute;
