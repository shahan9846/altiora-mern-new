// Admin sidebar, in this order: Dashboard, Pages, Training, Services, Enquiries, Account settings.
// "Pages" and "Training" are groups: click the name to open or close the smaller links under it.
// To add a screen, add it to one of the lists below.
import { useState } from "react";

const pageLinks = [
  { name: "Home", path: "/admin/pages/home" },
  { name: "About", path: "/admin/pages/about" },
  { name: "Why Altiora", path: "/admin/pages/why" },
  { name: "Career Guidance", path: "/admin/pages/career" },
  { name: "Services page", path: "/admin/pages/services" },
  { name: "Training page", path: "/admin/pages/training" },
  { name: "Contact page", path: "/admin/pages/contact" },
  { name: "Site settings", path: "/admin/pages/site" },
];

const trainingLinks = [
  { name: "Categories", path: "/admin/training/categories" },
  { name: "Programs", path: "/admin/training/programs" },
];

const dashboardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3.5" y="3.5" width="7" height="8" rx="1" />
    <rect x="13.5" y="3.5" width="7" height="5" rx="1" />
    <rect x="13.5" y="11.5" width="7" height="9" rx="1" />
    <rect x="3.5" y="14.5" width="7" height="6" rx="1" />
  </svg>
);
const documentIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V3.5Z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
  </svg>
);
const bookIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" />
    <path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" />
  </svg>
);
const boxIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
    <path d="m4 7 8 4 8-4M12 11v10" />
  </svg>
);
const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Z" />
    <path d="m4.5 6.5 7.5 6 7.5-6" />
  </svg>
);
const userIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" />
  </svg>
);
const viewSiteIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);
const chevronIcon = (
  <svg className="adm-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 15l6-6 6 6" />
  </svg>
);

const AdminSidebar = () => {
  const currentPath = window.location.pathname;

  // A group starts open when the admin is on one of its screens
  const [openGroup, setOpenGroup] = useState({
    pages: pageLinks.some((link) => link.path === currentPath),
    training: trainingLinks.some((link) => link.path === currentPath || currentPath.startsWith(`${link.path}/`)),
  });

  const toggleGroup = (key) => setOpenGroup({ ...openGroup, [key]: !openGroup[key] });

  // A single link. It looks "current" for its own address and for the screens under it.
  const renderLink = (name, icon, path, isCurrent) => (
    <a className={isCurrent ? "adm-side-item is-active" : "adm-side-item"} href={path}>
      {icon}
      <span>{name}</span>
    </a>
  );

  // A group: a button that opens and closes the small links under it
  const renderGroup = (key, name, icon, links) => {
    const isOpen = openGroup[key];
    const hasCurrent = links.some((link) => currentPath === link.path || currentPath.startsWith(`${link.path}/`));

    return (
      <>
        <button
          type="button"
          className={hasCurrent ? "adm-side-item adm-side-toggle has-current" : "adm-side-item adm-side-toggle"}
          aria-expanded={isOpen}
          onClick={() => toggleGroup(key)}
        >
          {icon}
          <span>{name}</span>
          {chevronIcon}
        </button>

        {isOpen && (
          <ul className="adm-side-sub">
            {links.map((link) => {
              const isCurrent = currentPath === link.path || currentPath.startsWith(`${link.path}/`);
              return (
                <li key={link.path}>
                  <a href={link.path} className={isCurrent ? "is-active" : undefined} aria-current={isCurrent ? "page" : undefined}>
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  };

  return (
    <aside className="adm-sidebar">
      <a className="adm-brand" href="/admin">
        <img src="/assets/images/logo-mark.png" alt="Altiora" />
        <span>
          <strong>ALTIORA</strong>
          <em>ADMIN</em>
        </span>
      </a>

      <nav className="adm-side-nav" aria-label="Admin menu">
        {renderLink("Dashboard", dashboardIcon, "/admin", currentPath === "/admin")}
        {renderGroup("pages", "Pages", documentIcon, pageLinks)}
        {renderGroup("training", "Training", bookIcon, trainingLinks)}
        {renderLink("Services", boxIcon, "/admin/services", currentPath.startsWith("/admin/services"))}
        {renderLink("Enquiries", mailIcon, "/admin/enquiries", currentPath.startsWith("/admin/enquiries"))}
        {renderLink("Account settings", userIcon, "/admin/account", currentPath.startsWith("/admin/account"))}
      </nav>

      <a className="adm-side-item adm-view-site" href="/" target="_blank" rel="noopener noreferrer">
        {viewSiteIcon}
        <span>View website</span>
      </a>
    </aside>
  );
};

export default AdminSidebar;
