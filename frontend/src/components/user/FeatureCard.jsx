// One card with an icon, a title and a short text (used on the About page and others).
const FeatureCard = ({ icon, title, text }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="feature-mark" aria-hidden="true">{icon}</span>
    </div>
  );
};

export default FeatureCard;
