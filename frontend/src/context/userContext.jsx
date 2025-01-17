import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { updateUser } from "../api/userServices";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserProfile = async (userData) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await updateUser(userData, accessToken);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserProfile = async () => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await deleteUser(accessToken);
      setUser(null);
      localStorage.clear();
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadUserProfilePicture = async (formData) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await uploadAvatar(accessToken, formData);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <userContext.Provider
      value={{
        updateUserProfile,
        deleteUserProfile,
        uploadUserProfilePicture,
        loading,
        error,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
