// Gold banner at the top of an admin screen.
//   title       - the screen name, for example "About" or "Services"
//   description - one short line under the title
//   eyebrow     - optional small label above the title (for example "Inbox"); it replaces the back link
//   backUrl / backLabel - the small link above the title
//   buttonLabel / buttonUrl - the gold button on the right (leave buttonUrl out for no button)
//   openInNewTab - true for links that leave the dashboard, like "View page"
//   viewUrl - short form used by the page editors: a "View page" button that opens in a new tab
const AdminPageBanner = ({
  title,
  description = "Edit the wording of this page.",
  eyebrow,
  backUrl = "/admin",
  backLabel = "← Dashboard",
  buttonLabel = "View page",
  buttonUrl,
  openInNewTab = true,
  viewUrl,
}) => {
  const url = buttonUrl ?? viewUrl;

  return (
    <div className="adm-banner">
      <div>
        {eyebrow ? (
          <span className="adm-eyebrow">{eyebrow}</span>
        ) : (
          <a className="adm-back" href={backUrl}>{backLabel}</a>
        )}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {url && (
        <a
          className="adm-btn-gold"
          href={url}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          {buttonLabel}
        </a>
      )}
    </div>
  );
};

export default AdminPageBanner;
