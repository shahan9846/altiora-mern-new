// Admin → Services. The list of services: add, edit, hide, reorder and delete.
// Every change is sent to the backend straight away (there is no Save button here).
import useManagedList from "../../hooks/useManagedList";
import AdminListLayout from "../../components/admin/AdminListLayout";
import AdminItemRow from "../../components/admin/AdminItemRow";

const ServicesList = () => {
  const list = useManagedList({ listUrl: "/services/admin/all", itemUrl: "/services", reorderUrl: "/services/reorder" });
  const { items: services } = list;

  const renderRows = () => {
    if (!services) return <p className="adm-empty">{list.isError ? "" : "Loading the services..."}</p>;
    if (services.length === 0) return <p className="adm-empty">There are no services yet. Click “Add service” to create one.</p>;

    return (
      <div className="adm-service-list">
        {services.map((service, index) => (
          <AdminItemRow
            key={service._id}
            number={String(index + 1).padStart(2, "0")}
            image={service.image}
            title={service.title}
            text={service.text}
            badge={service.isVisible ? "" : "Hidden"}
            isHidden={!service.isVisible}
            isVisible={service.isVisible}
            index={index}
            total={services.length}
            editUrl={`/admin/services/${service._id}`}
            onMove={(direction) => list.moveItem(index, direction)}
            onToggle={() => list.toggleVisible(service)}
            onDelete={() => list.deleteItem(service, service.title)}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminListLayout
      list={list}
      title="Services"
      description="The services shown on the Home page, the Services page and their own pages."
      addLabel="Add service"
      addUrl="/admin/services/new"
      panelTitle="All services"
      panelDescription="Use the arrows to change the order. Hidden services stay saved but do not show on the website."
      counts={services ? [`${services.filter((service) => service.isVisible).length} shown`, `${services.length} total`] : []}
    >
      {renderRows()}
    </AdminListLayout>
  );
};

export default ServicesList;
