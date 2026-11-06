// Contact page.
// The words come from GET /api/pages/contact, the phone / email / address from GET /api/pages/site,
// and the enquiry form saves into the admin's Enquiries list.
import "../../styles/home.css";
import "../../styles/pages.css";
import "../../styles/contact.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import PageBanner from "../../components/user/PageBanner";
import EnquiryForm from "../../components/user/EnquiryForm";
import usePageContent from "../../hooks/usePageContent";
import useServices from "../../hooks/useServices";
import { whatsappLink } from "../../utils/siteLinks";
import { pinIcon, phoneIcon, mailIcon, whatsappIcon, instagramIcon, facebookIcon } from "../../components/user/icons";

// One of the three boxes (address, phone, email)
const ContactBox = ({ icon, label, value }) => (
  <div className="contact-box">
    <div className="icon">{icon}</div>
    <div>
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  </div>
);

const ContactPage = () => {
  const page = usePageContent("contact");
  const site = usePageContent("site");
  const services = useServices();

  return (
    <>
      <Navbar />

      <main>
        {page && site ? (
          <>
            <PageBanner title={page.banner.title} image={page.banner.image} />

            <section className="section-off" style={{ paddingTop: 56 }}>
              <div className="container">
                <div className="contact-intro">
                  <span className="eyebrow">{page.intro.smallHeading}</span>
                  <h2 className="mt-14">{page.intro.heading}</h2>
                  <p className="lede mt-14">{page.intro.text}</p>
                </div>

                <div className="grid-2" style={{ alignItems: "flex-start", marginTop: 40 }}>
                  <div className="contact-side">
                    <div className="contact-box-grid">
                      <ContactBox icon={pinIcon} label={page.details.addressLabel} value={site.contact.address} />
                      <ContactBox icon={phoneIcon} label={page.details.phoneLabel} value={site.contact.phone} />
                      <ContactBox icon={mailIcon} label={page.details.emailLabel} value={site.contact.email} />
                    </div>

                    {page.details.whatsappButton && (
                      <a className="btn btn-outline-light" href={whatsappLink(site.contact)} target="_blank" rel="noopener noreferrer">
                        {whatsappIcon}
                        {page.details.whatsappButton}
                      </a>
                    )}

                    <div className="footer-social">
                      <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Altiora on Instagram">
                        {instagramIcon}
                      </a>
                      <a href={site.contact.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Altiora on Facebook">
                        {facebookIcon}
                      </a>
                    </div>
                  </div>

                  <EnquiryForm services={services} text={page.form} />
                </div>
              </div>
            </section>

            <section className="section-white" style={{ padding: 0 }}>
              <iframe
                className="map-frame"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.contact.address)}&output=embed`}
                referrerPolicy="no-referrer-when-downgrade"
                title={`Altiora Business Advisory location: ${site.contact.address}`}
              ></iframe>
            </section>
          </>
        ) : (
          <p className="page-loading">Loading...</p>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
