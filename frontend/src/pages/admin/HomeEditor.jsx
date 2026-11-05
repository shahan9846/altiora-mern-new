// Admin → Home page editor.
// Every section is live: the text and images load from the backend,
// change as the admin types, and are all saved together with "Save changes".
import { useEffect, useState } from "react";
import "../../styles/admin.css";
import api from "../../api/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import AdminPageBanner from "../../components/admin/AdminPageBanner";
import AdminOutline from "../../components/admin/AdminOutline";
import AdminSaveBar from "../../components/admin/AdminSaveBar";
import AdminAlertCard from "../../components/admin/AdminAlertCard";
import AdminField from "../../components/admin/AdminField";
import AdminImageMeta from "../../components/admin/AdminImageMeta";

// Small icons shown next to the five Value strip rows (they cannot be edited)
const valueChips = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 8a3 3 0 1 0 0 .01M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM9 14 7.5 21 12 18.5 16.5 21 15 14" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 18.5 9 12l4 3 7.5-8.5M15.5 6.5h5v5" /></svg>,
];

const HomeEditor = () => {
  const [page, setPage] = useState(null); // all sections of the Home page, as the admin is typing
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false); // true when statusMessage is an error
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null); // which image is uploading, for example "about" or "hero-1"

  // When the page opens, load the saved text
  useEffect(() => {
    const loadHome = async () => {
      try {
        const response = await api.get("/pages/home");
        setPage(response.data);
      } catch (error) {
        setIsError(true);
        setStatusMessage("Could not load the text. Please refresh the page.");
      }
    };
    loadHome();
  }, []);

  // Auto-dismiss the success message after 5 seconds so it doesn't linger forever
  useEffect(() => {
    if (statusMessage && !isError) {
      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, isError]);

  // Every change below goes through this: it updates the page and marks it as "not saved yet"
  const updatePage = (makeNewPage) => {
    setPage(makeNewPage);
    setHasUnsavedChanges(true);
    if (statusMessage === "Saved") {
      setStatusMessage("");
    }
  };

  // Change one field of a section, for example ("about", "heading", "New heading")
  const changeSectionField = (sectionName, fieldName, newValue) => {
    updatePage((currentPage) => ({
      ...currentPage,
      [sectionName]: { ...currentPage[sectionName], [fieldName]: newValue },
    }));
  };

  // Change one field of one item in a list, for example ("services", "cards", 2, "title", "New title")
  const changeListItem = (sectionName, listName, itemIndex, fieldName, newValue) => {
    updatePage((currentPage) => {
      const section = currentPage[sectionName];
      const newList = section[listName].map((item, index) =>
        index === itemIndex ? { ...item, [fieldName]: newValue } : item
      );
      return { ...currentPage, [sectionName]: { ...section, [listName]: newList } };
    });
  };

  // The Hero editor uses these two short names
  const changeSlideField = (slideIndex, fieldName, newValue) => {
    changeListItem("hero", "slides", slideIndex, fieldName, newValue);
  };

  const changeButtonText = (buttonName, newValue) => {
    changeSectionField("hero", buttonName, newValue);
  };

  // Upload the chosen file, then give the new image URL to saveUrl.
  // uploadId says which image is uploading, so only that button shows "Uploading...".
  const uploadImage = async (uploadId, saveUrl, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(uploadId);
    setIsError(false);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      saveUrl(response.data.imageUrl);
    } catch (error) {
      setIsError(true);
      setStatusMessage(error.response?.data?.message || "Could not upload image. Please try again.");
    } finally {
      setUploadingImage(null);
      // Reset the file input so the admin can re-select the same image if needed
      event.target.value = "";
    }
  };

  // One image for a whole section (About, Approach, Training, Closing banner)
  const uploadSectionImage = (sectionName, event) => {
    uploadImage(sectionName, (url) => changeSectionField(sectionName, "image", url), event);
  };

  // The image of one Services card
  const uploadCardImage = (cardIndex, event) => {
    uploadImage(`card-${cardIndex}`, (url) => changeListItem("services", "cards", cardIndex, "image", url), event);
  };

  // The image of one Hero slide
  const uploadSlideImage = (slideIndex, event) => {
    uploadImage(`hero-${slideIndex}`, (url) => changeSlideField(slideIndex, "image", url), event);
  };

  // Save changes: send all the sections to the backend
  const saveHome = async () => {
    setIsSaving(true);
    setIsError(false);
    setStatusMessage("");

    const startTime = Date.now();
    try {
      await api.put("/pages/home", page);

      // Guarantee a minimum loading duration (700ms) so the spinner animation
      // is smooth and visible, preventing the jarring split-second flash
      const elapsed = Date.now() - startTime;
      if (elapsed < 700) {
        await new Promise((resolve) => setTimeout(resolve, 700 - elapsed));
      }

      setHasUnsavedChanges(false);
      setStatusMessage("Saved");
    } catch (error) {
      const elapsed = Date.now() - startTime;
      if (elapsed < 500) {
        await new Promise((resolve) => setTimeout(resolve, 500 - elapsed));
      }

      // The save failed: keep what the admin typed, so nothing is lost, and show the reason
      setIsError(true);
      setStatusMessage(error.response?.data?.message || "Cannot reach the server. Your changes were not saved.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!page) {
    return <p className="adm-loading">{statusMessage || "Loading the text..."}</p>;
  }

  // One short name for each section
  const { hero, valueStrip, about, services, why, approach, training, cta } = page;

  return (
    <div className="adm-shell">
      <AdminSidebar />

      <div className="adm-main">
        <AdminTopbar />

        <div className="adm-scroll">
          <div className="adm-content">
            <AdminAlertCard
              message={statusMessage}
              isError={isError}
              onClose={() => setStatusMessage("")}
            />

            <AdminPageBanner />

            <div className="adm-layout">
              <AdminOutline />

              <div className="adm-panels">
                <article className="adm-panel" id="hero" aria-labelledby="hero-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="hero-title">Hero</h2>
                      <p>The first screen visitors see. Three slides rotate, each with its own photo.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">14 texts</span>
                      <span className="adm-count">3 images</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-slides">
                      <div className="adm-slide">
                        <div className="adm-slide-photo">
                          <img src={hero.slides[0].image} alt="Slide 1" />
                          <span>Slide 1</span>
                        </div>
                        <div className="adm-image-meta">
                          <p className="adm-file">{hero.slides[0].image?.split("/").pop()}</p>
                          <p className="adm-hint">Landscape, at least 1600 × 1067 px. Keep faces near the centre because the edges are cropped. JPG, PNG or WebP.</p>
                          <label className="adm-upload">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              disabled={uploadingImage === "hero-0"}
                              onChange={(event) => uploadSlideImage(0, event)}
                            />
                            <span>{uploadingImage === "hero-0" ? "Uploading..." : "Change image"}</span>
                          </label>
                          <p className="adm-hint">Max file size: 5 MB</p>
                        </div>
                        <div className="adm-slide-fields">
                          <div className="adm-field">
                            <label htmlFor="f1">Slide 1: small heading</label>
                            <input id="f1" type="text" value={hero.slides[0].smallHeading} onChange={(event) => changeSlideField(0, "smallHeading", event.target.value)} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f2">Slide 1: heading line 1</label>
                            <input id="f2" type="text" value={hero.slides[0].headingLine1} onChange={(event) => changeSlideField(0, "headingLine1", event.target.value)} />
                          </div>
                          <div className="adm-field is-gold">
                            <label htmlFor="f3">Slide 1: heading line 2 (gold)</label>
                            <input id="f3" type="text" value={hero.slides[0].headingLine2} onChange={(event) => changeSlideField(0, "headingLine2", event.target.value)} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f4">Slide 1: text</label>
                            <textarea id="f4" rows="3" value={hero.slides[0].text} onChange={(event) => changeSlideField(0, "text", event.target.value)}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-slide">
                        <div className="adm-slide-photo">
                          <img src={hero.slides[1].image} alt="Slide 2" className="pos-right" />
                          <span>Slide 2</span>
                        </div>
                        <div className="adm-image-meta">
                          <p className="adm-file">{hero.slides[1].image?.split("/").pop()}</p>
                          <p className="adm-hint">Landscape, at least 1600 × 1067 px. Keep faces near the centre because the edges are cropped. JPG, PNG or WebP.</p>
                          <label className="adm-upload">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              disabled={uploadingImage === "hero-1"}
                              onChange={(event) => uploadSlideImage(1, event)}
                            />
                            <span>{uploadingImage === "hero-1" ? "Uploading..." : "Change image"}</span>
                          </label>
                          <p className="adm-hint">Max file size: 5 MB</p>
                        </div>
                        <div className="adm-slide-fields">
                          <div className="adm-field">
                            <label htmlFor="f5">Slide 2: small heading</label>
                            <input id="f5" type="text" value={hero.slides[1].smallHeading} onChange={(event) => changeSlideField(1, "smallHeading", event.target.value)} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f6">Slide 2: heading line 1</label>
                            <input id="f6" type="text" value={hero.slides[1].headingLine1} onChange={(event) => changeSlideField(1, "headingLine1", event.target.value)} />
                          </div>
                          <div className="adm-field is-gold">
                            <label htmlFor="f7">Slide 2: heading line 2 (gold)</label>
                            <input id="f7" type="text" value={hero.slides[1].headingLine2} onChange={(event) => changeSlideField(1, "headingLine2", event.target.value)} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f8">Slide 2: text</label>
                            <textarea id="f8" rows="3" value={hero.slides[1].text} onChange={(event) => changeSlideField(1, "text", event.target.value)}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-slide">
                        <div className="adm-slide-photo">
                          <img src={hero.slides[2].image} alt="Slide 3" className="pos-left" />
                          <span>Slide 3</span>
                        </div>
                        <div className="adm-image-meta">
                          <p className="adm-file">{hero.slides[2].image?.split("/").pop()}</p>
                          <p className="adm-hint">Landscape, at least 1600 × 1067 px. Keep faces near the centre because the edges are cropped. JPG, PNG or WebP.</p>
                          <label className="adm-upload">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              disabled={uploadingImage === "hero-2"}
                              onChange={(event) => uploadSlideImage(2, event)}
                            />
                            <span>{uploadingImage === "hero-2" ? "Uploading..." : "Change image"}</span>
                          </label>
                          <p className="adm-hint">Max file size: 5 MB</p>
                        </div>
                        <div className="adm-slide-fields">
                          <div className="adm-field">
                            <label htmlFor="f9">Slide 3: small heading</label>
                            <input id="f9" type="text" value={hero.slides[2].smallHeading} onChange={(event) => changeSlideField(2, "smallHeading", event.target.value)} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f10">Slide 3: heading line 1</label>
                            <input id="f10" type="text" value={hero.slides[2].headingLine1} onChange={(event) => changeSlideField(2, "headingLine1", event.target.value)} />
                          </div>
                          <div className="adm-field is-gold">
                            <label htmlFor="f11">Slide 3: heading line 2 (gold)</label>
                            <input id="f11" type="text" value={hero.slides[2].headingLine2} onChange={(event) => changeSlideField(2, "headingLine2", event.target.value)} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f12">Slide 3: text</label>
                            <textarea id="f12" rows="3" value={hero.slides[2].text} onChange={(event) => changeSlideField(2, "text", event.target.value)}></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="adm-sub">Buttons</h3>
                    <div className="adm-grid-2">
                      <div className="adm-field">
                        <label htmlFor="f13">Primary button</label>
                        <input id="f13" type="text" value={hero.primaryButton} onChange={(event) => changeButtonText("primaryButton", event.target.value)} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f14">Secondary button</label>
                        <input id="f14" type="text" value={hero.secondaryButton} onChange={(event) => changeButtonText("secondaryButton", event.target.value)} />
                      </div>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="values" aria-labelledby="values-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="values-title">Value strip</h2>
                      <p>Five short promises shown directly under the hero.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">10 texts</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-rows">
                      {valueStrip.items.map((item, index) => (
                        <div className="adm-row adm-row-values" key={index}>
                          <span className="adm-chip" aria-hidden="true">{valueChips[index]}</span>
                          <AdminField
                            label={`Item ${index + 1}: title`}
                            hideLabel
                            value={item.title}
                            onChange={(value) => changeListItem("valueStrip", "items", index, "title", value)}
                          />
                          <AdminField
                            label={`Item ${index + 1}: text`}
                            hideLabel
                            value={item.text}
                            onChange={(value) => changeListItem("valueStrip", "items", index, "text", value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="about" aria-labelledby="about-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="about-title">About Altiora</h2>
                      <p>Introduces the firm next to the team photo.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">5 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-split">
                      <div className="adm-stack">
                        <AdminField label="Small heading" value={about.smallHeading} onChange={(value) => changeSectionField("about", "smallHeading", value)} />
                        <AdminField label="Heading" value={about.heading} onChange={(value) => changeSectionField("about", "heading", value)} />
                        <AdminField label="Intro text" rows="3" value={about.intro} onChange={(value) => changeSectionField("about", "intro", value)} />
                        <AdminField label="Second paragraph" rows="3" value={about.secondParagraph} onChange={(value) => changeSectionField("about", "secondParagraph", value)} />
                        <AdminField label="Button" value={about.button} onChange={(value) => changeSectionField("about", "button", value)} />
                      </div>
                      <figure className="adm-figure">
                        <img src={about.image} alt="" />
                        <AdminImageMeta
                          imageUrl={about.image}
                          hint="Landscape, at least 1600 × 1067 px (3:2). JPG, PNG or WebP."
                          isUploading={uploadingImage === "about"}
                          onPick={(event) => uploadSectionImage("about", event)}
                        />
                      </figure>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="services" aria-labelledby="services-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="services-title">Services</h2>
                      <p>Five service cards in a scrolling row.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">15 texts</span>
                      <span className="adm-count">5 images</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <AdminField label="Small heading" value={services.smallHeading} onChange={(value) => changeSectionField("services", "smallHeading", value)} />
                      <AdminField label="Heading" rows="2" value={services.heading} onChange={(value) => changeSectionField("services", "heading", value)} />
                    </div>
                    <div className="adm-stack adm-mt">
                      <AdminField label="Text under heading" rows="2" value={services.text} onChange={(value) => changeSectionField("services", "text", value)} />
                    </div>
                    <h3 className="adm-sub">Service cards</h3>
                    <div className="adm-items">
                      {services.cards.map((card, index) => (
                        <div className="adm-item" key={index}>
                          <div className="adm-item-media">
                            <img src={card.image} alt="" />
                            <AdminImageMeta
                              imageUrl={card.image}
                              hint="Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP."
                              isUploading={uploadingImage === `card-${index}`}
                              onPick={(event) => uploadCardImage(index, event)}
                            />
                          </div>
                          <div className="adm-stack">
                            <AdminField label={`Service ${index + 1}: title`} value={card.title} onChange={(value) => changeListItem("services", "cards", index, "title", value)} />
                            <AdminField label={`Service ${index + 1}: text`} rows="3" value={card.text} onChange={(value) => changeListItem("services", "cards", index, "text", value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <h3 className="adm-sub">Links</h3>
                    <div className="adm-grid-2">
                      <AdminField label="Card link label" value={services.cardLinkLabel} onChange={(value) => changeSectionField("services", "cardLinkLabel", value)} />
                      <AdminField label="View all button" value={services.viewAllButton} onChange={(value) => changeSectionField("services", "viewAllButton", value)} />
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="why" aria-labelledby="why-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="why-title">Why Altiora</h2>
                      <p>A short pitch with four highlights beside it.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">12 texts</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-stack">
                      <AdminField label="Small heading" value={why.smallHeading} onChange={(value) => changeSectionField("why", "smallHeading", value)} />
                      <AdminField label="Heading" value={why.heading} onChange={(value) => changeSectionField("why", "heading", value)} />
                      <AdminField label="Text" rows="3" value={why.text} onChange={(value) => changeSectionField("why", "text", value)} />
                      <AdminField label="Button" value={why.button} onChange={(value) => changeSectionField("why", "button", value)} />
                    </div>
                    <h3 className="adm-sub">Highlights</h3>
                    <div className="adm-grid-2">
                      {why.highlights.map((highlight, index) => (
                        <div className="adm-pair" key={index}>
                          <AdminField label={`Highlight ${index + 1}: value`} value={highlight.value} onChange={(value) => changeListItem("why", "highlights", index, "value", value)} />
                          <AdminField label={`Highlight ${index + 1}: label`} value={highlight.label} onChange={(value) => changeListItem("why", "highlights", index, "label", value)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="approach" aria-labelledby="approach-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="approach-title">Our approach</h2>
                      <p>The four-step process on the dark band.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">11 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
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
                    <h3 className="adm-sub">Background image</h3>
                    <div className="adm-image-row">
                      <img src={approach.image} alt="" />
                      <AdminImageMeta
                        imageUrl={approach.image}
                        hint="Wide, at least 1600 × 900 px. A dark overlay is added on top. JPG, PNG or WebP."
                        isUploading={uploadingImage === "approach"}
                        onPick={(event) => uploadSectionImage("approach", event)}
                      />
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="training" aria-labelledby="training-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="training-title">Training programs</h2>
                      <p>Programme summary, headline numbers and category tags.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">16 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <AdminField label="Small heading" value={training.smallHeading} onChange={(value) => changeSectionField("training", "smallHeading", value)} />
                      <AdminField label="Heading" value={training.heading} onChange={(value) => changeSectionField("training", "heading", value)} />
                    </div>
                    <div className="adm-stack adm-mt">
                      <AdminField label="Text" rows="3" value={training.text} onChange={(value) => changeSectionField("training", "text", value)} />
                    </div>
                    <h3 className="adm-sub">Number labels</h3>
                    <div className="adm-grid-3">
                      {training.numbers.map((number, index) => (
                        <AdminField
                          key={index}
                          label={`Number ${index + 1}: label`}
                          value={number.label}
                          onChange={(value) => changeListItem("training", "numbers", index, "label", value)}
                        />
                      ))}
                    </div>
                    <h3 className="adm-sub">Category tags</h3>
                    <div className="adm-grid-2">
                      {training.tags.map((tag, index) => (
                        <AdminField
                          key={index}
                          label={`Category ${index + 1}`}
                          hideLabel
                          value={tag.text}
                          onChange={(value) => changeListItem("training", "tags", index, "text", value)}
                        />
                      ))}
                    </div>
                    <div className="adm-stack adm-mt">
                      <AdminField label="Button" value={training.button} onChange={(value) => changeSectionField("training", "button", value)} />
                    </div>
                    <h3 className="adm-sub">Section photo</h3>
                    <div className="adm-image-row">
                      <img src={training.image} alt="" />
                      <AdminImageMeta
                        imageUrl={training.image}
                        hint="Landscape, at least 1600 × 1067 px (3:2). JPG, PNG or WebP."
                        isUploading={uploadingImage === "training"}
                        onPick={(event) => uploadSectionImage("training", event)}
                      />
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
          onSave={saveHome}
          statusMessage={statusMessage}
          isError={isError}
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </div>
    </div>
  );
};

export default HomeEditor;
