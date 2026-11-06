import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../api/api";
import "../../styles/adminLogin.css";

// Wraps the admin pages. It asks the backend "who is logged in?" (GET /api/auth/me):
//   - still waiting  -> show a small message
//   - not logged in  -> go to the login page
//   - logged in      -> show the admin page (and share the admin's email with it)
const ProtectedRoute = () => {
  const [loginStatus, setLoginStatus] = useState("checking"); // "checking" | "loggedIn" | "loggedOut"
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await api.get("/auth/me");
        setAdmin(response.data.admin);
        setLoginStatus("loggedIn");
      } catch {
        setLoginStatus("loggedOut");
      }
    };

    checkLogin();
  }, []);

  if (loginStatus === "checking") {
    return <p className="login-checking">Checking your login...</p>;
  }

  if (loginStatus === "loggedOut") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet context={{ admin }} />;
};

export default ProtectedRoute;
