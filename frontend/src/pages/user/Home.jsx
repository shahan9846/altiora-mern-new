// Home page.
// All the text and images come from the backend (GET /api/pages/home).
// If the admin has not saved anything yet, the backend sends the original text.
import { useEffect, useState } from "react";
import "../../styles/home.css";
import "../../styles/sliders.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import api from "../../api/api";
import HeroSection from "../../components/user/HeroSection";
import ServicesSection from "../../components/user/ServicesSection";
import useServices from "../../hooks/useServices";

// Small drawings. They stay the same, only the text and images are editable.
const arrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

// Icons for the five Value strip items, in order
const valueIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="9" cy="8" r="3" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <circle cx="17" cy="8.5" r="2.4" />
    <path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="9" r="5.5" />
    <path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
    <path d="m10 11 3.3-3.2a2.3 2.3 0 0 1 3.2 3.3" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3.5 18.5 9 12l4 3 7.5-8.5" />
    <path d="M15.5 6.5H20.5V11.5" />
  </svg>,
];

// Icons for the four Why Altiora highlights, in order
const highlightIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-7h6v7" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />
  </svg>,
];

// Icons for the Training category tags. A few icons repeat.
const peopleIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="8" r="3" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <circle cx="17" cy="8.5" r="2.4" />
    <path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" />
  </svg>
);
const handshakeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
  </svg>
);
const awardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" />
  </svg>
);
const bookIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" />
    <path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" />
  </svg>
);
const buildingIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
  </svg>
);
const shieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />
    <path d="m9 12 2 2 4-4.5" />
  </svg>
);
const tagIcons = [
  handshakeIcon, awardIcon, bookIcon, peopleIcon, buildingIcon,
  shieldIcon, handshakeIcon, awardIcon, bookIcon,
];


const Home = () => {
  const [page, setPage] = useState(null); // all sections of the Home page
  const hero = page?.hero;
  const services = useServices(); // the service cards come from the Services dashboard

  // When the page opens, load the saved text
  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await api.get("/pages/home");
        setPage(response.data);
      } catch (error) {
        console.error("Could not load the Home text:", error.message);
      }
    };
    loadPage();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* ============ HERO ============ */}
        {hero ? <HeroSection hero={hero} /> : <p className="page-loading">Loading...</p>}

        {/* Every section below shows the text saved in the database (or the original text) */}
        {page && (
          <>
            {/* ============ VALUE STRIP ============ */}
            <div className="value-strip">
              <div className="container">
                <div className="value-grid">
                  {page.valueStrip.items.map((item, index) => (
                    <div className="value-item" key={index}>
                      <div className="icon">{valueIcons[index]}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ============ ABOUT ============ */}
            <section id="about" className="section-white">
              <div className="container">
                <div className="grid-2">
                  <div className="photo-frame about-photo">
                    <img src={page.about.image} alt="A team discussing a plan around a table and whiteboard" />
                  </div>
                  <div>
                    <span className="eyebrow">{page.about.smallHeading}</span>
                    <h2 className="mt-14">{page.about.heading}</h2>
                    <p className="lede mt-18">{page.about.intro}</p>
                    <p className="body-text">{page.about.secondParagraph}</p>
                    {page.about.button && (
                      <a className="btn btn-outline-light mt-28" href="/about">
                        {page.about.button}
                        {arrowIcon}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ============ SERVICES ============ */}
            <ServicesSection text={page.services} services={services} />

            {/* ============ WHY ALTIORA ============ */}
            <section id="why-altiora" className="section-white">
              <div className="container">
                <div className="grid-2">
                  <div>
                    <span className="eyebrow">{page.why.smallHeading}</span>
                    <h2 className="mt-10">{page.why.heading}</h2>
                    <p className="lede mt-20">{page.why.text}</p>
                    {page.why.button && (
                      <a className="btn btn-outline-light mt-30" href="/why-altiora">
                        {page.why.button}
                        {arrowIcon}
                      </a>
                    )}
                  </div>
                  <div className="stat-panel">
                    <div className="stat-grid">
                      {page.why.highlights.map((highlight, index) => (
                        <div className="stat-cell" key={index}>
                          <div className="icon">{highlightIcons[index]}</div>
                          <div className="num">{highlight.value}</div>
                          <div className="label">{highlight.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============ OUR APPROACH ============ */}
            <section id="training" className="section-charcoal has-bg">
              <div className="section-charcoal-bg">
                <img src={page.approach.image} alt="" />
              </div>
              <div className="container">
                <div className="section-head on-dark approach-head">
                  <span className="eyebrow">{page.approach.smallHeading}</span>
                  <h2>{page.approach.heading}</h2>
                  <p>{page.approach.text}</p>
                </div>
              </div>
              <div className="container no-pad">
                <div className="process-grid">
                  {page.approach.steps.map((step, index) => (
                    <div className="process-step is-active" key={index}>
                      <span className="step-no">{`0${index + 1}`}</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============ TRAINING PROGRAMS ============ */}
            <section id="training-programs" className="section-off">
              <div className="container">
                <div className="grid-2">
                  <div>
                    <span className="eyebrow">{page.training.smallHeading}</span>
                    <h2>{page.training.heading}</h2>
                    <p className="lede mt-18">{page.training.text}</p>
                    <div className="mini-stats">
                      {page.training.numbers.map((number, index) => (
                        <div key={index}>
                          <strong><span className="count-up">{number.value}</span></strong>
                          <span>{number.label}</span>
                        </div>
                      ))}
                    </div>
                    {page.training.button && (
                      <a className="btn btn-outline-light mt-30" href="/training">
                        {page.training.button}
                        {arrowIcon}
                      </a>
                    )}
                  </div>
                  <div>
                    <div className="photo-frame training-photo">
                      <img src={page.training.image} alt="Altiora facilitator leading a workplace training session" />
                    </div>
                    <div className="training-tags">
                      {page.training.tags.map((tag, index) => (
                        <span className="training-tag" key={index}>
                          {tagIcons[index]}
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============ CTA BAND ============ */}
            <section id="contact" className="cta-band">
              <div className="cta-bg">
                <img src={page.cta.image} alt="" />
              </div>
              <div className="container">
                <h2>{page.cta.heading}</h2>
                <p>{page.cta.text}</p>
                {page.cta.button && (
                  <a href="/contact" className="btn btn-gold">
                    {page.cta.button}
                    {arrowIcon}
                  </a>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;
