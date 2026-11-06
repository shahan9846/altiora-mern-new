import usePageContent from "../../hooks/usePageContent";
import { whatsappLink } from "../../utils/siteLinks";
import { pinIcon, phoneIcon, mailIcon, whatsappIcon, instagramIcon, facebookIcon } from "./icons";

// The footer on every page. The description, contact details, social links and
// the bottom line come from the Site settings in the admin dashboard.
const Footer = () => {
  const site = usePageContent("site");

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand">
            <a className="brand" href="/" aria-label="Altiora Business Advisory — Home">
              <img src="/assets/images/logo-mark.png" alt="Altiora Business Advisory logo mark" />
              <span className="wordmark">
                <strong>ALTIORA</strong>
                <span>BUSINESS ADVISORY</span>
              </span>
            </a>

            {site && (
              <>
                <p>{site.footer.description}</p>
                <p className="footer-tagline">{site.footer.tagline}</p>

                <div className="footer-social">
                  <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Altiora on Instagram">
                    {instagramIcon}
                  </a>
                  <a href={site.contact.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Altiora on Facebook">
                    {facebookIcon}
                  </a>
                  <a href={whatsappLink(site.contact)} target="_blank" rel="noopener noreferrer" aria-label="Chat with Altiora on WhatsApp">
                    {whatsappIcon}
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Quick links column */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/training">Training</a></li>
              <li><a href="/why-altiora">Why Us</a></li>
              <li><a href="/career-guidance">Career</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="footer-col">
            <h4>Contact</h4>
            {site && (
              <ul className="footer-contact">
                <li>{phoneIcon}<span>{site.contact.phone}</span></li>
                <li>{mailIcon}<span>{site.contact.email}</span></li>
                <li>{pinIcon}<span>{site.contact.address}</span></li>
              </ul>
            )}
          </div>
        </div>

        {site && (
          <div className="footer-bottom">
            <span>{site.footer.copyright}</span>
            <span><a href="#">{site.footer.legalLabel}</a></span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
