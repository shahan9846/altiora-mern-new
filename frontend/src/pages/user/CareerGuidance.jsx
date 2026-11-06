// Career Guidance page.
// All the text and images come from the backend (GET /api/pages/career).
import "../../styles/home.css";
import "../../styles/pages.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import PageBanner from "../../components/user/PageBanner";
import CtaBand from "../../components/user/CtaBand";
import usePageContent from "../../hooks/usePageContent";
import { arrowIcon, targetIcon } from "../../components/user/icons";

const CareerGuidance = () => {
  const page = usePageContent("career");

  return (
    <>
      <Navbar />

      <main>
        {page ? (
          <>
            <PageBanner title={page.banner.title} image={page.banner.image} />

            {/* ============ INTRO ============ */}
            <section className="section-white">
              <div className="container">
                <div className="career-intro">
                  <div className="photo-frame" style={{ aspectRatio: "4 / 3" }}>
                    <img src={page.intro.image} alt="Professional preparing for the next step in their career" />
                  </div>
                  <div className="editorial">
                    <span className="eyebrow">{page.intro.smallHeading}</span>
                    <h2 className="mt-14">{page.intro.heading}</h2>
                    <p className="lede mt-18">{page.intro.text}</p>
                    <div className="button-row">
                      {page.intro.primaryButton && (
                        <a className="btn btn-gold" href="/contact?service=career-guidance-development">
                          {page.intro.primaryButton}
                          {arrowIcon}
                        </a>
                      )}
                      {page.intro.secondaryButton && (
                        <a className="btn btn-outline-light" href="/services">
                          {page.intro.secondaryButton}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============ CAREER SERVICES ============ */}
            <section className="section-off">
              <div className="container">
                <div className="section-head" style={{ maxWidth: 720 }}>
                  <span className="eyebrow">{page.support.smallHeading}</span>
                  <h2>{page.support.heading}</h2>
                  <p>{page.support.text}</p>
                </div>
                <div className="support-grid">
                  {page.support.cards.map((card, index) => (
                    <div className="support-card" key={index}>
                      <div className="support-icon">{targetIcon}</div>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============ OUR APPROACH ============ */}
            <section className="section-charcoal">
              <div className="container">
                <div className="section-head on-dark">
                  <span className="eyebrow">{page.approach.smallHeading}</span>
                  <h2>{page.approach.heading}</h2>
                  <p>{page.approach.text}</p>
                </div>
              </div>
              <div className="container no-pad">
                <div className="process-grid">
                  {page.approach.steps.map((step, index) => (
                    <div className="process-step" key={index}>
                      <span className="step-no">{`0${index + 1}`}</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============ WHY CHOOSE ALTIORA ============ */}
            <section className="section-white">
              <div className="container">
                <div className="grid-2">
                  <div className="editorial">
                    <span className="eyebrow">{page.why.smallHeading}</span>
                    <h2 className="mt-14">{page.why.heading}</h2>
                    <p className="mt-18">{page.why.text}</p>
                    <ul className="list-check">
                      {page.why.points.map((point, index) => (
                        <li key={index}>{point.text}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="photo-frame" style={{ aspectRatio: "4 / 3.2" }}>
                    <img src={page.why.image} alt="Altiora advisor and client shaking hands" />
                  </div>
                </div>
              </div>
            </section>

            <CtaBand
              heading={page.cta.heading}
              text={page.cta.text}
              button={page.cta.button}
              image={page.cta.image}
              buttonLink="/contact?service=career-guidance-development"
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

export default CareerGuidance;
