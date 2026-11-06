// Everything an admin list screen needs (services, training areas, programs...):
// load the items, move them up or down, hide or show them, and delete them.
// Every change is sent to the backend straight away.
//
//   listUrl    - where to load all items, for example "/services/admin/all"
//   itemUrl    - the base address of one item, for example "/services" (then "/services/<id>")
//   reorderUrl - where to send a new order, for example "/services/reorder"
import { useEffect, useState } from "react";
import api from "../api/api";

const useManagedList = ({ listUrl, itemUrl, reorderUrl }) => {
  const [items, setItems] = useState(null); // null while loading
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const showError = (error, fallbackMessage) => {
    setIsError(true);
    setStatusMessage(error.response?.data?.message || fallbackMessage);
  };

  // Load the items when the screen opens
  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await api.get(listUrl);
        setItems(response.data);
      } catch (error) {
        showError(error, "Could not load the list. Please refresh the page.");
      }
    };
    loadItems();
  }, [listUrl]);

  // Show newItems right away, and tell the backend the new order (ids = the item ids, first = shown first).
  // If that fails, the old order comes back.
  const saveOrder = async (newItems, ids) => {
    const oldItems = items;
    setItems(newItems);

    try {
      await api.put(reorderUrl, { ids });
      setStatusMessage("");
    } catch (error) {
      setItems(oldItems);
      showError(error, "Could not change the order. Please try again.");
    }
  };

  // Move an item one place up (-1) or down (+1) in the whole list
  const moveItem = (index, direction) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(index, 1);
    newItems.splice(index + direction, 0, movedItem);

    saveOrder(newItems, newItems.map((item) => item._id));
  };

  // Show or hide an item on the website
  const toggleVisible = async (item) => {
    try {
      const response = await api.put(`${itemUrl}/${item._id}`, { ...item, isVisible: !item.isVisible });
      setItems(items.map((other) => (other._id === item._id ? { ...other, ...response.data } : other)));
      setStatusMessage("");
    } catch (error) {
      showError(error, "Could not change the item. Please try again.");
    }
  };

  // Delete an item after asking "are you sure?" (extraWarning is added to the question)
  const deleteItem = async (item, name, extraWarning = "") => {
    const isSure = window.confirm(`Delete "${name}"? ${extraWarning}This cannot be undone.`);
    if (!isSure) return;

    try {
      await api.delete(`${itemUrl}/${item._id}`);
      setItems(items.filter((other) => other._id !== item._id));
      setIsError(false);
      setStatusMessage("Deleted");
    } catch (error) {
      showError(error, "Could not delete the item. Please try again.");
    }
  };

  return { items, setItems, statusMessage, setStatusMessage, isError, setIsError, saveOrder, moveItem, toggleVisible, deleteItem };
};

export default useManagedList;
