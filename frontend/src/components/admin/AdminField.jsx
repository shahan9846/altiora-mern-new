import { useId } from "react";

// How much the admin may type when the field does not set its own limit.
// The small counter under the box shows how much is left, so long text never surprises anyone.
const DEFAULT_LIMIT_ONE_LINE = 150;
const DEFAULT_LIMIT_PARAGRAPH = 600;

// One labelled box for the admin editor.
//   label    - the text shown above the box
//   value    - the current value
//   onChange - called with the new value each time the admin types or chooses
//   rows     - give a number to make it a bigger text area (for longer text)
//   options  - give a list like [{ value, label }] to make it a drop-down choice
//   type     - the kind of single-line box: "text" (default), "password", "email"...
//   maxLength - the most characters allowed (a counter is shown under the box)
//   hint     - optional small tip shown under the box
//   hideLabel - true keeps the label for screen readers only
const AdminField = ({ label, value, onChange, rows, options, type = "text", maxLength, hint, hideLabel }) => {
  const id = useId(); // a unique id so the label is linked to its box
  const limit = maxLength ?? (rows ? DEFAULT_LIMIT_PARAGRAPH : DEFAULT_LIMIT_ONE_LINE);
  const isTextBox = !options && type !== "password"; // drop-downs and passwords have no counter

  const renderBox = () => {
    if (options) {
      return (
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      );
    }

    if (rows) {
      return (
        <textarea id={id} rows={rows} maxLength={limit} value={value} onChange={(event) => onChange(event.target.value)}></textarea>
      );
    }

    return (
      <input
        id={id}
        type={type}
        maxLength={type === "password" ? undefined : limit}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  };

  return (
    <div className="adm-field">
      <label htmlFor={id} className={hideLabel ? "adm-sr" : undefined}>
        {label}
      </label>
      {renderBox()}
      {(isTextBox || hint) && (
        <div className="adm-field-foot">
          <span>{hint}</span>
          {isTextBox && (
            <span className={value.length >= limit * 0.9 ? "adm-field-count is-near" : "adm-field-count"}>
              {value.length} / {limit}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminField;
