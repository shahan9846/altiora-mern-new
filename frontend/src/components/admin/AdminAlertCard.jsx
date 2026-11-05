// Top alert card that shows a prominent success or error message when saving or loading.
// Closes automatically after a few seconds on success, or when the admin clicks the X button.

const AdminAlertCard = ({ message, isError, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`adm-alert-card ${isError ? "is-error" : "is-success"}`}
      role={isError ? "alert" : "status"}
      aria-live="polite"
    >
      <div className="adm-alert-icon">
        {isError ? (
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <div className="adm-alert-content">
        <strong className="adm-alert-title">
          {isError ? "Save failed" : "Changes saved successfully"}
        </strong>
        <p className="adm-alert-desc">
          {isError
            ? message
            : message === "Saved"
            ? "Your changes have been saved to the database and are now live on the site."
            : message}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          className="adm-alert-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AdminAlertCard;

