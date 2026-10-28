// Gold page banner at the top of the Home editor. Static.

const AdminPageBanner = () => {
  return (
    <div className="adm-banner">
      <div>
        <a className="adm-back" href="/admin/pages/home">← All pages</a>
        <h1>Home</h1>
        <p>Edit the wording of this page.</p>
      </div>
      <a className="adm-btn-gold" href="/" target="_blank" rel="noopener noreferrer">View page</a>
    </div>
  );
};

export default AdminPageBanner;
