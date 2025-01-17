import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getTokens = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

API.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = getTokens();

      if (refreshToken) {
        try {
          const res = await API.post("/users/refresh-token", {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = res.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return API(originalRequest);
        } catch (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
