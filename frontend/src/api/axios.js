import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-trip-planner-ue50.onrender.com", // backend base URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
