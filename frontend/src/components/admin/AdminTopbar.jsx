import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../api/api";

// Admin top bar — welcome text on the left, email and sign out on the right.
const AdminTopbar = () => {
  const navigate = useNavigate();
  const { admin } = useOutletContext(); // the logged-in admin, shared by ProtectedRoute

  const handleSignOut = async () => {
    try {
      await api.post("/auth/logout"); // backend removes the login cookie
    } catch (error) {
      console.error("Sign out failed:", error.message);
    }
    navigate("/admin/login");
  };

  return (
    <header className="adm-topbar">
      <div>
        <h3>Welcome back, Admin</h3>
        <p>Wednesday, 28 October 2026</p>
      </div>
      <div className="adm-topbar-right">
        <span className="adm-email">{admin.email}</span>
        <button type="button" className="adm-signout" onClick={handleSignOut}>Sign out</button>
      </div>
    </header>
  );
};

export default AdminTopbar;
