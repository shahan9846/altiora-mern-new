// Admin sidebar — static. Menu: Pages → Home, plus a View website link.

const AdminSidebar = () => {
  return (
    <aside className="adm-sidebar">
      <a className="adm-brand" href="/admin/pages/home">
        <img src="/assets/images/logo-mark.png" alt="Altiora" />
        <span>
          <strong>ALTIORA</strong>
          <em>ADMIN</em>
        </span>
      </a>

      <nav className="adm-side-nav" aria-label="Admin menu">
        <a className="adm-side-item" href="/admin/pages/home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V3.5Z" />
            <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
          </svg>
          <span>Pages</span>
          <svg className="adm-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 15l6-6 6 6" />
          </svg>
        </a>

        <ul className="adm-side-sub">
          <li><a href="/admin/pages/home" className="is-active" aria-current="page">Home</a></li>
        </ul>
      </nav>

      <a className="adm-side-item adm-view-site" href="/" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M14 4h6v6M20 4l-9 9" />
          <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
        <span>View website</span>
      </a>
    </aside>
  );
};

export default AdminSidebar;
