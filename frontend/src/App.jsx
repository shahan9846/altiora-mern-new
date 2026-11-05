import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import HomeEditor from "./pages/admin/HomeEditor";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route path="/" element={<Home />} />

      {/* Admin login (anyone can open it) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin pages (only for a logged-in admin) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/pages/home" element={<HomeEditor />} />
      </Route>

      {/* /admin or any unknown /admin/... address goes to the Home editor (which asks for login if needed) */}
      <Route path="/admin/*" element={<Navigate to="/admin/pages/home" replace />} />
    </Routes>
  );
}

export default App;
