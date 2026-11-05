// "On this page" outline — jump links to each editable section.
// The link of the section the admin is currently looking at is shown in bold.
import { useEffect, useState } from "react";

// id = the id of the section on the page, count = the number shown on the right
const sections = [
  { id: "hero", name: "Hero", count: 14 },
  { id: "values", name: "Value strip", count: 10 },
  { id: "about", name: "About Altiora", count: 5 },
  { id: "services", name: "Services", count: 15 },
  { id: "why", name: "Why Altiora", count: 12 },
  { id: "approach", name: "Our approach", count: 11 },
  { id: "training", name: "Training programs", count: 16 },
  { id: "cta", name: "Closing banner", count: 3 },
];

const AdminOutline = () => {
  const [activeId, setActiveId] = useState("hero");

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
  }, []);

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
