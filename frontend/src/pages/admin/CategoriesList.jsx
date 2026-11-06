// Admin → Training → Categories. The training areas shown on the Training page.
// Every change is sent to the backend straight away (there is no Save button here).
import useManagedList from "../../hooks/useManagedList";
import AdminListLayout from "../../components/admin/AdminListLayout";
import AdminItemRow from "../../components/admin/AdminItemRow";

const CategoriesList = () => {
  const list = useManagedList({
    listUrl: "/training/admin/categories",
    itemUrl: "/training/categories",
    reorderUrl: "/training/categories/reorder",
  });
  const { items: categories } = list;

  const renderRows = () => {
    if (!categories) return <p className="adm-empty">{list.isError ? "" : "Loading the categories..."}</p>;
    if (categories.length === 0) return <p className="adm-empty">There are no categories yet. Click “Add category” to create one.</p>;

    return (
      <div className="adm-service-list">
        {categories.map((category, index) => (
          <AdminItemRow
            key={category._id}
            number={String(index + 1).padStart(2, "0")}
            title={category.name}
            text={`${category.programCount} ${category.programCount === 1 ? "program" : "programs"} · ${category.description}`}
            badge={category.isVisible ? "" : "Hidden"}
            isHidden={!category.isVisible}
            isVisible={category.isVisible}
            index={index}
            total={categories.length}
            editUrl={`/admin/training/categories/${category._id}`}
            onMove={(direction) => list.moveItem(index, direction)}
            onToggle={() => list.toggleVisible(category)}
            onDelete={() => list.deleteItem(category, category.name, "All its programs are deleted too. ")}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminListLayout
      list={list}
      title="Training categories"
      description="The training areas shown on the Training page. A category with no programs stays hidden."
      addLabel="Add category"
      addUrl="/admin/training/categories/new"
      panelTitle="All categories"
      panelDescription="Use the arrows to change the order. Manage the programs inside each category in Training programs."
      counts={categories ? [`${categories.filter((category) => category.isVisible).length} shown`, `${categories.length} total`] : []}
    >
      {renderRows()}
    </AdminListLayout>
  );
};

export default CategoriesList;
