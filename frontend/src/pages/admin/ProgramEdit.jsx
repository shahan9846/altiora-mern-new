// Admin → Training → Programs → Add or edit one program.
// Opened at /admin/training/programs/new (add) or /admin/training/programs/<id> (edit).
import { useParams } from "react-router-dom";
import useApiData from "../../hooks/useApiData";
import useItemEditor from "../../hooks/useItemEditor";
import AdminFormLayout from "../../components/admin/AdminFormLayout";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminField from "../../components/admin/AdminField";

// The check before saving: an error message, or "" when the program is fine
const findProblem = (program) => {
  if (!program.category) return "Please choose a category.";
  if (!program.title.trim() || !program.text.trim()) return "Please fill in the title and the text.";
  return "";
};

const ProgramEdit = () => {
  const { id } = useParams(); // missing when adding a new program
  const categories = useApiData("/training/admin/categories", []);

  // A link like ?category=<id> (from "Add a program here") picks that category
  const linkedCategory = new URLSearchParams(window.location.search).get("category") || "";
  const emptyProgram = { category: linkedCategory, title: "", text: "", tags: [], isVisible: true };

  const editor = useItemEditor({
    id,
    listUrl: "/training/admin/programs",
    itemUrl: "/training/programs",
    emptyItem: emptyProgram,
    backPath: "/admin/training/programs",
  });
  const { item: program, isNew, changeField } = editor;

  if (!program) {
    return <p className="adm-loading">{editor.statusMessage || "Loading the program..."}</p>;
  }

  const categoryOptions = [
    { value: "", label: "Choose a category" },
    ...categories.map((category) => ({ value: category._id, label: category.name })),
  ];

  return (
    <AdminFormLayout
      editor={editor}
      title={isNew ? "Add program" : program.title}
      description={isNew ? "Create a new training program." : "Edit this training program."}
      backUrl="/admin/training/programs"
      backLabel="← All programs"
      viewUrl={isNew ? undefined : "/training"}
      onSave={() => editor.saveItem(findProblem)}
    >
      <AdminPanel id="program" title="Program details" description="Shown inside its category on the Training page." texts={3}>
        <div className="adm-stack">
          <AdminField label="Category" value={program.category} options={categoryOptions} onChange={(value) => changeField("category", value)} />
          <AdminField label="Title" value={program.title} onChange={(value) => changeField("title", value)} />
          <AdminField label="Text" rows="3" value={program.text} onChange={(value) => changeField("text", value)} />
          <AdminField
            label="What you will learn (one short point per line, up to 8)"
            rows="5"
            value={program.tags.join("\n")}
            onChange={(value) => changeField("tags", value.split("\n"))}
          />
          <label className="adm-check">
            <input type="checkbox" checked={program.isVisible} onChange={(event) => changeField("isVisible", event.target.checked)} />
            Show this program on the website
          </label>
        </div>
      </AdminPanel>
    </AdminFormLayout>
  );
};

export default ProgramEdit;
