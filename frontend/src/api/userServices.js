import API from "./axios";

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchUserProfile = async (accessToken) => {
  try {
    const response = await API.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutUser = async (refreshToken) => {
  try {
    const response = await API.post("/users/logout", { refreshToken });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (userData, accessToken) => {
  try {
    const response = await API.patch("/users/update", userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async (accessToken) => {
  try {
    const response = await API.delete("/users/delete", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const uploadAvatar = async (accessToken, formData) => {
  try {
    const response = await API.post("/users/upload-profile-picture", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Unknown error occurred" };
  }
};
