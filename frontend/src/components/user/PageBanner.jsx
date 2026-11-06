// The dark banner with a photo, title and "Home / Page" trail at the top of inner pages.
//   parent - optional middle step of the trail, for example { name: "Services", href: "/services" }
const PageBanner = ({ title, image, parent }) => {
  return (
    <section className="page-banner page-banner-img">
      <div className="page-banner-bg">
        <img src={image} alt="" />
      </div>
      <div className="container">
        <h1>{title}</h1>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="sep">/</span>
          {parent && (
            <>
              <a href={parent.href}>{parent.name}</a>
              <span className="sep">/</span>
            </>
          )}
          <span className="current">{title}</span>
        </nav>
      </div>
    </section>
  );
};

export default PageBanner;
