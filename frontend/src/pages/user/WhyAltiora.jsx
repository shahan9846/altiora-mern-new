// "Why Altiora" page.
// All the text and images come from the backend (GET /api/pages/why).
import "../../styles/home.css";
import "../../styles/pages.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import PageBanner from "../../components/user/PageBanner";
import FeatureCard from "../../components/user/FeatureCard";
import CtaBand from "../../components/user/CtaBand";
import usePageContent from "../../hooks/usePageContent";
import { targetIcon, awardIcon, peopleIcon, bookIcon, shieldCheckIcon, growthIcon } from "../../components/user/icons";

// One icon for each strength card, in the same order as the cards
const strengthIcons = [targetIcon, awardIcon, peopleIcon, bookIcon, shieldCheckIcon, growthIcon];

const WhyAltiora = () => {
  const page = usePageContent("why");

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
                <div className="grid-2">
                  <div className="editorial">
                    <span className="eyebrow">{page.intro.smallHeading}</span>
                    <h2 className="mt-14">{page.intro.heading}</h2>
                    <p className="mt-18">{page.intro.paragraphOne}</p>
                    <p>{page.intro.paragraphTwo}</p>
                  </div>
                  <div className="photo-frame" style={{ aspectRatio: "4 / 3.4" }}>
                    <img src={page.intro.image} alt="Altiora facilitator leading a workplace training session" />
                  </div>
                </div>
              </div>
            </section>

            {/* ============ WHAT SETS US APART ============ */}
            <section className="section-charcoal">
              <div className="container">
                <div className="section-head on-dark">
                  <span className="eyebrow">{page.strengths.smallHeading}</span>
                  <h2>{page.strengths.heading}</h2>
                </div>
                <div className="card-grid-3">
                  {page.strengths.cards.map((card, index) => (
                    <FeatureCard key={index} icon={strengthIcons[index]} title={card.title} text={card.text} />
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

export default WhyAltiora;
