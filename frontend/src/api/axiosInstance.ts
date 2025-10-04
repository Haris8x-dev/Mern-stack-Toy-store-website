import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // ✅ change if backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ include cookies in requests
});

export default api;
