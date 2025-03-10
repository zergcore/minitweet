import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error)))
);

export default api;
