// Admin → "Why Altiora" page editor.
// Loading, typing, uploading and saving are handled by useEditablePage.
// This file only describes the fields of each section.
import useEditablePage from "../../hooks/useEditablePage";
import AdminEditorLayout from "../../components/admin/AdminEditorLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";
import AdminImageMeta from "../../components/admin/AdminImageMeta";

// The links in the "On this page" list (id = section id, count = number of texts)
const sections = [
  { id: "banner", name: "Page banner", count: 1 },
  { id: "intro", name: "Introduction", count: 4 },
  { id: "strengths", name: "What sets us apart", count: 14 },
  { id: "cta", name: "Closing banner", count: 3 },
];

const WhyEditor = () => {
  const editor = useEditablePage("why");
  const { page, uploadingImage, changeSectionField, changeListItem, uploadImage } = editor;

  // Upload the image of a section (its name is also the id of the image being uploaded)
  const uploadSectionImage = (sectionName, event) => {
    uploadImage(sectionName, (url) => changeSectionField(sectionName, "image", url), event);
  };

  if (!page) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the text..."}</p>;
  }

  const { banner, intro, strengths, cta } = page;

  return (
    <AdminEditorLayout editor={editor} title="Why Altiora" viewUrl="/why-altiora" sections={sections}>
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
            onPick={(event) => uploadSectionImage("banner", event)}
          />
        </div>
      </AdminPanel>

      <AdminPanel id="intro" title="Introduction" description="A short pitch next to a photo." texts={4} images={1}>
        <div className="adm-split">
          <div className="adm-stack">
            <AdminField label="Small heading" value={intro.smallHeading} onChange={(value) => changeSectionField("intro", "smallHeading", value)} />
            <AdminField label="Heading" value={intro.heading} onChange={(value) => changeSectionField("intro", "heading", value)} />
            <AdminField label="First paragraph" rows="4" value={intro.paragraphOne} onChange={(value) => changeSectionField("intro", "paragraphOne", value)} />
            <AdminField label="Second paragraph" rows="4" value={intro.paragraphTwo} onChange={(value) => changeSectionField("intro", "paragraphTwo", value)} />
          </div>
          <figure className="adm-figure">
            <img src={intro.image} alt="" />
            <AdminImageMeta
              imageUrl={intro.image}
              hint="Landscape, at least 1200 × 1000 px. JPG, PNG or WebP."
              isUploading={uploadingImage === "intro"}
              onPick={(event) => uploadSectionImage("intro", event)}
            />
          </figure>
        </div>
      </AdminPanel>

      <AdminPanel id="strengths" title="What sets us apart" description="Six cards on the dark band." texts={14}>
        <div className="adm-grid-2">
          <AdminField label="Small heading" value={strengths.smallHeading} onChange={(value) => changeSectionField("strengths", "smallHeading", value)} />
          <AdminField label="Heading" value={strengths.heading} onChange={(value) => changeSectionField("strengths", "heading", value)} />
        </div>
        <h3 className="adm-sub">Cards</h3>
        <div className="adm-stack">
          {strengths.cards.map((card, index) => (
            <div className="adm-pair" key={index}>
              <AdminField label={`Card ${index + 1}: title`} value={card.title} onChange={(value) => changeListItem("strengths", "cards", index, "title", value)} />
              <AdminField label={`Card ${index + 1}: text`} rows="3" value={card.text} onChange={(value) => changeListItem("strengths", "cards", index, "text", value)} />
            </div>
          ))}
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

export default WhyEditor;
