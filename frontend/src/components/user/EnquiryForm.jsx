import { useState } from "react";
import api from "../../api/api";
import { arrowIcon } from "./icons";

// What the form looks like before anyone types.
// service is null until the visitor chooses one, so a link like /contact?service=... can fill it in.
const emptyForm = { name: "", company: "", email: "", phone: "", service: null, message: "" };

// Checks the form. Returns an object with a message for each field that is wrong.
const findErrors = (form) => {
  const errors = {};
  const phoneDigits = form.phone.replace(/\D/g, "");

  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.company.trim()) errors.company = "Please enter your company or organization name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  if (!/^[0-9+()\-\s]+$/.test(form.phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a valid phone number, e.g. +974 5555 1234.";
  }
  if (!form.service) errors.service = "Please select an area of interest.";
  if (!form.message.trim()) errors.message = "Please add a short message.";
  return errors;
};

// The Contact page form. It sends the enquiry to the backend, where the admin can read it.
//   services - the visible services, used for the "Service of Interest" list
//   text     - { heading, button, note, successMessage } from the Contact page text
const EnquiryForm = ({ services, text }) => {
  const [form, setForm] = useState(emptyForm);
  const [robotTrap, setRobotTrap] = useState(""); // stays empty for real visitors
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null, or { type: "success" | "error", message }
  const [isSending, setIsSending] = useState(false);

  // A link like /contact?service=professional-development picks that service in the list
  const slug = new URLSearchParams(window.location.search).get("service");
  const linkedTitle = services.find((item) => item.slug === slug)?.title || "";

  // The values shown in the form (the service from the link is used until the visitor picks another)
  const values = { ...form, service: form.service ?? linkedTitle };

  const changeField = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined }); // clear the error of the field being fixed
  };

  const sendEnquiry = async (event) => {
    event.preventDefault();
    setStatus(null);

    const foundErrors = findErrors(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setIsSending(true);
    try {
      await api.post("/enquiries", { ...values, website: robotTrap });
      setForm(emptyForm);
      setStatus({ type: "success", message: text.successMessage });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "We could not send your enquiry. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  // One text box with its label and its error message
  const renderField = (name, label, type = "text", extra = {}) => (
    <div className={errors[name] ? "field error" : "field"}>
      <label htmlFor={`enquiry-${name}`}>{label} *</label>
      <input id={`enquiry-${name}`} name={name} type={type} value={values[name]} onChange={changeField} {...extra} />
      <span className="err-msg">{errors[name]}</span>
    </div>
  );

  return (
    <form className="contact-form" onSubmit={sendEnquiry} noValidate>
      <h3>{text.heading}</h3>

      <div className="form-grid">
        {renderField("name", "Name", "text", { maxLength: 120, autoComplete: "name" })}
        {renderField("company", "Company / Organization", "text", { maxLength: 160, autoComplete: "organization" })}
        {renderField("email", "Email Address", "email", { maxLength: 200, autoComplete: "email" })}
        {renderField("phone", "Contact Number", "tel", { maxLength: 40, autoComplete: "tel" })}

        <div className={errors.service ? "field full error" : "field full"}>
          <label htmlFor="enquiry-service">Service of Interest *</label>
          <select id="enquiry-service" name="service" value={values.service} onChange={changeField}>
            <option value="">Select an option</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>{service.title}</option>
            ))}
            <option value="General Enquiry">General Enquiry</option>
          </select>
          <span className="err-msg">{errors.service}</span>
        </div>

        <div className={errors.message ? "field full error" : "field full"}>
          <label htmlFor="enquiry-message">Message *</label>
          <textarea
            id="enquiry-message"
            name="message"
            maxLength={3000}
            placeholder="Tell us about your organization and what you're looking to achieve..."
            value={values.message}
            onChange={changeField}
          ></textarea>
          <span className="err-msg">{errors.message}</span>
        </div>
      </div>

      {/* Hidden box for spam robots. People cannot see it or tab to it. */}
      <div className="field-trap" aria-hidden="true">
        <label htmlFor="enquiry-website">Leave this empty</label>
        <input id="enquiry-website" type="text" tabIndex={-1} autoComplete="off" value={robotTrap} onChange={(event) => setRobotTrap(event.target.value)} />
      </div>

      <button type="submit" className="btn btn-gold" disabled={isSending}>
        {isSending ? "Sending..." : text.button}
        {!isSending && arrowIcon}
      </button>

      <p className="form-note">{text.note}</p>

      <div className={status ? `form-status show ${status.type}` : "form-status"} role="status">
        {status?.message}
      </div>
    </form>
  );
};

export default EnquiryForm;
