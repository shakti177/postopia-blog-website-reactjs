import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchUserProfle,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/userServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialAuth = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const userProfile = await fetchUserProfle(accessToken);
          setUser(userProfile.data);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch user profile");
          setError("Failed to fetch user profile");
          logout();
        }
      }
      setLoading(false);
    };
    initialAuth();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await registerUser(userData);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logoutUser(refreshToken);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to logout");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
