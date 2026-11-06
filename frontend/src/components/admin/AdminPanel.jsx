// One white section card in a page editor: a heading with counts, and the fields inside.
//   id          - the section id (the outline links jump to it)
//   title       - the section name
//   description - one short line about what the section shows
//   texts       - how many text fields it has (shown as a small count)
//   images      - how many images it has (leave out when there are none)
const AdminPanel = ({ id, title, description, texts, images, children }) => {
  return (
    <article className="adm-panel" id={id} aria-labelledby={`${id}-title`}>
      <header className="adm-panel-head">
        <div>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="adm-counts">
          <span className="adm-count">{texts} texts</span>
          {images > 0 && <span className="adm-count">{images} {images === 1 ? "image" : "images"}</span>}
        </div>
      </header>
      <div className="adm-panel-body">{children}</div>
    </article>
  );
};

export default AdminPanel;
