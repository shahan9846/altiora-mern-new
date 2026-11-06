// Admin → Training page (the words around the training areas).
// The areas and programs themselves are managed in Admin → Training.
import useEditablePage from "../../hooks/useEditablePage";
import AdminEditorLayout from "../../components/admin/AdminEditorLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";
import AdminImageMeta from "../../components/admin/AdminImageMeta";

// The links in the "On this page" list (id = section id, count = number of texts)
const sections = [
  { id: "banner", name: "Page banner", count: 1 },
  { id: "intro", name: "Introduction", count: 3 },
  { id: "explorer", name: "Area viewer", count: 4 },
  { id: "custom", name: "Customized training", count: 4 },
  { id: "cta", name: "Closing banner", count: 4 },
];

const TrainingPageEditor = () => {
  const editor = useEditablePage("training");
  const { page, uploadingImage, changeSectionField, uploadImage } = editor;

  // Upload the image of a section (its name is also the id of the image being uploaded)
  const uploadSectionImage = (sectionName, event) => {
    uploadImage(sectionName, (url) => changeSectionField(sectionName, "image", url), event);
  };

  if (!page) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the text..."}</p>;
  }

  const { banner, intro, explorer, custom, cta } = page;

  return (
    <AdminEditorLayout editor={editor} title="Training page" viewUrl="/training" sections={sections}>
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

      <AdminPanel id="intro" title="Introduction" description="The heading above the training areas." texts={3}>
        <div className="adm-stack">
          <AdminField label="Small heading" value={intro.smallHeading} onChange={(value) => changeSectionField("intro", "smallHeading", value)} />
          <AdminField label="Heading" value={intro.heading} onChange={(value) => changeSectionField("intro", "heading", value)} />
          <AdminField label="Text" rows="3" value={intro.text} onChange={(value) => changeSectionField("intro", "text", value)} />
        </div>
      </AdminPanel>

      <AdminPanel id="explorer" title="Area viewer" description="Small words used inside the training area viewer." texts={4}>
        <div className="adm-grid-2">
          <AdminField label="Dropdown label (small screens)" value={explorer.areaLabel} onChange={(value) => changeSectionField("explorer", "areaLabel", value)} />
          <AdminField label="Small label above the area name" value={explorer.panelLabel} onChange={(value) => changeSectionField("explorer", "panelLabel", value)} />
          <AdminField label="Heading above the programs" value={explorer.programsHeading} onChange={(value) => changeSectionField("explorer", "programsHeading", value)} />
          <AdminField label="Enquire button" value={explorer.enquireButton} onChange={(value) => changeSectionField("explorer", "enquireButton", value)} />
        </div>
      </AdminPanel>

      <AdminPanel id="custom" title="Customized training" description="A short section next to a photo." texts={4} images={1}>
        <div className="adm-split">
          <div className="adm-stack">
            <AdminField label="Small heading" value={custom.smallHeading} onChange={(value) => changeSectionField("custom", "smallHeading", value)} />
            <AdminField label="Heading" value={custom.heading} onChange={(value) => changeSectionField("custom", "heading", value)} />
            <AdminField label="Text" rows="3" value={custom.text} onChange={(value) => changeSectionField("custom", "text", value)} />
            <AdminField label="Button" value={custom.button} onChange={(value) => changeSectionField("custom", "button", value)} />
          </div>
          <figure className="adm-figure">
            <img src={custom.image} alt="" />
            <AdminImageMeta
              imageUrl={custom.image}
              hint="Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP."
              isUploading={uploadingImage === "custom"}
              onPick={(event) => uploadSectionImage("custom", event)}
            />
          </figure>
        </div>
      </AdminPanel>

      <AdminPanel id="cta" title="Closing banner" description="The last call to action above the footer, with two buttons." texts={4} images={1}>
        <div className="adm-stack">
          <AdminField label="Heading" value={cta.heading} onChange={(value) => changeSectionField("cta", "heading", value)} />
          <AdminField label="Text" rows="3" value={cta.text} onChange={(value) => changeSectionField("cta", "text", value)} />
          <AdminField label="First button (jumps to the training areas)" value={cta.primaryButton} onChange={(value) => changeSectionField("cta", "primaryButton", value)} />
          <AdminField label="Second button (opens the Contact page)" value={cta.secondaryButton} onChange={(value) => changeSectionField("cta", "secondaryButton", value)} />
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

export default TrainingPageEditor;
