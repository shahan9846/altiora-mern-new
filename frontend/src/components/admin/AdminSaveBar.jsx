// Sticky save bar at the bottom of the editor. Static (the button does nothing yet).

const AdminSaveBar = () => {
  return (
    <div className="adm-savebar">
      <span>All texts use the original wording</span>
      <button type="button" className="adm-btn-gold">Save changes</button>
    </div>
  );
};

export default AdminSaveBar;
