// Admin → Dashboard. The first screen after login: the main numbers and the latest enquiries.
import useApiData from "../../hooks/useApiData";
import AdminShell from "../../components/admin/AdminShell";
import AdminPageBanner from "../../components/admin/AdminPageBanner";

const statusNames = { new: "New", contacted: "Contacted", closed: "Closed" };

// For example: "5 Nov, 14:30"
const formatDate = (date) =>
  new Date(date).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

// One number card. The first card is dark, the others are white.
const StatCard = ({ label, value, note, isDark }) => (
  <div className={isDark ? "adm-stat is-dark" : "adm-stat"}>
    <span className="adm-stat-label">{label}</span>
    <strong className="adm-stat-value">{value}</strong>
    <span className="adm-stat-note">{note}</span>
  </div>
);

const Dashboard = () => {
  const data = useApiData("/dashboard", null); // null while loading

  return (
    <AdminShell>
      <AdminPageBanner
        title="Dashboard"
        description="Here is what needs your attention today."
        backUrl="/admin"
        backLabel="Altiora admin"
        buttonLabel="View website"
        buttonUrl="/"
      />

      <div className="adm-layout adm-layout-single">
        <div className="adm-panels">
          {!data ? (
            <p className="adm-empty">Loading the dashboard...</p>
          ) : (
            <>
              <div className="adm-stats">
                <StatCard
                  isDark
                  label="Total enquiries"
                  value={data.enquiries.total}
                  note={`${data.enquiries.new} new · ${data.enquiries.contacted} contacted · ${data.enquiries.closed} closed`}
                />
                <StatCard label="New enquiries" value={data.enquiries.new} note="Waiting for a reply" />
                <StatCard label="Services" value={data.services.shown} note={`Shown on the website (${data.services.total} in total)`} />
                <StatCard label="Training programs" value={data.training.programs} note={`${data.training.categories} categories`} />
              </div>

              <article className="adm-panel">
                <header className="adm-panel-head">
                  <div>
                    <h2>Recent enquiries</h2>
                    <p>The latest messages from the Contact form.</p>
                  </div>
                  <a className="adm-link" href="/admin/enquiries">View all</a>
                </header>

                {data.recentEnquiries.length === 0 ? (
                  <p className="adm-empty">No enquiries yet.</p>
                ) : (
                  <div className="adm-recent">
                    {data.recentEnquiries.map((enquiry) => (
                      <a className="adm-recent-row" href={`/admin/enquiries?id=${enquiry._id}`} key={enquiry._id}>
                        <div>
                          <strong>{enquiry.name}</strong>
                          <span>{enquiry.company} · {enquiry.service}</span>
                        </div>
                        <div className="adm-recent-side">
                          <span className={`adm-status is-${enquiry.status}`}>{statusNames[enquiry.status]}</span>
                          <small>{formatDate(enquiry.createdAt)}</small>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </>
          )}
        </div>
      </div>
    </AdminShell>
  );
};

export default Dashboard;
