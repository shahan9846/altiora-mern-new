// Admin → Training → Programs. The programs, grouped by category.
// Every change is sent to the backend straight away (there is no Save button here).
import useApiData from "../../hooks/useApiData";
import useManagedList from "../../hooks/useManagedList";
import AdminListLayout from "../../components/admin/AdminListLayout";
import AdminItemRow from "../../components/admin/AdminItemRow";

const ProgramsList = () => {
  const list = useManagedList({
    listUrl: "/training/admin/programs",
    itemUrl: "/training/programs",
    reorderUrl: "/training/programs/reorder",
  });
  const categories = useApiData("/training/admin/categories", []);
  const { items: programs } = list;

  // Move a program one place up (-1) or down (+1) inside its own category
  const moveProgram = (program, direction) => {
    const group = programs.filter((other) => other.category === program.category);
    const position = group.indexOf(program);

    const newGroup = [...group];
    newGroup.splice(position, 1);
    newGroup.splice(position + direction, 0, program);

    const otherPrograms = programs.filter((other) => other.category !== program.category);
    list.saveOrder([...otherPrograms, ...newGroup], newGroup.map((item) => item._id));
  };

  const renderGroup = (category) => {
    const group = programs.filter((program) => program.category === category._id);

    return (
      <div key={category._id}>
        <div className="adm-group-title">
          <span>{category.name}</span>
          <a href={`/admin/training/programs/new?category=${category._id}`}>+ Add a program here</a>
        </div>

        {group.length === 0 && <p className="adm-group-empty">No programs in this category yet.</p>}

        {group.map((program, index) => (
          <AdminItemRow
            key={program._id}
            number={String(index + 1).padStart(2, "0")}
            title={program.title}
            text={program.text}
            badge={program.isVisible ? "" : "Hidden"}
            isHidden={!program.isVisible}
            isVisible={program.isVisible}
            index={index}
            total={group.length}
            editUrl={`/admin/training/programs/${program._id}`}
            onMove={(direction) => moveProgram(program, direction)}
            onToggle={() => list.toggleVisible(program)}
            onDelete={() => list.deleteItem(program, program.title)}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminListLayout
      list={list}
      title="Training programs"
      description="The programs listed inside each training area on the Training page."
      addLabel="Add program"
      addUrl="/admin/training/programs/new"
      backUrl="/admin/training/categories"
      backLabel="← Training categories"
      panelTitle="All programs"
      panelDescription="Use the arrows to change the order inside a category."
      counts={programs ? [`${programs.filter((program) => program.isVisible).length} shown`, `${programs.length} total`] : []}
    >
      {!programs ? <p className="adm-empty">{list.isError ? "" : "Loading the programs..."}</p> : categories.map(renderGroup)}
    </AdminListLayout>
  );
};

export default ProgramsList;
