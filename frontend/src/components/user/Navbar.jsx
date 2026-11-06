// Gives the link of the page the visitor is on the "active" style
const isActive = (path) => (window.location.pathname === path ? "active" : undefined);

const Navbar = () => {
  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="/" aria-label="Altiora Business Advisory — Home">
          <img src="/assets/images/logo-mark.png" alt="Altiora Business Advisory logo mark" />
          <span className="wordmark">
            <strong>ALTIORA</strong>
            <span>BUSINESS ADVISORY</span>
          </span>
        </a>

        <nav className="nav-primary" aria-label="Primary">
          <ul className="nav-links">
            <li><a href="/" className={isActive("/")}>Home</a></li>
            <li><a href="/about" className={isActive("/about")}>About</a></li>
            <li><a href="/services" className={window.location.pathname.startsWith("/services") ? "active" : undefined}>Services</a></li>
            <li><a href="/training" className={isActive("/training")}>Training</a></li>
            <li><a href="/why-altiora" className={isActive("/why-altiora")}>Why Us</a></li>
            <li><a href="/career-guidance" className={isActive("/career-guidance")}>Career</a></li>
            <li><a href="/contact" className={isActive("/contact")}>Contact</a></li>
            <li className="mobile-cta">
              <a href="/contact" className="btn btn-gold">Request a Consultation</a>
            </li>
          </ul>

          <div className="header-cta">
            <a href="/contact" className="btn btn-gold">Request a Consultation</a>
            <button type="button" className="nav-toggle" aria-label="Toggle navigation menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
