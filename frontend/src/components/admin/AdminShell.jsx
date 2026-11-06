// The frame shared by every admin screen: sidebar, top bar, and a scrolling content area.
//   footer - optional bar fixed at the bottom (the save bar)
import "../../styles/admin.css";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminShell = ({ children, footer }) => {
  return (
    <div className="adm-shell">
      <AdminSidebar />

      <div className="adm-main">
        <AdminTopbar />

        <div className="adm-scroll">
          <div className="adm-content">{children}</div>
        </div>

        {footer}
      </div>
    </div>
  );
};

export default AdminShell;
