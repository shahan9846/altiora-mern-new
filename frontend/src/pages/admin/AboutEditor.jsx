// Admin → About page editor.
// Loading, typing, uploading and saving are handled by useEditablePage.
// This file only describes the fields of each About section.
import "../../styles/admin.css";
import useEditablePage from "../../hooks/useEditablePage";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import AdminPageBanner from "../../components/admin/AdminPageBanner";
import AdminOutline from "../../components/admin/AdminOutline";
import AdminSaveBar from "../../components/admin/AdminSaveBar";
import AdminAlertCard from "../../components/admin/AdminAlertCard";
import AdminField from "../../components/admin/AdminField";
import AdminImageMeta from "../../components/admin/AdminImageMeta";

// The links in the "On this page" list (id = section id, count = number of texts)
const sections = [
  { id: "banner", name: "Page banner", count: 1 },
  { id: "intro", name: "Who we are", count: 5 },
  { id: "foundation", name: "Vision, mission & belief", count: 9 },
  { id: "beliefs", name: "What we believe", count: 6 },
  { id: "values", name: "Our values", count: 12 },
  { id: "reasons", name: "Why choose us", count: 10 },
  { id: "cta", name: "Closing banner", count: 3 },
];

const AboutEditor = () => {
  const {
    page,
    hasUnsavedChanges,
    statusMessage,
    setStatusMessage,
    isError,
    isSaving,
    uploadingImage,
    changeSectionField,
    changeListItem,
    uploadImage,
    savePage,
  } = useEditablePage("about");

  // Upload the image of a section (its name is also the id of the image being uploaded)
  const uploadSectionImage = (sectionName, event) => {
    uploadImage(sectionName, (url) => changeSectionField(sectionName, "image", url), event);
  };

  if (!page) {
    return <p className="adm-loading">{statusMessage || "Loading the text..."}</p>;
  }

  // One short name for each section
  const { banner, intro, foundation, beliefs, values, reasons, cta } = page;

  return (
    <div className="adm-shell">
      <AdminSidebar />

      <div className="adm-main">
        <AdminTopbar />

        <div className="adm-scroll">
          <div className="adm-content">
            <AdminAlertCard message={statusMessage} isError={isError} onClose={() => setStatusMessage("")} />

            <AdminPageBanner title="About" viewUrl="/about" />

            <div className="adm-layout">
              <AdminOutline sections={sections} />

              <div className="adm-panels">
                <article className="adm-panel" id="banner" aria-labelledby="banner-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="banner-title">Page banner</h2>
                      <p>The title and photo at the very top of the page.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">1 text</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
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
                  </div>
                </article>

                <article className="adm-panel" id="intro" aria-labelledby="intro-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="intro-title">Who we are</h2>
                      <p>Introduces the firm next to a photo.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">5 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-split">
                      <div className="adm-stack">
                        <AdminField label="Small heading" value={intro.smallHeading} onChange={(value) => changeSectionField("intro", "smallHeading", value)} />
                        <AdminField label="Heading" value={intro.heading} onChange={(value) => changeSectionField("intro", "heading", value)} />
                        <AdminField label="First paragraph" rows="4" value={intro.paragraphOne} onChange={(value) => changeSectionField("intro", "paragraphOne", value)} />
                        <AdminField label="Second paragraph" rows="3" value={intro.paragraphTwo} onChange={(value) => changeSectionField("intro", "paragraphTwo", value)} />
                        <AdminField label="Button" value={intro.button} onChange={(value) => changeSectionField("intro", "button", value)} />
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
                  </div>
                </article>

                <article className="adm-panel" id="foundation" aria-labelledby="foundation-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="foundation-title">Vision, mission & belief</h2>
                      <p>Three cards on a light band with a faded photo.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">9 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <AdminField label="Small heading" value={foundation.smallHeading} onChange={(value) => changeSectionField("foundation", "smallHeading", value)} />
                      <AdminField label="Heading" value={foundation.heading} onChange={(value) => changeSectionField("foundation", "heading", value)} />
                    </div>
                    <div className="adm-stack adm-mt">
                      <AdminField label="Text under heading" rows="3" value={foundation.text} onChange={(value) => changeSectionField("foundation", "text", value)} />
                    </div>
                    <h3 className="adm-sub">Cards</h3>
                    <div className="adm-stack">
                      {foundation.cards.map((card, index) => (
                        <div className="adm-pair" key={index}>
                          <AdminField label={`Card ${index + 1}: title`} value={card.title} onChange={(value) => changeListItem("foundation", "cards", index, "title", value)} />
                          <AdminField label={`Card ${index + 1}: text`} rows="3" value={card.text} onChange={(value) => changeListItem("foundation", "cards", index, "text", value)} />
                        </div>
                      ))}
                    </div>
                    <h3 className="adm-sub">Background image</h3>
                    <div className="adm-image-row">
                      <img src={foundation.image} alt="" />
                      <AdminImageMeta
                        imageUrl={foundation.image}
                        hint="Wide, at least 1600 × 900 px. It is shown very faded behind the cards. JPG, PNG or WebP."
                        isUploading={uploadingImage === "foundation"}
                        onPick={(event) => uploadSectionImage("foundation", event)}
                      />
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="beliefs" aria-labelledby="beliefs-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="beliefs-title">What we believe</h2>
                      <p>A short list of principles next to a photo.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">6 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-split">
                      <div className="adm-stack">
                        <AdminField label="Small heading" value={beliefs.smallHeading} onChange={(value) => changeSectionField("beliefs", "smallHeading", value)} />
                        <AdminField label="Heading" value={beliefs.heading} onChange={(value) => changeSectionField("beliefs", "heading", value)} />
                        {beliefs.points.map((point, index) => (
                          <AdminField
                            key={index}
                            label={`Principle ${index + 1}`}
                            rows="2"
                            value={point.text}
                            onChange={(value) => changeListItem("beliefs", "points", index, "text", value)}
                          />
                        ))}
                      </div>
                      <figure className="adm-figure">
                        <img src={beliefs.image} alt="" />
                        <AdminImageMeta
                          imageUrl={beliefs.image}
                          hint="Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP."
                          isUploading={uploadingImage === "beliefs"}
                          onPick={(event) => uploadSectionImage("beliefs", event)}
                        />
                      </figure>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="values" aria-labelledby="values-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="values-title">Our values</h2>
                      <p>Five value cards.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">12 texts</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <AdminField label="Small heading" value={values.smallHeading} onChange={(value) => changeSectionField("values", "smallHeading", value)} />
                      <AdminField label="Heading" value={values.heading} onChange={(value) => changeSectionField("values", "heading", value)} />
                    </div>
                    <h3 className="adm-sub">Cards</h3>
                    <div className="adm-stack">
                      {values.cards.map((card, index) => (
                        <div className="adm-pair" key={index}>
                          <AdminField label={`Value ${index + 1}: title`} value={card.title} onChange={(value) => changeListItem("values", "cards", index, "title", value)} />
                          <AdminField label={`Value ${index + 1}: text`} rows="2" value={card.text} onChange={(value) => changeListItem("values", "cards", index, "text", value)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="reasons" aria-labelledby="reasons-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="reasons-title">Why choose us</h2>
                      <p>Four cards on the dark band.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">10 texts</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <AdminField label="Small heading" value={reasons.smallHeading} onChange={(value) => changeSectionField("reasons", "smallHeading", value)} />
                      <AdminField label="Heading" value={reasons.heading} onChange={(value) => changeSectionField("reasons", "heading", value)} />
                    </div>
                    <h3 className="adm-sub">Cards</h3>
                    <div className="adm-stack">
                      {reasons.cards.map((card, index) => (
                        <div className="adm-pair" key={index}>
                          <AdminField label={`Card ${index + 1}: title`} value={card.title} onChange={(value) => changeListItem("reasons", "cards", index, "title", value)} />
                          <AdminField label={`Card ${index + 1}: text`} rows="2" value={card.text} onChange={(value) => changeListItem("reasons", "cards", index, "text", value)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="cta" aria-labelledby="cta-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="cta-title">Closing banner</h2>
                      <p>The last call to action above the footer.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">3 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-stack">
                      <AdminField label="Heading" value={cta.heading} onChange={(value) => changeSectionField("cta", "heading", value)} />
                      <AdminField label="Text" rows="2" value={cta.text} onChange={(value) => changeSectionField("cta", "text", value)} />
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
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <AdminSaveBar
          onSave={savePage}
          statusMessage={statusMessage}
          isError={isError}
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </div>
    </div>
  );
};

export default AboutEditor;
