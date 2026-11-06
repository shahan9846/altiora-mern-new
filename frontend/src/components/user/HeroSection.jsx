import { useEffect, useState } from "react";
import { arrowIcon } from "./icons";

// How long each slide stays on screen
const SLIDE_TIME = 5000; // 5 seconds

const leftArrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
);
const rightArrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
);

// The first screen of the Home page: big text on the left and a sliding image on the right.
// The slides change by themselves every few seconds, or when the visitor uses the arrows or dots.
// The text changes together with the image.
//   hero - { slides: [{ image, smallHeading, headingLine1, headingLine2, text }], primaryButton, secondaryButton }
const HeroSection = ({ hero }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = hero.slides.length;
  const slide = hero.slides[activeIndex];

  const goTo = (index) => setActiveIndex((index + slideCount) % slideCount); // wraps around at both ends

  // Move to the next slide after a few seconds.
  // The timer starts again whenever the slide changes, so using the arrows never causes a double jump.
  useEffect(() => {
    const timer = setTimeout(() => setActiveIndex((current) => (current + 1) % slideCount), SLIDE_TIME);
    return () => clearTimeout(timer);
  }, [activeIndex, slideCount]);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-copy">
          {/* The key makes the small fade-in play again each time the slide changes */}
          <div className="slide-pulse" key={activeIndex}>
            <span className="eyebrow">{slide.smallHeading}</span>
            <h1>
              {slide.headingLine1}<br /><em>{slide.headingLine2}</em>
            </h1>
            <p className="lede">{slide.text}</p>
          </div>

          <div className="hero-actions">
            {hero.primaryButton && (
              <a className="btn btn-gold" href="/services">
                {hero.primaryButton}
                {arrowIcon}
              </a>
            )}
            {hero.secondaryButton && (
              <a className="btn btn-outline-dark" href="/contact">{hero.secondaryButton}</a>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <span className="thin-line thin-line-a"></span>
          <span className="thin-line thin-line-b"></span>
          <div className="hero-slider">
            {hero.slides.map((item, index) => (
              <div className={index === activeIndex ? "hero-slide is-active" : "hero-slide"} key={index}>
                <img src={item.image} alt={`${item.headingLine1} ${item.headingLine2}`} />
              </div>
            ))}

            <button type="button" className="hero-slider-nav hero-slider-prev" aria-label="Previous slide" onClick={() => goTo(activeIndex - 1)}>
              {leftArrow}
            </button>
            <button type="button" className="hero-slider-nav hero-slider-next" aria-label="Next slide" onClick={() => goTo(activeIndex + 1)}>
              {rightArrow}
            </button>

            <div className="hero-slider-dots" role="tablist" aria-label="Featured images">
              {hero.slides.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  className={index === activeIndex ? "is-active" : undefined}
                  onClick={() => goTo(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
