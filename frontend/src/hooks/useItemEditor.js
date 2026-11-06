// Everything an "add or edit one item" admin screen needs (a service, a training area, a program).
//
//   id        - the item id, or nothing when adding a new item
//   listUrl   - where to load all items (the item to edit is picked from this list)
//   itemUrl   - the base address of one item, for example "/services"
//   emptyItem - what a brand-new item looks like
//   backPath  - the screen to go back to after adding a new item
//
// It returns the item, the messages, and saveItem(findProblem):
// findProblem(item) gives an error message, or "" when the item is fine.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const useItemEditor = ({ id, listUrl, itemUrl, emptyItem, backPath }) => {
  const isNew = !id;
  const navigate = useNavigate();

  const [item, setItem] = useState(isNew ? emptyItem : null); // null while loading
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const showError = (message) => {
    setIsError(true);
    setStatusMessage(message);
  };

  // When editing, load the list and pick our item from it
  useEffect(() => {
    if (isNew) return;

    const loadItem = async () => {
      try {
        const response = await api.get(listUrl);
        const found = response.data.find((other) => other._id === id);

        if (found) {
          setItem(found);
        } else {
          setIsError(true);
          setStatusMessage("This item was not found.");
        }
      } catch (error) {
        setIsError(true);
        setStatusMessage(error.response?.data?.message || "Could not load the item. Please refresh the page.");
      }
    };
    loadItem();
  }, [id, isNew, listUrl]);

  // Auto-dismiss the success message after 5 seconds
  useEffect(() => {
    if (statusMessage && !isError) {
      const timer = setTimeout(() => setStatusMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, isError]);

  // Change one field, for example ("title", "New title")
  const changeField = (fieldName, newValue) => {
    setItem((current) => ({ ...current, [fieldName]: newValue }));
    setHasUnsavedChanges(true);
    if (statusMessage === "Saved") setStatusMessage("");
  };

  const saveItem = async (findProblem) => {
    const problem = findProblem(item);
    if (problem) {
      showError(problem);
      return;
    }

    setIsSaving(true);
    setIsError(false);
    setStatusMessage("");

    try {
      if (isNew) {
        await api.post(itemUrl, item);
        navigate(backPath); // back to the list, where the new item now appears
        return;
      }

      const response = await api.put(`${itemUrl}/${id}`, item);
      setItem(response.data);
      setHasUnsavedChanges(false);
      setStatusMessage("Saved");
    } catch (error) {
      // Keep what the admin typed, so nothing is lost, and show the reason
      showError(error.response?.data?.message || "Cannot reach the server. Your changes were not saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return { item, isNew, changeField, hasUnsavedChanges, statusMessage, setStatusMessage, isError, showError, isSaving, saveItem };
};

export default useItemEditor;
