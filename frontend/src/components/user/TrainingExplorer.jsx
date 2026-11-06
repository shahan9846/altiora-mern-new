import { useState } from "react";
import { arrowIcon, chevronDownIcon } from "./icons";

// The training area viewer: a list of areas, and the programs of the chosen area.
// On wide screens the areas are a list on the left. On small screens they become a dropdown.
//   categories - [{ _id, name, description, programs: [{ _id, title, text, tags }] }]
//   labels     - the small words from the Training page text (areaLabel, panelLabel, ...)
const TrainingExplorer = ({ categories, labels }) => {
  const [activeId, setActiveId] = useState(categories[0]?._id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const active = categories.find((category) => category._id === activeId) || categories[0];
  if (!active) return null;

  const chooseCategory = (id) => {
    setActiveId(id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="explorer" id="training-explorer">
      {/* Small screens: a dropdown */}
      <div className="explorer-select">
        <span className="explorer-select-label">{labels.areaLabel}</span>
        <button
          type="button"
          className="explorer-select-btn"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="explorer-select-name">{active.name}</span>
          <small>{active.programs.length}</small>
          {chevronDownIcon}
        </button>
        {isDropdownOpen && (
          <ul className="explorer-select-list" role="listbox">
            {categories.map((category) => (
              <li key={category._id}>
                <button
                  type="button"
                  className={category._id === active._id ? "active" : undefined}
                  onClick={() => chooseCategory(category._id)}
                >
                  <span>{category.name}</span>
                  <small>{category.programs.length}</small>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Wide screens: the list of areas */}
      <nav className="explorer-nav" role="tablist" aria-label="Training areas">
        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            role="tab"
            aria-selected={category._id === active._id}
            className={category._id === active._id ? "explorer-tab active" : "explorer-tab"}
            onClick={() => chooseCategory(category._id)}
          >
            <span>{category.name}</span>
            <small>{category.programs.length}</small>
          </button>
        ))}
      </nav>

      {/* The chosen area. The key makes the small fade-in play again for each area. */}
      <div className="explorer-panel" role="tabpanel" key={active._id}>
        <span className="eyebrow">{labels.panelLabel}</span>
        <h3>{active.name}</h3>
        <p className="explorer-desc">{active.description}</p>

        <div className="explorer-list-head">
          <h4>{labels.programsHeading}</h4>
          <span>{active.programs.length} {active.programs.length === 1 ? "program" : "programs"}</span>
        </div>

        <ul className="explorer-list">
          {active.programs.map((program) => (
            <li key={program._id}>
              <div className="explorer-row-main">
                <h5>{program.title}</h5>
                <p>{program.text}</p>
                {program.tags.length > 0 && (
                  <div className="explorer-tags">
                    {program.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              {labels.enquireButton && (
                <a className="explorer-enquire" href="/contact">
                  {labels.enquireButton}
                  {arrowIcon}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainingExplorer;
