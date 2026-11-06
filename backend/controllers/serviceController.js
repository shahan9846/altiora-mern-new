import mongoose from 'mongoose';
import Service from '../models/Service.js';
import servicesDefaults from '../defaults/servicesDefaults.js';

// ---------- Helpers ----------

// "Career Guidance & Development" -> "career-guidance-development"
const makeSlug = (title) =>
  title
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Makes sure no other service already uses the slug (adds -2, -3... if needed)
const makeUniqueSlug = async (title) => {
  const baseSlug = makeSlug(title) || 'service';
  let slug = baseSlug;
  let number = 2;

  while (await Service.exists({ slug })) {
    slug = `${baseSlug}-${number}`;
    number += 1;
  }
  return slug;
};

// Reads and checks the fields the admin can change. Returns { error } or { values }.
const readServiceFields = (body) => {
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const text = typeof body.text === 'string' ? body.text.trim() : '';

  if (!title) return { error: 'Please enter a title' };
  if (!text) return { error: 'Please enter the service text' };
  if (title.length > 120) return { error: 'The title is too long (120 characters at most)' };
  if (text.length > 400) return { error: 'The text is too long (400 characters at most)' };

  return {
    values: {
      title,
      text,
      image: typeof body.image === 'string' ? body.image : '',
      isVisible: body.isVisible !== false,
    },
  };
};

// ---------- Startup ----------

// Adds the five original services, but only when there are no services yet.
export const addDefaultServicesIfEmpty = async () => {
  if ((await Service.countDocuments()) > 0) return;

  await Service.insertMany(servicesDefaults.map((service, index) => ({ ...service, order: index + 1 })));
  console.log('Added the original services');
};

// ---------- Public routes ----------

// GET /api/services  -> the visible services, in order
export const listServices = async (req, res) => {
  try {
    const services = await Service.find({ isVisible: true }).sort('order').select('slug title text image order');
    res.json(services);
  } catch (error) {
    console.error('List services error:', error.message);
    res.status(500).json({ message: 'Could not load the services' });
  }
};

// GET /api/services/:slug  -> one service, its number, and up to 3 related services
export const getService = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isVisible: true }).select(
      'slug title text image order'
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Related = the next three services after this one (starting again from the first, if needed)
    const others = await Service.find({ isVisible: true, _id: { $ne: service._id } })
      .sort('order')
      .select('slug title text image order');
    const nextOnes = others.filter((other) => other.order > service.order);
    const earlierOnes = others.filter((other) => other.order < service.order);
    const related = [...nextOnes, ...earlierOnes].slice(0, 3);

    // "Number 3" means this is the third visible service
    const number = await Service.countDocuments({ isVisible: true, order: { $lte: service.order } });

    res.json({ service, related, number });
  } catch (error) {
    console.error('Get service error:', error.message);
    res.status(500).json({ message: 'Could not load the service' });
  }
};

// ---------- Admin routes (the router checks the admin login first) ----------

// GET /api/services/admin/all  -> every service, including hidden ones
export const listAllServices = async (req, res) => {
  try {
    res.json(await Service.find().sort('order'));
  } catch (error) {
    console.error('List all services error:', error.message);
    res.status(500).json({ message: 'Could not load the services' });
  }
};

// POST /api/services  -> add a new service at the end of the list
export const createService = async (req, res) => {
  try {
    const { error, values } = readServiceFields(req.body);
    if (error) return res.status(400).json({ message: error });

    const lastService = await Service.findOne().sort('-order');
    const order = lastService ? lastService.order + 1 : 1;
    const slug = await makeUniqueSlug(values.title);

    const service = await Service.create({ ...values, slug, order });
    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error.message);
    res.status(500).json({ message: 'Could not add the service' });
  }
};

// PUT /api/services/:id  -> change a service
export const updateService = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const { error, values } = readServiceFields(req.body);
    if (error) return res.status(400).json({ message: error });

    // The slug is not changed here, so the service keeps the same web address
    const service = await Service.findByIdAndUpdate(req.params.id, values, { returnDocument: 'after' });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Update service error:', error.message);
    res.status(500).json({ message: 'Could not save the service' });
  }
};

// DELETE /api/services/:id
export const deleteService = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete service error:', error.message);
    res.status(500).json({ message: 'Could not delete the service' });
  }
};

// PUT /api/services/reorder  -> body: { ids: [id1, id2, ...] } in the new order
export const reorderServices = async (req, res) => {
  try {
    const ids = req.body.ids;

    if (!Array.isArray(ids) || !ids.every((id) => mongoose.isValidObjectId(id))) {
      return res.status(400).json({ message: 'The order is not in the right shape' });
    }

    await Service.bulkWrite(
      ids.map((id, index) => ({
        updateOne: { filter: { _id: id }, update: { order: index + 1 } },
      }))
    );

    res.json({ message: 'Reordered' });
  } catch (error) {
    console.error('Reorder services error:', error.message);
    res.status(500).json({ message: 'Could not change the order' });
  }
};
