// One service's own page, for example /services/professional-development.
// The service comes from GET /api/services/:slug, the shared words from GET /api/pages/services.
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/pages.css";
import api from "../../api/api";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import PageBanner from "../../components/user/PageBanner";
import ServiceCard from "../../components/user/ServiceCard";
import usePageContent from "../../hooks/usePageContent";
import { arrowIcon, serviceIcon } from "../../components/user/icons";

const ServiceDetail = () => {
  const { slug } = useParams();
  const page = usePageContent("services"); // the shared words (button, labels...)
  const [data, setData] = useState(null); // { service, related, number }
  const [notFound, setNotFound] = useState(false);

  // Load the service each time the address changes (for example when clicking a related service)
  useEffect(() => {
    const loadService = async () => {
      setData(null);
      setNotFound(false);
      try {
        const response = await api.get(`/services/${slug}`);
        setData(response.data);
      } catch (error) {
        console.error("Could not load the service:", error.message);
        setNotFound(true);
      }
    };
    loadService();
  }, [slug]);

  const renderContent = () => {
    if (notFound) {
      return (
        <p className="page-loading">
          This service was not found. <a href="/services">See all services</a>
        </p>
      );
    }

    if (!data || !page) {
      return <p className="page-loading">Loading...</p>;
    }

    const { service, related, number } = data;
    const { detail } = page;

    return (
      <>
        <PageBanner title={service.title} image={service.image} parent={{ name: "Services", href: "/services" }} />

        {/* ============ THE SERVICE ============ */}
        <section className="section-white">
          <div className="container">
            <div className="grid-2" style={{ alignItems: "flex-start" }}>
              <div>
                <div className="service-icon">{serviceIcon}</div>
                <span className="eyebrow">{`${String(number).padStart(2, "0")} — ${detail.label}`}</span>
                <h2 className="mt-14">{service.title}</h2>
                <p className="lede mt-16">{service.text}</p>
                {detail.button && (
                  <a className="btn btn-outline-light mt-28" href={`/contact?service=${service.slug}`}>
                    {detail.button}
                    {arrowIcon}
                  </a>
                )}
              </div>
              <div className="photo-frame" style={{ aspectRatio: "4 / 3" }}>
                <img src={service.image} alt={service.title} />
              </div>
            </div>
          </div>
        </section>

        {/* ============ RELATED SERVICES ============ */}
        {related.length > 0 && (
          <section className="section-off">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">{detail.relatedSmallHeading}</span>
                <h2>{detail.relatedHeading}</h2>
              </div>
              <div className="card-grid-3">
                {related.map((other) => (
                  <ServiceCard key={other.slug} service={other} linkLabel={detail.cardLinkLabel} />
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <main>{renderContent()}</main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
