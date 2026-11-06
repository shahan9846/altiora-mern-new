import { arrowIcon } from "./icons";

// The closing banner above the footer. An empty button text hides that button.
//   button / buttonLink           - the gold button (the link defaults to nowhere yet)
//   secondaryButton / secondaryLink - an optional second, outlined button
const CtaBand = ({ heading, text, button, image, buttonLink = "#", secondaryButton, secondaryLink = "#" }) => {
  const primary = button && (
    <a href={buttonLink} className="btn btn-gold">
      {button}
      {arrowIcon}
    </a>
  );

  const secondary = secondaryButton && (
    <a href={secondaryLink} className="btn btn-outline-light">
      {secondaryButton}
    </a>
  );

  return (
    <section className="cta-band">
      <div className="cta-bg">
        <img src={image} alt="" />
      </div>
      <div className="container">
        <h2>{heading}</h2>
        <p>{text}</p>
        {secondaryButton !== undefined ? (
          <div className="cta-actions">
            {primary}
            {secondary}
          </div>
        ) : (
          primary
        )}
      </div>
    </section>
  );
};

export default CtaBand;
