import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import WhyAltiora from "./pages/user/WhyAltiora";
import CareerGuidance from "./pages/user/CareerGuidance";
import ServicesPage from "./pages/user/ServicesPage";
import ServiceDetail from "./pages/user/ServiceDetail";
import TrainingPage from "./pages/user/TrainingPage";
import ContactPage from "./pages/user/ContactPage";
import AdminLogin from "./pages/admin/AdminLogin";
import HomeEditor from "./pages/admin/HomeEditor";
import AboutEditor from "./pages/admin/AboutEditor";
import WhyEditor from "./pages/admin/WhyEditor";
import CareerEditor from "./pages/admin/CareerEditor";
import ServicesPageEditor from "./pages/admin/ServicesPageEditor";
import ServicesList from "./pages/admin/ServicesList";
import ServiceEdit from "./pages/admin/ServiceEdit";
import CategoriesList from "./pages/admin/CategoriesList";
import CategoryEdit from "./pages/admin/CategoryEdit";
import ProgramsList from "./pages/admin/ProgramsList";
import ProgramEdit from "./pages/admin/ProgramEdit";
import EnquiriesList from "./pages/admin/EnquiriesList";
import Dashboard from "./pages/admin/Dashboard";
import AccountSettings from "./pages/admin/AccountSettings";
import SiteSettingsEditor from "./pages/admin/SiteSettingsEditor";
import TrainingPageEditor from "./pages/admin/TrainingPageEditor";
import ContactPageEditor from "./pages/admin/ContactPageEditor";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/why-altiora" element={<WhyAltiora />} />
      <Route path="/career-guidance" element={<CareerGuidance />} />

      {/* Admin login (anyone can open it) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin pages (only for a logged-in admin) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/account" element={<AccountSettings />} />
        <Route path="/admin/pages/home" element={<HomeEditor />} />
        <Route path="/admin/pages/about" element={<AboutEditor />} />
        <Route path="/admin/pages/why" element={<WhyEditor />} />
        <Route path="/admin/pages/career" element={<CareerEditor />} />
        <Route path="/admin/pages/services" element={<ServicesPageEditor />} />
        <Route path="/admin/services" element={<ServicesList />} />
        <Route path="/admin/services/new" element={<ServiceEdit />} />
        <Route path="/admin/services/:id" element={<ServiceEdit />} />
        <Route path="/admin/training/categories" element={<CategoriesList />} />
        <Route path="/admin/training/categories/new" element={<CategoryEdit />} />
        <Route path="/admin/training/categories/:id" element={<CategoryEdit />} />
        <Route path="/admin/training/programs" element={<ProgramsList />} />
        <Route path="/admin/training/programs/new" element={<ProgramEdit />} />
        <Route path="/admin/training/programs/:id" element={<ProgramEdit />} />
        <Route path="/admin/enquiries" element={<EnquiriesList />} />
        <Route path="/admin/pages/site" element={<SiteSettingsEditor />} />
        <Route path="/admin/pages/training" element={<TrainingPageEditor />} />
        <Route path="/admin/pages/contact" element={<ContactPageEditor />} />
      </Route>

      {/* /admin or any unknown /admin/... address goes to the Home editor (which asks for login if needed) */}
      <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;
