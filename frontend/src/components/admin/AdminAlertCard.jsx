// The notification card that floats at the top right after saving, deleting or when something fails.
// The page editors close it by themselves after a few seconds. The X button closes it right away.
//   message - "Saved" shows the standard "Changes saved" text, any other text is shown as it is
//   isError - true for a red error card
//   onClose - called when the admin clicks the X

const checkIcon = (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

const errorIcon = (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
      clipRule="evenodd"
    />
  </svg>
);

const closeIcon = (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const AdminAlertCard = ({ message, isError, onClose }) => {
  if (!message) return null;

  const isSaved = message === "Saved";
  const title = isError ? "Something went wrong" : isSaved ? "Changes saved" : message;
  const description = isError ? message : isSaved ? "The website now shows them." : "";

  return (
    <div
      className={`adm-alert-card ${isError ? "is-error" : "is-success"}`}
      role={isError ? "alert" : "status"}
      aria-live="polite"
    >
      <div className="adm-alert-icon">{isError ? errorIcon : checkIcon}</div>

      <div className="adm-alert-content">
        <strong className="adm-alert-title">{title}</strong>
        {description && <p className="adm-alert-desc">{description}</p>}
      </div>

      {onClose && (
        <button type="button" className="adm-alert-close" onClick={onClose} aria-label="Close notification">
          {closeIcon}
        </button>
      )}
    </div>
  );
};

export default AdminAlertCard;
