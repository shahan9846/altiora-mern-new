// Admin top bar — welcome text on the left, email and sign out on the right. Static.

const AdminTopbar = () => {
  return (
    <header className="adm-topbar">
      <div>
        <h3>Welcome back, Admin</h3>
        <p>Wednesday, 28 October 2026</p>
      </div>
      <div className="adm-topbar-right">
        <span className="adm-email">admin@altiora.com</span>
        <button type="button" className="adm-signout">Sign out</button>
      </div>
    </header>
  );
};

export default AdminTopbar;
