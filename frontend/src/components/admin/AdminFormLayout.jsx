// The frame of an admin "add or edit one item" screen: the shell, banner, messages,
// the fields (children) and the save bar.
//   editor   - what useItemEditor returned
//   title / description - the banner text
//   backUrl / backLabel - the small link above the title
//   viewUrl  - optional "View page" button (leave out for a new item)
//   onSave   - called when the admin clicks Save
import AdminShell from "./AdminShell";
import AdminPageBanner from "./AdminPageBanner";
import AdminAlertCard from "./AdminAlertCard";
import AdminSaveBar from "./AdminSaveBar";

const AdminFormLayout = ({ editor, title, description, backUrl, backLabel, viewUrl, onSave, children }) => {
  const saveBar = (
    <AdminSaveBar
      onSave={onSave}
      statusMessage={editor.statusMessage}
      isError={editor.isError}
      isSaving={editor.isSaving}
      hasUnsavedChanges={editor.hasUnsavedChanges}
      idleMessage="No changes to save"
    />
  );

  return (
    <AdminShell footer={saveBar}>
      <AdminAlertCard message={editor.statusMessage} isError={editor.isError} onClose={() => editor.setStatusMessage("")} />

      <AdminPageBanner
        title={title}
        description={description}
        backUrl={backUrl}
        backLabel={backLabel}
        buttonLabel="View page"
        buttonUrl={viewUrl}
      />

      <div className="adm-layout adm-layout-single">
        <div className="adm-panels">{children}</div>
      </div>
    </AdminShell>
  );
};

export default AdminFormLayout;
