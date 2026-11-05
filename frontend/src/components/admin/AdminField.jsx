import { useId } from "react";

// One labelled text box for the admin editor.
//   label    - the text shown above the box
//   value    - the current text
//   onChange - called with the new text each time the admin types
//   rows     - give a number to make it a bigger text area (for longer text)
//   hideLabel - true keeps the label for screen readers only
const AdminField = ({ label, value, onChange, rows, hideLabel }) => {
  const id = useId(); // a unique id so the label is linked to its box

  return (
    <div className="adm-field">
      <label htmlFor={id} className={hideLabel ? "adm-sr" : undefined}>
        {label}
      </label>
      {rows ? (
        <textarea id={id} rows={rows} value={value} onChange={(event) => onChange(event.target.value)}></textarea>
      ) : (
        <input id={id} type="text" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
};

export default AdminField;
