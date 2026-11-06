// Admin → Contact page (the words around the form).
// The phone, email and address are in Admin → Site settings, and the messages are in Admin → Enquiries.
import useEditablePage from "../../hooks/useEditablePage";
import AdminEditorLayout from "../../components/admin/AdminEditorLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";
import AdminImageMeta from "../../components/admin/AdminImageMeta";

// The links in the "On this page" list (id = section id, count = number of texts)
const sections = [
  { id: "banner", name: "Page banner", count: 1 },
  { id: "intro", name: "Introduction", count: 3 },
  { id: "details", name: "Contact boxes", count: 4 },
  { id: "form", name: "Enquiry form", count: 4 },
];

const ContactPageEditor = () => {
  const editor = useEditablePage("contact");
  const { page, uploadingImage, changeSectionField, uploadImage } = editor;

  if (!page) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the text..."}</p>;
  }

  const { banner, intro, details, form } = page;

  return (
    <AdminEditorLayout editor={editor} title="Contact page" viewUrl="/contact" sections={sections}>
      <AdminPanel id="banner" title="Page banner" description="The title and photo at the very top of the page." texts={1} images={1}>
        <div className="adm-stack">
          <AdminField label="Title" value={banner.title} onChange={(value) => changeSectionField("banner", "title", value)} />
        </div>
        <h3 className="adm-sub">Banner image</h3>
        <div className="adm-image-row">
          <img src={banner.image} alt="" />
          <AdminImageMeta
            imageUrl={banner.image}
            hint="Wide, at least 1600 × 600 px. A dark overlay is added on top. JPG, PNG or WebP."
            isUploading={uploadingImage === "banner"}
            onPick={(event) => uploadImage("banner", (url) => changeSectionField("banner", "image", url), event)}
          />
        </div>
      </AdminPanel>

      <AdminPanel id="intro" title="Introduction" description="The heading above the contact boxes and the form." texts={3}>
        <div className="adm-stack">
          <AdminField label="Small heading" value={intro.smallHeading} onChange={(value) => changeSectionField("intro", "smallHeading", value)} />
          <AdminField label="Heading" value={intro.heading} onChange={(value) => changeSectionField("intro", "heading", value)} />
          <AdminField label="Text" rows="3" value={intro.text} onChange={(value) => changeSectionField("intro", "text", value)} />
        </div>
      </AdminPanel>

      <AdminPanel id="details" title="Contact boxes" description="The labels of the address, phone and email boxes. The details themselves are in Site settings." texts={4}>
        <div className="adm-grid-2">
          <AdminField label="Address box label" value={details.addressLabel} onChange={(value) => changeSectionField("details", "addressLabel", value)} />
          <AdminField label="Phone box label" value={details.phoneLabel} onChange={(value) => changeSectionField("details", "phoneLabel", value)} />
          <AdminField label="Email box label" value={details.emailLabel} onChange={(value) => changeSectionField("details", "emailLabel", value)} />
          <AdminField label="WhatsApp button" value={details.whatsappButton} onChange={(value) => changeSectionField("details", "whatsappButton", value)} />
        </div>
      </AdminPanel>

      <AdminPanel id="form" title="Enquiry form" description="The words on and around the form." texts={4}>
        <div className="adm-stack">
          <AdminField label="Heading" value={form.heading} onChange={(value) => changeSectionField("form", "heading", value)} />
          <AdminField label="Send button" value={form.button} onChange={(value) => changeSectionField("form", "button", value)} />
          <AdminField label="Note under the button" rows="2" value={form.note} onChange={(value) => changeSectionField("form", "note", value)} />
          <AdminField label="Message shown after sending" rows="2" value={form.successMessage} onChange={(value) => changeSectionField("form", "successMessage", value)} />
        </div>
      </AdminPanel>
    </AdminEditorLayout>
  );
};

export default ContactPageEditor;
