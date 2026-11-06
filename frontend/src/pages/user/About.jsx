// About page.
// All the text and images come from the backend (GET /api/pages/about).
import "../../styles/home.css";
import "../../styles/pages.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import PageBanner from "../../components/user/PageBanner";
import FeatureCard from "../../components/user/FeatureCard";
import CtaBand from "../../components/user/CtaBand";
import usePageContent from "../../hooks/usePageContent";
import {
  arrowIcon,
  shieldIcon,
  shieldCheckIcon,
  growthIcon,
  ringsIcon,
  targetIcon,
  awardIcon,
  peopleIcon,
  handshakeIcon,
} from "../../components/user/icons";

// One icon for each card, in the same order as the cards
const foundationIcons = [shieldIcon, growthIcon, ringsIcon];
const valueIcons = [awardIcon, shieldCheckIcon, peopleIcon, growthIcon, targetIcon];
const reasonIcons = [targetIcon, awardIcon, handshakeIcon, shieldIcon];

const About = () => {
  const page = usePageContent("about");

  return (
    <>
      <Navbar />

      <main>
        {page ? (
          <>
            <PageBanner title={page.banner.title} image={page.banner.image} />

            {/* ============ WHO WE ARE ============ */}
            <section className="section-white">
              <div className="container">
                <div className="grid-2">
                  <div className="editorial">
                    <span className="eyebrow">{page.intro.smallHeading}</span>
                    <h2 className="mt-14">{page.intro.heading}</h2>
                    <p className="mt-18">{page.intro.paragraphOne}</p>
                    <p>{page.intro.paragraphTwo}</p>
                    {page.intro.button && (
                      <a className="btn btn-outline-light mt-28" href="/contact">
                        {page.intro.button}
                        {arrowIcon}
                      </a>
                    )}
                  </div>
                  <div className="photo-frame about-photo">
                    <img src={page.intro.image} alt="A team discussing a plan around a table and whiteboard" />
                  </div>
                </div>
              </div>
            </section>

            {/* ============ VISION, MISSION & BELIEF ============ */}
            <section className="section-off has-bg">
              <div className="section-off-bg">
                <img src={page.foundation.image} alt="" />
              </div>
              <div className="container">
                <div className="section-head">
                  <span className="eyebrow">{page.foundation.smallHeading}</span>
                  <h2>{page.foundation.heading}</h2>
                  <p>{page.foundation.text}</p>
                </div>
                <div className="card-grid-3">
                  {page.foundation.cards.map((card, index) => (
                    <FeatureCard key={index} icon={foundationIcons[index]} title={card.title} text={card.text} />
                  ))}
                </div>
              </div>
            </section>

            {/* ============ WHAT WE BELIEVE ============ */}
            <section className="section-white">
              <div className="container">
                <div className="grid-2">
                  <div className="editorial">
                    <span className="eyebrow">{page.beliefs.smallHeading}</span>
                    <h2 className="mt-14">{page.beliefs.heading}</h2>
                    <ul className="list-check">
                      {page.beliefs.points.map((point, index) => (
                        <li key={index}>{point.text}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="photo-frame about-photo">
                    <img src={page.beliefs.image} alt="Aerial view of the Doha skyline and waterfront" />
                  </div>
                </div>
              </div>
            </section>

            {/* ============ OUR VALUES ============ */}
            <section className="section-off">
              <div className="container">
                <div className="section-head">
                  <span className="eyebrow">{page.values.smallHeading}</span>
                  <h2>{page.values.heading}</h2>
                </div>
                <div className="card-grid-5">
                  {page.values.cards.map((card, index) => (
                    <FeatureCard key={index} icon={valueIcons[index]} title={card.title} text={card.text} />
                  ))}
                </div>
              </div>
            </section>

            {/* ============ WHY ORGANIZATIONS CHOOSE US ============ */}
            <section className="section-charcoal">
              <div className="container">
                <div className="section-head on-dark">
                  <span className="eyebrow">{page.reasons.smallHeading}</span>
                  <h2>{page.reasons.heading}</h2>
                </div>
                <div className="card-grid-4">
                  {page.reasons.cards.map((card, index) => (
                    <FeatureCard key={index} icon={reasonIcons[index]} title={card.title} text={card.text} />
                  ))}
                </div>
              </div>
            </section>

            <CtaBand heading={page.cta.heading} text={page.cta.text} button={page.cta.button} image={page.cta.image} />
          </>
        ) : (
          <p className="page-loading">Loading...</p>
        )}
      </main>

      <Footer />
    </>
  );
};

export default About;
