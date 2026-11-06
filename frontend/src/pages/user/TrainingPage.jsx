// Training page.
// The words come from the backend (GET /api/pages/training),
// the areas and programs from the Training dashboard (GET /api/training).
import "../../styles/home.css";
import "../../styles/pages.css";
import "../../styles/training.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import PageBanner from "../../components/user/PageBanner";
import TrainingExplorer from "../../components/user/TrainingExplorer";
import CtaBand from "../../components/user/CtaBand";
import usePageContent from "../../hooks/usePageContent";
import useTraining from "../../hooks/useTraining";
import { arrowIcon } from "../../components/user/icons";

const TrainingPage = () => {
  const page = usePageContent("training");
  const categories = useTraining();

  return (
    <>
      <Navbar />

      <main>
        {page ? (
          <>
            <PageBanner title={page.banner.title} image={page.banner.image} />

            {/* ============ TRAINING AREAS ============ */}
            <section className="section-off">
              <div className="container">
                <div className="section-head section-head-wide">
                  <span className="eyebrow">{page.intro.smallHeading}</span>
                  <h2>{page.intro.heading}</h2>
                  <p>{page.intro.text}</p>
                </div>
                {categories && <TrainingExplorer categories={categories} labels={page.explorer} />}
              </div>
            </section>

            {/* ============ CUSTOMIZED TRAINING ============ */}
            <section className="section-white">
              <div className="container">
                <div className="grid-2" style={{ alignItems: "center" }}>
                  <div className="editorial">
                    <span className="eyebrow">{page.custom.smallHeading}</span>
                    <h2 className="mt-14">{page.custom.heading}</h2>
                    <p className="mt-18">{page.custom.text}</p>
                    {page.custom.button && (
                      <a className="btn btn-outline-light" href="/contact" style={{ marginTop: 24 }}>
                        {page.custom.button}
                        {arrowIcon}
                      </a>
                    )}
                  </div>
                  <div className="photo-frame" style={{ aspectRatio: "4 / 3" }}>
                    <img src={page.custom.image} alt="Altiora facilitator designing a bespoke training program" />
                  </div>
                </div>
              </div>
            </section>

            <CtaBand
              heading={page.cta.heading}
              text={page.cta.text}
              button={page.cta.primaryButton}
              buttonLink="#training-explorer"
              secondaryButton={page.cta.secondaryButton}
              secondaryLink="/contact"
              image={page.cta.image}
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

export default TrainingPage;
