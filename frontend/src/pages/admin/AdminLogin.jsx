import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../styles/adminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // stop the browser from reloading the page
    setErrorMessage("");
    setIsSigningIn(true);

    try {
      await api.post("/auth/login", { email, password });
      navigate("/admin/pages/home");
    } catch (error) {
      // Show the backend's message (for example "Invalid email or password"),
      // or a general message if the backend could not be reached.
      setErrorMessage(error.response?.data?.message || "Cannot reach the server. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img className="login-logo" src="/assets/images/logo-mark.png" alt="Altiora" />

        <p className="login-eyebrow">Admin</p>
        <h1 className="login-title">Sign in to the dashboard</h1>

        <form onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="login-email">Email</label>
          <input
            className="login-input"
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="login-label" htmlFor="login-password">Password</label>
          <input
            className="login-input"
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMessage && (
            <p className="login-error" role="alert">{errorMessage}</p>
          )}

          <button className="login-button" type="submit" disabled={isSigningIn}>
            {isSigningIn ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
