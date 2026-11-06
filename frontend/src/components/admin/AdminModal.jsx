import { useEffect } from "react";

// A pop-up box on top of the admin screen. It closes with the X, with the Escape key,
// or when the admin clicks the dark area around it.
//   title   - the heading of the box
//   onClose - called when the box should close
const AdminModal = ({ title, onClose, children }) => {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="adm-modal-backdrop" onClick={onClose}>
      {/* Clicks inside the box must not close it */}
      <div className="adm-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <header className="adm-modal-head">
          <h2>{title}</h2>
          <button type="button" className="adm-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </header>
        <div className="adm-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default AdminModal;
