// Admin → Enquiries. The messages sent from the Contact form, as a simple list.
// Each row shows the main details. "View" opens everything in a pop-up.
// The admin can change the status of an enquiry (new, contacted, closed), reply, or delete it.
import { useState } from "react";
import api from "../../api/api";
import useManagedList from "../../hooks/useManagedList";
import AdminShell from "../../components/admin/AdminShell";
import AdminPageBanner from "../../components/admin/AdminPageBanner";
import AdminAlertCard from "../../components/admin/AdminAlertCard";
import AdminModal from "../../components/admin/AdminModal";

const statusNames = { new: "New", contacted: "Contacted", closed: "Closed" };
const statusList = ["new", "contacted", "closed"];

// For example: "05 Nov 2026, 20:19"
const formatDate = (date) =>
  new Date(date).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const EnquiriesList = () => {
  const list = useManagedList({ listUrl: "/enquiries", itemUrl: "/enquiries", reorderUrl: "" });
  const { items: enquiries } = list;

  const [filter, setFilter] = useState("all"); // "all", "new", "contacted" or "closed"
  const [search, setSearch] = useState("");
  // A link like /admin/enquiries?id=<id> (from the Dashboard) opens that enquiry
  const [openId, setOpenId] = useState(new URLSearchParams(window.location.search).get("id"));

  // Change the status of one enquiry
  const changeStatus = async (enquiry, status) => {
    try {
      const response = await api.put(`/enquiries/${enquiry._id}`, { status });
      list.setItems(enquiries.map((other) => (other._id === enquiry._id ? response.data : other)));
      list.setStatusMessage("");
    } catch (error) {
      list.setIsError(true);
      list.setStatusMessage(error.response?.data?.message || "Could not change the status. Please try again.");
    }
  };

  const deleteEnquiry = async (enquiry) => {
    setOpenId(null);
    await list.deleteItem(enquiry, `the enquiry from ${enquiry.name}`);
  };

  const countOf = (status) => enquiries.filter((enquiry) => enquiry.status === status).length;

  // Does this enquiry match what the admin typed in the search box?
  const matchesSearch = (enquiry) => {
    const words = search.trim().toLowerCase();
    if (!words) return true;

    return [enquiry.name, enquiry.email, enquiry.company, enquiry.phone, enquiry.service, enquiry.message]
      .join(" ")
      .toLowerCase()
      .includes(words);
  };

  const renderRow = (enquiry) => (
    <tr key={enquiry._id} className={enquiry.status === "new" ? "is-new" : undefined}>
      <td>{formatDate(enquiry.createdAt)}</td>
      <td>
        <strong>{enquiry.name}</strong>
        <small>{enquiry.company}</small>
      </td>
      <td>
        <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
        <small>{enquiry.phone}</small>
      </td>
      <td>{enquiry.service}</td>
      <td>
        <select
          className="adm-status-select"
          value={enquiry.status}
          onChange={(event) => changeStatus(enquiry, event.target.value)}
          aria-label={`Status of the enquiry from ${enquiry.name}`}
        >
          {statusList.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </td>
      <td className="adm-table-actions">
        <button type="button" className="adm-btn" onClick={() => setOpenId(enquiry._id)}>View</button>
        <button type="button" className="adm-btn" onClick={() => deleteEnquiry(enquiry)}>Delete</button>
      </td>
    </tr>
  );

  const renderModal = () => {
    const enquiry = enquiries?.find((item) => item._id === openId);
    if (!enquiry) return null;

    return (
      <AdminModal title="Enquiry details" onClose={() => setOpenId(null)}>
        <dl className="adm-details">
          <dt>Received</dt>
          <dd>{formatDate(enquiry.createdAt)} · via contact form</dd>
          <dt>Name</dt>
          <dd>{enquiry.name}</dd>
          <dt>Company</dt>
          <dd>{enquiry.company}</dd>
          <dt>Email</dt>
          <dd><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></dd>
          <dt>Phone</dt>
          <dd><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></dd>
          <dt>Service</dt>
          <dd>{enquiry.service}</dd>
          <dt>Message</dt>
          <dd className="adm-details-message">{enquiry.message}</dd>
          <dt>Status</dt>
          <dd><span className={`adm-status is-${enquiry.status}`}>{statusNames[enquiry.status]}</span></dd>
        </dl>

        <div className="adm-modal-actions">
          {statusList.map((status) => (
            <button
              key={status}
              type="button"
              className={enquiry.status === status ? "adm-btn is-selected" : "adm-btn"}
              onClick={() => changeStatus(enquiry, status)}
            >
              Mark {status}
            </button>
          ))}
        </div>

        <div className="adm-modal-actions">
          <a className="adm-btn-gold" href={`mailto:${enquiry.email}?subject=Your enquiry to Altiora`}>Reply by email</a>
          <button type="button" className="adm-btn" onClick={() => deleteEnquiry(enquiry)}>Delete</button>
        </div>
      </AdminModal>
    );
  };

  const renderList = () => {
    if (!enquiries) return <p className="adm-empty">{list.isError ? "" : "Loading the enquiries..."}</p>;

    const shown = enquiries.filter((enquiry) => (filter === "all" || enquiry.status === filter) && matchesSearch(enquiry));

    return (
      <>
        <div className="adm-toolbar">
          <div className="adm-filter">
            {["all", ...statusList].map((name) => (
              <button key={name} type="button" className={filter === name ? "adm-btn is-selected" : "adm-btn"} onClick={() => setFilter(name)}>
                {name === "all" ? "All" : statusNames[name]}
                <span className="adm-btn-count">{name === "all" ? enquiries.length : countOf(name)}</span>
              </button>
            ))}
          </div>
          <input
            type="search"
            className="adm-search"
            placeholder="Search name, email, company, ..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {shown.length === 0 ? (
          <p className="adm-empty">{enquiries.length === 0 ? "No enquiries yet. Messages sent from the Contact form will appear here." : "No enquiries match."}</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Interest</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{shown.map(renderRow)}</tbody>
            </table>
          </div>
        )}
      </>
    );
  };

  return (
    <AdminShell>
      <AdminAlertCard message={list.statusMessage} isError={list.isError} onClose={() => list.setStatusMessage("")} />

      <AdminPageBanner
        eyebrow="Inbox"
        title="Enquiries"
        description="Messages from your contact form. Open one to reply and mark how far you have got."
      />

      <div className="adm-layout adm-layout-single">
        <div className="adm-panels">{renderList()}</div>
      </div>

      {renderModal()}
    </AdminShell>
  );
};

export default EnquiriesList;
