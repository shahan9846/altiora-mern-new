// The frame around every page editor: the admin shell, page banner,
// "On this page" outline, the save bar, and the messages.
// A page editor only has to give it the section panels as children.
//   editor   - what useEditablePage returned
//   title    - the page name, for example "Why Altiora"
//   viewUrl  - where the "View page" button goes
//   sections - the outline links: [{ id, name, count }]
import AdminShell from "./AdminShell";
import AdminPageBanner from "./AdminPageBanner";
import AdminOutline from "./AdminOutline";
import AdminSaveBar from "./AdminSaveBar";
import AdminAlertCard from "./AdminAlertCard";

const AdminEditorLayout = ({ editor, title, viewUrl, sections, children }) => {
  const saveBar = (
    <AdminSaveBar
      onSave={editor.savePage}
      statusMessage={editor.statusMessage}
      isError={editor.isError}
      isSaving={editor.isSaving}
      hasUnsavedChanges={editor.hasUnsavedChanges}
    />
  );

  return (
    <AdminShell footer={saveBar}>
      <AdminAlertCard message={editor.statusMessage} isError={editor.isError} onClose={() => editor.setStatusMessage("")} />

      <AdminPageBanner title={title} viewUrl={viewUrl} />

      <div className="adm-layout">
        <AdminOutline sections={sections} />
        <div className="adm-panels">{children}</div>
      </div>
    </AdminShell>
  );
};

export default AdminEditorLayout;
