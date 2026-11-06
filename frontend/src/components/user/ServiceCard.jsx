import { arrowIcon, serviceIcon } from "./icons";

// One service card (image, title, text, link). Used on Home, the Services page
// and the "Related services" list.
//   service   - { slug, title, text, image }
//   linkLabel - the link text, for example "Learn More" (empty hides the link)
const ServiceCard = ({ service, linkLabel }) => {
  return (
    <div className="service-card-img">
      <div className="card-media">
        <div className="media-inner">
          <img src={service.image} alt={service.title} />
        </div>
        <div className="card-icon">{serviceIcon}</div>
      </div>
      <div className="card-body">
        <h3>{service.title}</h3>
        <p className="card-text">{service.text}</p>
        {linkLabel && (
          <a className="card-link" href={`/services/${service.slug}`}>
            {linkLabel}
            {arrowIcon}
          </a>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
