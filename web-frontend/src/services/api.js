import axios from "axios";

const api = axios.create({
  baseURL: "https://rentkaro-backend.onrender.com",
  withCredentials: true,
});

//  Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//  RESPONSE INTERCEPTOR (ADD THIS)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      console.log("Token expired → logging out");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/#/login";
    }

    return Promise.reject(err);
  }
);

export default api;