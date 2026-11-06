// Services page: every visible service as a card.
// The words come from the backend (GET /api/pages/services),
// the cards from the Services dashboard (GET /api/services).
import "../../styles/home.css";
import "../../styles/pages.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import PageBanner from "../../components/user/PageBanner";
import ServiceCard from "../../components/user/ServiceCard";
import CtaBand from "../../components/user/CtaBand";
import usePageContent from "../../hooks/usePageContent";
import useServices from "../../hooks/useServices";

const ServicesPage = () => {
  const page = usePageContent("services");
  const services = useServices();

  return (
    <>
      <Navbar />

      <main>
        {page ? (
          <>
            <PageBanner title={page.banner.title} image={page.banner.image} />

            <section className="section-white">
              <div className="container">
                <div className="section-head" style={{ maxWidth: 640 }}>
                  <span className="eyebrow">{page.intro.smallHeading}</span>
                  <h2>{page.intro.heading}</h2>
                  <p>{page.intro.text}</p>
                </div>
                <div className="card-grid-3">
                  {services.map((service) => (
                    <ServiceCard key={service.slug} service={service} linkLabel={page.detail.cardLinkLabel} />
                  ))}
                </div>
              </div>
            </section>

            <CtaBand
              heading={page.cta.heading}
              text={page.cta.text}
              button={page.cta.button}
              image={page.cta.image}
              buttonLink="/contact"
            />
          </>
        ) : (
          <p className="page-loading">Loading...</p>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;
