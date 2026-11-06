import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

// The row of cards is shown 4 times one after another. When the slide reaches the end of one
// copy it jumps back by exactly one copy, which looks the same, so the row never ends.
const COPIES = 4;
const SPEED = 0.6; // pixels per frame while sliding by itself (about 36 pixels a second)
const GAP = 24; // space between cards (the same as in the CSS)

const leftArrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
);
const rightArrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
);

// The Services part of the Home page: a heading with arrows, and a row of service cards that slides by itself.
// It stops while the visitor hovers over it, touches it or drags it, and the arrows move it by one card.
//   text     - { smallHeading, heading, text, cardLinkLabel, viewAllButton }
//   services - the visible services
const ServicesSection = ({ text, services }) => {
  const sliderRef = useRef(null);
  const isPausedRef = useRef(false); // the sliding code reads this on every frame
  const dragRef = useRef({ isDragging: false, startX: 0, startScroll: 0 });
  const [isDragging, setIsDragging] = useState(false); // only used for the grabbing cursor

  // Slide by itself, one small step on every frame
  useEffect(() => {
    const slider = sliderRef.current;
    const wantsLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!slider || services.length === 0) return;

    const oneCopyWidth = slider.scrollWidth / COPIES;
    let position = oneCopyWidth; // start inside the second copy, so there is room to go both ways
    slider.scrollLeft = position;

    let frame;
    const step = () => {
      if (isPausedRef.current) {
        position = slider.scrollLeft; // the visitor moved it: carry on from where it is now
      } else {
        if (!wantsLessMotion) position += SPEED;
        // Keep the position inside the second copy (jump by one copy, which looks the same)
        if (position >= oneCopyWidth * 2) position -= oneCopyWidth;
        if (position < oneCopyWidth) position += oneCopyWidth;
        slider.scrollLeft = position;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [services]);

  // Arrows: move by one card, smoothly, and keep the slider paused while it moves
  const scrollByCard = (direction) => {
    const slider = sliderRef.current;
    const cardWidth = slider.querySelector(".service-card-img").offsetWidth + GAP;

    isPausedRef.current = true;
    slider.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
    setTimeout(() => { isPausedRef.current = false; }, 700);
  };

  // Dragging with the mouse
  const startDrag = (event) => {
    if (event.pointerType !== "mouse") return; // touch screens already scroll by swiping
    dragRef.current = { isDragging: true, startX: event.clientX, startScroll: sliderRef.current.scrollLeft };
    isPausedRef.current = true;
    setIsDragging(true);
  };

  const moveDrag = (event) => {
    if (!dragRef.current.isDragging) return;
    sliderRef.current.scrollLeft = dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
  };

  const endDrag = () => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    isPausedRef.current = false;
    setIsDragging(false);
  };

  const pause = () => { isPausedRef.current = true; };
  const resume = () => { if (!dragRef.current.isDragging) isPausedRef.current = false; };

  return (
    <section id="services" className="section-off">
      <div className="container">
        <div className="section-head services-head">
          <div>
            <span className="eyebrow">{text.smallHeading}</span>
            <h2>{text.heading}</h2>
            <p>{text.text}</p>
          </div>
          <div className="slider-controls">
            <button type="button" className="slider-arrow" aria-label="Previous services" onClick={() => scrollByCard(-1)}>
              {leftArrow}
            </button>
            <button type="button" className="slider-arrow" aria-label="Next services" onClick={() => scrollByCard(1)}>
              {rightArrow}
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className={isDragging ? "services-auto-slider is-dragging" : "services-auto-slider"}
          onMouseEnter={pause}
          onMouseLeave={() => { resume(); endDrag(); }}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
        >
          <div className="services-auto-track">
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              services.map((service) => (
                <ServiceCard key={`${copy}-${service.slug}`} service={service} linkLabel={text.cardLinkLabel} />
              ))
            )}
          </div>
        </div>

        {text.viewAllButton && (
          <div className="text-center mt-44">
            <a className="btn btn-outline-light" href="/services">{text.viewAllButton}</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
