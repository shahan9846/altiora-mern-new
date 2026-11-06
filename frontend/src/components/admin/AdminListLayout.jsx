// The frame of an admin list screen: the shell, the banner with an "Add" button,
// the messages, and one white card that holds the rows.
//   list         - what useManagedList returned (used for the messages)
//   title        - the screen name, for example "Services"
//   description  - one short line under the title
//   addLabel / addUrl - the gold "Add ..." button
//   backUrl / backLabel - the small link above the title
//   panelTitle / panelDescription - the heading inside the white card
//   counts       - optional small numbers shown at the top right of the card, for example ["5 shown", "5 total"]
import AdminShell from "./AdminShell";
import AdminPageBanner from "./AdminPageBanner";
import AdminAlertCard from "./AdminAlertCard";

const AdminListLayout = ({
  list,
  title,
  description,
  addLabel,
  addUrl,
  backUrl = "/admin",
  backLabel = "← Dashboard",
  panelTitle,
  panelDescription,
  counts = [],
  children,
}) => {
  return (
    <AdminShell>
      <AdminAlertCard message={list.statusMessage} isError={list.isError} onClose={() => list.setStatusMessage("")} />

      <AdminPageBanner
        title={title}
        description={description}
        backUrl={backUrl}
        backLabel={backLabel}
        buttonLabel={addLabel}
        buttonUrl={addUrl}
        openInNewTab={false}
      />

      <div className="adm-layout adm-layout-single">
        <div className="adm-panels">
          <article className="adm-panel">
            <header className="adm-panel-head">
              <div>
                <h2>{panelTitle}</h2>
                <p>{panelDescription}</p>
              </div>
              <div className="adm-counts">
                {counts.map((count) => (
                  <span className="adm-count" key={count}>{count}</span>
                ))}
              </div>
            </header>
            {children}
          </article>
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminListLayout;
