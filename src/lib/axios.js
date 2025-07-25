import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://backend-thvw.onrender.com/api",
  withCredentials: true,
});
