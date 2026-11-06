// Admin → Account settings. Change the login username (email) and the password.
// The current password is always needed, to be sure it is really the owner.
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../api/api";
import AdminShell from "../../components/admin/AdminShell";
import AdminPageBanner from "../../components/admin/AdminPageBanner";
import AdminAlertCard from "../../components/admin/AdminAlertCard";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";

const AccountSettings = () => {
  const { admin } = useOutletContext(); // the logged-in admin, shared by ProtectedRoute

  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState(admin.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const showError = (message) => {
    setIsError(true);
    setStatusMessage(message);
  };

  const saveAccount = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    if (!currentPassword) return showError("Please enter your current password.");
    if (newPassword && newPassword.length < 8) return showError("The new password must be at least 8 characters.");
    if (newPassword !== confirmPassword) return showError("The new password and its confirmation do not match.");

    setIsSaving(true);
    try {
      await api.put("/auth/account", { currentPassword, newEmail, newPassword });
      setIsError(false);
      setStatusMessage("Account updated. Use the new details next time you log in.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => window.location.reload(), 1800); // so the top bar shows the new email
    } catch (error) {
      showError(error.response?.data?.message || "Cannot reach the server. Nothing was changed.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminShell>
      <AdminAlertCard message={statusMessage} isError={isError} onClose={() => setStatusMessage("")} />

      <AdminPageBanner
        title="Account settings"
        description="Change the username and password you use to log in."
        backLabel="← Dashboard"
      />

      <div className="adm-layout adm-layout-single">
        <div className="adm-panels">
          <form onSubmit={saveAccount}>
            <AdminPanel id="account" title="Login details" description="Leave the new password empty to keep the current one." texts={4}>
              <div className="adm-stack adm-account-fields">
                <AdminField label="Username (email)" type="email" value={newEmail} onChange={setNewEmail} />
                <AdminField label="Current password (required)" type="password" value={currentPassword} onChange={setCurrentPassword} />
                <AdminField label="New password (at least 8 characters)" type="password" value={newPassword} onChange={setNewPassword} />
                <AdminField label="Confirm new password" type="password" value={confirmPassword} onChange={setConfirmPassword} />
                <div>
                  <button type="submit" className="adm-btn-gold" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save account"}
                  </button>
                </div>
              </div>
            </AdminPanel>
          </form>
        </div>
      </div>
    </AdminShell>
  );
};

export default AccountSettings;
