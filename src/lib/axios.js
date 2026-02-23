import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:7000/api" 
  : import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api` 
    : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});