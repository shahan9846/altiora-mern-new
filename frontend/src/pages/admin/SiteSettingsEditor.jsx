// Admin → Site settings. Contact details and footer text used all over the website:
// the Contact page, the footer on every page, and the WhatsApp links.
import useEditablePage from "../../hooks/useEditablePage";
import AdminEditorLayout from "../../components/admin/AdminEditorLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";

// The links in the "On this page" list (id = section id, count = number of texts)
const sections = [
  { id: "contact", name: "Contact details", count: 7 },
  { id: "footer", name: "Footer", count: 4 },
];

const SiteSettingsEditor = () => {
  const editor = useEditablePage("site");
  const { page, changeSectionField } = editor;

  if (!page) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the settings..."}</p>;
  }

  const { contact, footer } = page;

  return (
    <AdminEditorLayout editor={editor} title="Site settings" viewUrl="/contact" sections={sections}>
      <AdminPanel id="contact" title="Contact details" description="Shown on the Contact page and in the footer." texts={7}>
        <div className="adm-grid-2">
          <AdminField label="Address" value={contact.address} onChange={(value) => changeSectionField("contact", "address", value)} />
          <AdminField label="Phone" value={contact.phone} onChange={(value) => changeSectionField("contact", "phone", value)} />
          <AdminField label="Email" value={contact.email} onChange={(value) => changeSectionField("contact", "email", value)} />
          <AdminField label="WhatsApp number (digits only, with country code)" value={contact.whatsappNumber} onChange={(value) => changeSectionField("contact", "whatsappNumber", value)} />
        </div>
        <div className="adm-stack adm-mt">
          <AdminField label="WhatsApp first message" rows="2" value={contact.whatsappMessage} onChange={(value) => changeSectionField("contact", "whatsappMessage", value)} />
          <AdminField label="Instagram link" maxLength={300} value={contact.instagramUrl} onChange={(value) => changeSectionField("contact", "instagramUrl", value)} />
          <AdminField label="Facebook link" maxLength={300} value={contact.facebookUrl} onChange={(value) => changeSectionField("contact", "facebookUrl", value)} />
        </div>
      </AdminPanel>

      <AdminPanel id="footer" title="Footer" description="The text at the bottom of every page." texts={4}>
        <div className="adm-stack">
          <AdminField label="Short description" rows="3" value={footer.description} onChange={(value) => changeSectionField("footer", "description", value)} />
          <AdminField label="Tagline" value={footer.tagline} onChange={(value) => changeSectionField("footer", "tagline", value)} />
          <AdminField label="Copyright line" value={footer.copyright} onChange={(value) => changeSectionField("footer", "copyright", value)} />
          <AdminField label="Privacy link label" value={footer.legalLabel} onChange={(value) => changeSectionField("footer", "legalLabel", value)} />
        </div>
      </AdminPanel>
    </AdminEditorLayout>
  );
};

export default SiteSettingsEditor;
