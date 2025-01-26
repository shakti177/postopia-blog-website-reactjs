import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { deleteUser, updateUser, uploadAvatar } from "../api/userServices";

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadUserAvatar = async (formData) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await uploadAvatar(accessToken, formData);
      console.log(response);
      if (response.data) {
        setUser((user) => ({
          ...user,
          profilePicture: response.data.profilePicture,
        }));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <userContext.Provider
      value={{
        user,
        loading,
        error,
        updateUserProfile,
        deleteUserProfile,
        uploadUserAvatar,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
