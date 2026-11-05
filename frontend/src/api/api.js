import axios from "axios";

// One axios instance used by the whole app.
// baseURL "/api" means api.post("/auth/login") calls /api/auth/login (Vite forwards it to the backend).
const api = axios.create({
  baseURL: "/api",
});

export default api;
