import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8080", // url for backend server
baseURL:"https://studynest-092h.onrender.com",

});

// Add JWT token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
