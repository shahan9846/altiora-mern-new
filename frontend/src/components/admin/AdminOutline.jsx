// "On this page" outline — jump links to each editable section.
// The link of the section the admin is currently looking at is shown in bold.
//   sections - a list of { id, name, count }: id is the id of the section on the page,
//              count is the number shown on the right.
import { useEffect, useState } from "react";

const AdminOutline = ({ sections }) => {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    // Watch a thin band near the top of the screen.
    // The section that is crossing that band is the one the admin is reading.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="adm-outline" aria-label="Sections on this page">
      <p>On this page</p>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeId === section.id ? "is-active" : undefined}
              onClick={() => setActiveId(section.id)}
            >
              <span>{section.name}</span>
              <em>{section.count}</em>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminOutline;
