// Admin → Career Guidance page editor.
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
  { id: "intro", name: "Introduction", count: 5 },
  { id: "support", name: "Career services", count: 21 },
  { id: "approach", name: "Our approach", count: 11 },
  { id: "why", name: "Why choose Altiora", count: 7 },
  { id: "cta", name: "Closing banner", count: 3 },
];

const CareerEditor = () => {
  const editor = useEditablePage("career");
  const { page, uploadingImage, changeSectionField, changeListItem, uploadImage } = editor;

  // Upload the image of a section (its name is also the id of the image being uploaded)
  const uploadSectionImage = (sectionName, event) => {
    uploadImage(sectionName, (url) => changeSectionField(sectionName, "image", url), event);
  };

  if (!page) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the text..."}</p>;
  }

  const { banner, intro, support, approach, why, cta } = page;

  return (
    <AdminEditorLayout editor={editor} title="Career Guidance" viewUrl="/career-guidance" sections={sections}>
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

      <AdminPanel id="intro" title="Introduction" description="The opening text with two buttons, next to a photo." texts={5} images={1}>
        <div className="adm-split">
          <div className="adm-stack">
            <AdminField label="Small heading" value={intro.smallHeading} onChange={(value) => changeSectionField("intro", "smallHeading", value)} />
            <AdminField label="Heading" value={intro.heading} onChange={(value) => changeSectionField("intro", "heading", value)} />
            <AdminField label="Text" rows="6" value={intro.text} onChange={(value) => changeSectionField("intro", "text", value)} />
            <AdminField label="Primary button" value={intro.primaryButton} onChange={(value) => changeSectionField("intro", "primaryButton", value)} />
            <AdminField label="Secondary button" value={intro.secondaryButton} onChange={(value) => changeSectionField("intro", "secondaryButton", value)} />
          </div>
          <figure className="adm-figure">
            <img src={intro.image} alt="" />
            <AdminImageMeta
              imageUrl={intro.image}
              hint="Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP."
              isUploading={uploadingImage === "intro"}
              onPick={(event) => uploadSectionImage("intro", event)}
            />
          </figure>
        </div>
      </AdminPanel>

      <AdminPanel id="support" title="Career services" description="Nine cards on a light band." texts={21}>
        <div className="adm-grid-2">
          <AdminField label="Small heading" value={support.smallHeading} onChange={(value) => changeSectionField("support", "smallHeading", value)} />
          <AdminField label="Heading" value={support.heading} onChange={(value) => changeSectionField("support", "heading", value)} />
        </div>
        <div className="adm-stack adm-mt">
          <AdminField label="Text under heading" rows="2" value={support.text} onChange={(value) => changeSectionField("support", "text", value)} />
        </div>
        <h3 className="adm-sub">Cards</h3>
        <div className="adm-stack">
          {support.cards.map((card, index) => (
            <div className="adm-pair" key={index}>
              <AdminField label={`Card ${index + 1}: title`} value={card.title} onChange={(value) => changeListItem("support", "cards", index, "title", value)} />
              <AdminField label={`Card ${index + 1}: text`} rows="3" value={card.text} onChange={(value) => changeListItem("support", "cards", index, "text", value)} />
            </div>
          ))}
        </div>
      </AdminPanel>

      <AdminPanel id="approach" title="Our approach" description="The four-step process on the dark band." texts={11}>
        <div className="adm-grid-2">
          <AdminField label="Small heading" value={approach.smallHeading} onChange={(value) => changeSectionField("approach", "smallHeading", value)} />
          <AdminField label="Heading" value={approach.heading} onChange={(value) => changeSectionField("approach", "heading", value)} />
        </div>
        <div className="adm-stack adm-mt">
          <AdminField label="Text under heading" rows="2" value={approach.text} onChange={(value) => changeSectionField("approach", "text", value)} />
        </div>
        <h3 className="adm-sub">Steps, in order</h3>
        <ol className="adm-steps">
          {approach.steps.map((step, index) => (
            <li key={index}>
              <span className="adm-step-no">{index + 1}</span>
              <div className="adm-pair">
                <AdminField label={`Step ${index + 1}: title`} value={step.title} onChange={(value) => changeListItem("approach", "steps", index, "title", value)} />
                <AdminField label={`Step ${index + 1}: text`} rows="3" value={step.text} onChange={(value) => changeListItem("approach", "steps", index, "text", value)} />
              </div>
            </li>
          ))}
        </ol>
      </AdminPanel>

      <AdminPanel id="why" title="Why choose Altiora" description="A short pitch with four points, next to a photo." texts={7} images={1}>
        <div className="adm-split">
          <div className="adm-stack">
            <AdminField label="Small heading" value={why.smallHeading} onChange={(value) => changeSectionField("why", "smallHeading", value)} />
            <AdminField label="Heading" value={why.heading} onChange={(value) => changeSectionField("why", "heading", value)} />
            <AdminField label="Text" rows="3" value={why.text} onChange={(value) => changeSectionField("why", "text", value)} />
            {why.points.map((point, index) => (
              <AdminField
                key={index}
                label={`Point ${index + 1}`}
                value={point.text}
                onChange={(value) => changeListItem("why", "points", index, "text", value)}
              />
            ))}
          </div>
          <figure className="adm-figure">
            <img src={why.image} alt="" />
            <AdminImageMeta
              imageUrl={why.image}
              hint="Landscape, at least 1200 × 960 px. JPG, PNG or WebP."
              isUploading={uploadingImage === "why"}
              onPick={(event) => uploadSectionImage("why", event)}
            />
          </figure>
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

export default CareerEditor;
