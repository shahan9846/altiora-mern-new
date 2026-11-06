// Admin → Services page (the words around the services).
// The services themselves (cards) are managed in Admin → Services.
import useEditablePage from "../../hooks/useEditablePage";
import AdminEditorLayout from "../../components/admin/AdminEditorLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";
import AdminImageMeta from "../../components/admin/AdminImageMeta";

// The links in the "On this page" list (id = section id, count = number of texts)
const sections = [
  { id: "banner", name: "Page banner", count: 1 },
  { id: "intro", name: "Introduction", count: 3 },
  { id: "detail", name: "Service pages", count: 5 },
  { id: "cta", name: "Closing banner", count: 3 },
];

const ServicesPageEditor = () => {
  const editor = useEditablePage("services");
  const { page, uploadingImage, changeSectionField, uploadImage } = editor;

  // Upload the image of a section (its name is also the id of the image being uploaded)
  const uploadSectionImage = (sectionName, event) => {
    uploadImage(sectionName, (url) => changeSectionField(sectionName, "image", url), event);
  };

  if (!page) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the text..."}</p>;
  }

  const { banner, intro, detail, cta } = page;

  return (
    <AdminEditorLayout editor={editor} title="Services page" viewUrl="/services" sections={sections}>
      <AdminPanel id="banner" title="Page banner" description="The title and photo at the very top of the Services page." texts={1} images={1}>
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
            onPick={(event) => uploadSectionImage("banner", event)}
          />
        </div>
      </AdminPanel>

      <AdminPanel id="intro" title="Introduction" description="The heading above the service cards." texts={3}>
        <div className="adm-stack">
          <AdminField label="Small heading" value={intro.smallHeading} onChange={(value) => changeSectionField("intro", "smallHeading", value)} />
          <AdminField label="Heading" rows="2" value={intro.heading} onChange={(value) => changeSectionField("intro", "heading", value)} />
          <AdminField label="Text" rows="4" value={intro.text} onChange={(value) => changeSectionField("intro", "text", value)} />
        </div>
      </AdminPanel>

      <AdminPanel id="detail" title="Service pages" description="Words shared by every service's own page and by the service cards." texts={5}>
        <div className="adm-grid-2">
          <AdminField label="Small label (after the number)" value={detail.label} onChange={(value) => changeSectionField("detail", "label", value)} />
          <AdminField label="Button" value={detail.button} onChange={(value) => changeSectionField("detail", "button", value)} />
          <AdminField label="Related services: small heading" value={detail.relatedSmallHeading} onChange={(value) => changeSectionField("detail", "relatedSmallHeading", value)} />
          <AdminField label="Related services: heading" value={detail.relatedHeading} onChange={(value) => changeSectionField("detail", "relatedHeading", value)} />
          <AdminField label="Card link label" value={detail.cardLinkLabel} onChange={(value) => changeSectionField("detail", "cardLinkLabel", value)} />
        </div>
      </AdminPanel>

      <AdminPanel id="cta" title="Closing banner" description="The last call to action above the footer." texts={3} images={1}>
        <div className="adm-stack">
          <AdminField label="Heading" value={cta.heading} onChange={(value) => changeSectionField("cta", "heading", value)} />
          <AdminField label="Text" rows="3" value={cta.text} onChange={(value) => changeSectionField("cta", "text", value)} />
          <AdminField label="Button" value={cta.button} onChange={(value) => changeSectionField("cta", "button", value)} />
        </div>
        <h3 className="adm-sub">Background image</h3>
        <div className="adm-image-row">
          <img src={cta.image} alt="" />
          <AdminImageMeta
            imageUrl={cta.image}
            hint="Wide, at least 1600 × 900 px. A dark overlay is added on top. JPG, PNG or WebP."
            isUploading={uploadingImage === "cta"}
            onPick={(event) => uploadSectionImage("cta", event)}
          />
        </div>
      </AdminPanel>
    </AdminEditorLayout>
  );
};

export default ServicesPageEditor;
