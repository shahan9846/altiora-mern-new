// Admin → Services → Add or edit one service.
// Opened at /admin/services/new (add) or /admin/services/<id> (edit).
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import useItemEditor from "../../hooks/useItemEditor";
import AdminFormLayout from "../../components/admin/AdminFormLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";
import AdminImageMeta from "../../components/admin/AdminImageMeta";

const emptyService = { title: "", text: "", image: "", isVisible: true };

// The check before saving: an error message, or "" when the service is fine
const findProblem = (service) => {
  if (!service.title.trim() || !service.text.trim()) return "Please fill in the title and the text.";
  if (!service.image) return "Please add an image for the service.";
  return "";
};

const ServiceEdit = () => {
  const { id } = useParams(); // missing when adding a new service
  const editor = useItemEditor({
    id,
    listUrl: "/services/admin/all",
    itemUrl: "/services",
    emptyItem: emptyService,
    backPath: "/admin/services",
  });
  const { item: service, isNew, changeField, showError } = editor;
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      changeField("image", response.data.imageUrl);
    } catch (error) {
      showError(error.response?.data?.message || "Could not upload image. Please try again.");
    } finally {
      setIsUploading(false);
      event.target.value = ""; // so the same file can be chosen again
    }
  };

  if (!service) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the service..."}</p>;
  }

  return (
    <AdminFormLayout
      editor={editor}
      title={isNew ? "Add service" : service.title}
      description={isNew ? "Create a new service. It gets its own page on the website." : "Edit this service."}
      backUrl="/admin/services"
      backLabel="← All services"
      viewUrl={isNew ? undefined : `/services/${service.slug}`}
      onSave={() => editor.saveItem(findProblem)}
    >
      <AdminPanel id="service" title="Service details" description="Shown on the cards and on the service's own page." texts={2} images={1}>
        <div className="adm-stack">
          <AdminField label="Title" value={service.title} onChange={(value) => changeField("title", value)} />
          <AdminField
            label="Text"
            rows="5"
            maxLength={400}
            hint="The cards show the first 4 lines. The service page shows all of it."
            value={service.text}
            onChange={(value) => changeField("text", value)}
          />
          <label className="adm-check">
            <input type="checkbox" checked={service.isVisible} onChange={(event) => changeField("isVisible", event.target.checked)} />
            Show this service on the website
          </label>
          <p className="adm-web-address">
            Web address: {isNew ? "created from the title when you save" : `/services/${service.slug}`}
          </p>
        </div>
        <h3 className="adm-sub">Image</h3>
        <div className="adm-image-row">
          {service.image ? <img src={service.image} alt="" /> : <div className="adm-empty">No image yet</div>}
          <AdminImageMeta
            imageUrl={service.image}
            hint="Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP."
            isUploading={isUploading}
            onPick={uploadImage}
          />
        </div>
      </AdminPanel>
    </AdminFormLayout>
  );
};

export default ServiceEdit;
