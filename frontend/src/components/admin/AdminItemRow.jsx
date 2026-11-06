// One row in an admin list (a service, a training area or a program).
//   number     - the position shown on the left, for example "01"
//   image      - an optional small picture
//   title / text - the main line and a short line under it
//   badge      - small label next to the title, for example "Hidden"
//   isHidden   - true makes the row look faded
//   index / total - the item position, used to switch the up and down arrows off at the ends
//   isVisible  - whether the item shows on the website (changes the button to "Hide" or "Show")
//   editUrl    - where the Edit button goes
//   onMove(direction), onToggle(), onDelete() - what the buttons do
const AdminItemRow = ({ number, image, title, text, badge, isHidden, index, total, isVisible, editUrl, onMove, onToggle, onDelete }) => {
  const classes = ["adm-service-row"];
  if (isHidden) classes.push("is-hidden");
  if (!image) classes.push("no-thumb");

  return (
    <div className={classes.join(" ")}>
      <span className="adm-service-no">{number}</span>
      {image && <img className="adm-service-thumb" src={image} alt="" />}
      <div className="adm-service-info">
        <h3>
          {title}
          {badge && <span className="adm-badge">{badge}</span>}
        </h3>
        <p>{text}</p>
      </div>
      <div className="adm-service-actions">
        <button type="button" className="adm-btn" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">↑</button>
        <button type="button" className="adm-btn" onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move down">↓</button>
        <button type="button" className="adm-btn" onClick={onToggle}>{isVisible ? "Hide" : "Show"}</button>
        <a className="adm-btn" href={editUrl}>Edit</a>
        <button type="button" className="adm-btn is-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default AdminItemRow;
