// Admin → Training → Categories → Add or edit one category.
// Opened at /admin/training/categories/new (add) or /admin/training/categories/<id> (edit).
import { useParams } from "react-router-dom";
import useItemEditor from "../../hooks/useItemEditor";
import AdminFormLayout from "../../components/admin/AdminFormLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";

const emptyCategory = { name: "", description: "", isVisible: true };

// The check before saving: an error message, or "" when the category is fine
const findProblem = (category) => {
  if (!category.name.trim() || !category.description.trim()) return "Please fill in the name and the description.";
  return "";
};

const CategoryEdit = () => {
  const { id } = useParams(); // missing when adding a new category
  const editor = useItemEditor({
    id,
    listUrl: "/training/admin/categories",
    itemUrl: "/training/categories",
    emptyItem: emptyCategory,
    backPath: "/admin/training/categories",
  });
  const { item: category, isNew, changeField } = editor;

  if (!category) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the category..."}</p>;
  }

  return (
    <AdminFormLayout
      editor={editor}
      title={isNew ? "Add category" : category.name}
      description={isNew ? "Create a new training area." : "Edit this training area."}
      backUrl="/admin/training/categories"
      backLabel="← All categories"
      viewUrl={isNew ? undefined : "/training"}
      onSave={() => editor.saveItem(findProblem)}
    >
      <AdminPanel id="category" title="Category details" description="Shown on the Training page." texts={2}>
        <div className="adm-stack">
          <AdminField label="Name" value={category.name} onChange={(value) => changeField("name", value)} />
          <AdminField label="Description" rows="4" value={category.description} onChange={(value) => changeField("description", value)} />
          <label className="adm-check">
            <input type="checkbox" checked={category.isVisible} onChange={(event) => changeField("isVisible", event.target.checked)} />
            Show this category on the website
          </label>
        </div>
      </AdminPanel>
    </AdminFormLayout>
  );
};

export default CategoryEdit;
