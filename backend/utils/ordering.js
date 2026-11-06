// Small helpers for lists the admin can reorder (services, categories, programs).

// The order number for a new item: one more than the last item (that matches the filter).
export const nextOrder = async (Model, filter = {}) => {
  const lastItem = await Model.findOne(filter).sort('-order');
  return lastItem ? lastItem.order + 1 : 1;
};

// Saves a new order. ids is a list of item ids, first = shown first.
export const saveOrder = (Model, ids) =>
  Model.bulkWrite(
    ids.map((id, index) => ({
      updateOne: { filter: { _id: id }, update: { order: index + 1 } },
    }))
  );
