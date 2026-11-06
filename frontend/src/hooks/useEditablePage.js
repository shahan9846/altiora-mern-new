// Everything an admin page editor needs, so each page editor only has to show its fields.
// Usage:  const editor = useEditablePage("home");
//
// It loads the page from the backend, keeps what the admin is typing,
// uploads images, and saves everything with one request.
import { useEffect, useState } from "react";
import api from "../api/api";

const useEditablePage = (pageName) => {
  const [page, setPage] = useState(null); // all sections of the page, as the admin is typing
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false); // true when statusMessage is an error
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null); // which image is uploading, for example "about"

  // When the editor opens, load the saved text
  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await api.get(`/pages/${pageName}`);
        setPage(response.data);
      } catch {
        setIsError(true);
        setStatusMessage("Could not load the text. Please refresh the page.");
      }
    };
    loadPage();
  }, [pageName]);

  // Auto-dismiss the success message after 5 seconds so it doesn't linger forever
  useEffect(() => {
    if (statusMessage && !isError) {
      const timer = setTimeout(() => setStatusMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, isError]);

  // Warn the admin if they close or reload the tab with changes that are not saved
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const warnBeforeLeaving = (event) => event.preventDefault();
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [hasUnsavedChanges]);

  // Every change goes through this: it updates the page and marks it as "not saved yet"
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

  // Save changes: send all the sections to the backend
  const savePage = async () => {
    setIsSaving(true);
    setIsError(false);
    setStatusMessage("");

    const startTime = Date.now();
    try {
      await api.put(`/pages/${pageName}`, page);

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

  return {
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
  };
};

export default useEditablePage;
