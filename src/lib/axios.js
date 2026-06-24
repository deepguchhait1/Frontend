import axios from "axios";

// Prioritizes VITE_API_URL if present, otherwise falls back based on the environment mode
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : import.meta.env.MODE === "development" 
    ? "http://localhost:7000/api" 
    : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});