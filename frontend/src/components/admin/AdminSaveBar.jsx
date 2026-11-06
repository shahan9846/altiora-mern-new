// Bottom save bar. The Save button runs onSave, which HomeEditor passes in.
// statusMessage shows "Saved" or an error (isError is true for an error).
// isSaving disables the button while the save is running and shows a spinner.
// hasUnsavedChanges indicates the admin modified text that has not yet been saved.
// idleMessage is shown when there is nothing to save (the default suits the page editors).

const AdminSaveBar = ({
  onSave,
  statusMessage,
  isError,
  isSaving,
  hasUnsavedChanges,
  idleMessage = "All texts use the original wording",
}) => {
  const renderStatus = () => {
    if (isSaving) {
      return (
        <span className="adm-save-status is-saving" role="status">
          <svg className="adm-spinner" viewBox="0 0 24 24" fill="none">
            <circle className="adm-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path
              className="adm-spinner-head"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Saving changes...
        </span>
      );
    }

    if (statusMessage) {
      if (isError) {
        return (
          <span className="adm-save-status is-error" role="alert" title={statusMessage}>
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            Save failed: {statusMessage}
          </span>
        );
      }

      return (
        <span className="adm-save-status is-success" role="status">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          Saved to database
        </span>
      );
    }

    if (hasUnsavedChanges) {
      return (
        <span className="adm-save-status is-unsaved" role="status">
          <span className="adm-dot"></span>
          Unsaved changes
        </span>
      );
    }

    return (
      <span className="adm-save-status is-idle" role="status">
        {idleMessage}
      </span>
    );
  };

  return (
    <div className="adm-savebar">
      {renderStatus()}
      <button type="button" className="adm-btn-gold" onClick={onSave} disabled={isSaving}>
        {isSaving ? (
          <>
            <svg className="adm-spinner adm-btn-spinner" viewBox="0 0 24 24" fill="none">
              <circle className="adm-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path
                className="adm-spinner-head"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Saving...
          </>
        ) : (
          "Save changes"
        )}
      </button>
    </div>
  );
};

export default AdminSaveBar;
