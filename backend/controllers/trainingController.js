import mongoose from 'mongoose';
import TrainingCategory from '../models/TrainingCategory.js';
import TrainingProgram from '../models/TrainingProgram.js';
import trainingDefaults from '../defaults/trainingDefaults.js';
import { nextOrder, saveOrder } from '../utils/ordering.js';

// ---------- Helpers ----------

const isBadId = (id) => !mongoose.isValidObjectId(id);

const readText = (value) => (typeof value === 'string' ? value.trim() : '');

// Reads the category fields from the request. Returns { error } or { values }.
const readCategoryFields = (body) => {
  const name = readText(body.name);
  const description = readText(body.description);

  if (!name) return { error: 'Please enter the category name' };
  if (!description) return { error: 'Please enter the category description' };
  if (name.length > 120) return { error: 'The name is too long (120 characters at most)' };
  if (description.length > 600) return { error: 'The description is too long (600 characters at most)' };

  return { values: { name, description, isVisible: body.isVisible !== false } };
};

// Reads the program fields from the request. Returns { error } or { values }.
const readProgramFields = (body) => {
  const title = readText(body.title);
  const text = readText(body.text);

  if (!title) return { error: 'Please enter the program title' };
  if (!text) return { error: 'Please enter the program text' };
  if (title.length > 150) return { error: 'The title is too long (150 characters at most)' };
  if (text.length > 600) return { error: 'The text is too long (600 characters at most)' };
  if (isBadId(body.category)) return { error: 'Please choose a category' };

  // Tags: a list of short labels. Empty ones are dropped.
  const tags = Array.isArray(body.tags) ? body.tags.map(readText).filter(Boolean).slice(0, 8) : [];
  if (tags.some((tag) => tag.length > 150)) return { error: 'Each point must be 150 characters or fewer' };

  return { values: { title, text, tags, category: body.category, isVisible: body.isVisible !== false } };
};

// ---------- Startup ----------

// Adds the original categories and programs, but only when there are no categories yet.
export const addDefaultTrainingIfEmpty = async () => {
  if ((await TrainingCategory.countDocuments()) > 0) return;

  for (const [categoryIndex, categoryData] of trainingDefaults.entries()) {
    const category = await TrainingCategory.create({
      name: categoryData.name,
      description: categoryData.description,
      order: categoryIndex + 1,
    });

    await TrainingProgram.insertMany(
      categoryData.programs.map((program, programIndex) => ({
        ...program,
        category: category._id,
        order: programIndex + 1,
      }))
    );
  }
  console.log('Added the original training areas and programs');
};

// ---------- Public route ----------

// GET /api/training  -> the visible categories (that have at least one visible program), with their programs
export const listTraining = async (req, res) => {
  try {
    const categories = await TrainingCategory.find({ isVisible: true }).sort('order');
    const programs = await TrainingProgram.find({ isVisible: true }).sort('order');

    const result = categories
      .map((category) => ({
        _id: category._id,
        name: category.name,
        description: category.description,
        programs: programs
          .filter((program) => String(program.category) === String(category._id))
          .map((program) => ({ _id: program._id, title: program.title, text: program.text, tags: program.tags })),
      }))
      .filter((category) => category.programs.length > 0);

    res.json(result);
  } catch (error) {
    console.error('List training error:', error.message);
    res.status(500).json({ message: 'Could not load the training programs' });
  }
};

// ---------- Admin: categories ----------

// GET /api/training/admin/categories  -> every category, with how many programs it has
export const listAllCategories = async (req, res) => {
  try {
    const categories = await TrainingCategory.find().sort('order').lean();
    const counts = await TrainingProgram.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);

    res.json(
      categories.map((category) => ({
        ...category,
        programCount: counts.find((item) => String(item._id) === String(category._id))?.count || 0,
      }))
    );
  } catch (error) {
    console.error('List categories error:', error.message);
    res.status(500).json({ message: 'Could not load the categories' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error, values } = readCategoryFields(req.body);
    if (error) return res.status(400).json({ message: error });

    const category = await TrainingCategory.create({ ...values, order: await nextOrder(TrainingCategory) });
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error.message);
    res.status(500).json({ message: 'Could not add the category' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    if (isBadId(req.params.id)) return res.status(404).json({ message: 'Category not found' });

    const { error, values } = readCategoryFields(req.body);
    if (error) return res.status(400).json({ message: error });

    const category = await TrainingCategory.findByIdAndUpdate(req.params.id, values, { returnDocument: 'after' });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.json(category);
  } catch (error) {
    console.error('Update category error:', error.message);
    res.status(500).json({ message: 'Could not save the category' });
  }
};

// Deleting a category also deletes its programs
export const deleteCategory = async (req, res) => {
  try {
    if (isBadId(req.params.id)) return res.status(404).json({ message: 'Category not found' });

    const category = await TrainingCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await TrainingProgram.deleteMany({ category: category._id });
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete category error:', error.message);
    res.status(500).json({ message: 'Could not delete the category' });
  }
};

// PUT /api/training/categories/reorder  -> body: { ids: [...] }
export const reorderCategories = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || !ids.every((id) => !isBadId(id))) {
      return res.status(400).json({ message: 'The order is not in the right shape' });
    }

    await saveOrder(TrainingCategory, ids);
    res.json({ message: 'Reordered' });
  } catch (error) {
    console.error('Reorder categories error:', error.message);
    res.status(500).json({ message: 'Could not change the order' });
  }
};

// ---------- Admin: programs ----------

// GET /api/training/admin/programs  -> every program (the screen groups them by category)
export const listAllPrograms = async (req, res) => {
  try {
    res.json(await TrainingProgram.find().sort('order'));
  } catch (error) {
    console.error('List programs error:', error.message);
    res.status(500).json({ message: 'Could not load the programs' });
  }
};

export const createProgram = async (req, res) => {
  try {
    const { error, values } = readProgramFields(req.body);
    if (error) return res.status(400).json({ message: error });

    if (!(await TrainingCategory.exists({ _id: values.category }))) {
      return res.status(400).json({ message: 'That category does not exist' });
    }

    const order = await nextOrder(TrainingProgram, { category: values.category });
    res.status(201).json(await TrainingProgram.create({ ...values, order }));
  } catch (error) {
    console.error('Create program error:', error.message);
    res.status(500).json({ message: 'Could not add the program' });
  }
};

export const updateProgram = async (req, res) => {
  try {
    if (isBadId(req.params.id)) return res.status(404).json({ message: 'Program not found' });

    const { error, values } = readProgramFields(req.body);
    if (error) return res.status(400).json({ message: error });

    const program = await TrainingProgram.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    if (String(program.category) !== String(values.category)) {
      // Moved to another category: it goes to the end of that category
      if (!(await TrainingCategory.exists({ _id: values.category }))) {
        return res.status(400).json({ message: 'That category does not exist' });
      }
      program.order = await nextOrder(TrainingProgram, { category: values.category });
    }

    Object.assign(program, values);
    await program.save();
    res.json(program);
  } catch (error) {
    console.error('Update program error:', error.message);
    res.status(500).json({ message: 'Could not save the program' });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    if (isBadId(req.params.id)) return res.status(404).json({ message: 'Program not found' });

    const program = await TrainingProgram.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete program error:', error.message);
    res.status(500).json({ message: 'Could not delete the program' });
  }
};

// PUT /api/training/programs/reorder  -> body: { ids: [...] } the programs of ONE category, in the new order
export const reorderPrograms = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || !ids.every((id) => !isBadId(id))) {
      return res.status(400).json({ message: 'The order is not in the right shape' });
    }

    await saveOrder(TrainingProgram, ids);
    res.json({ message: 'Reordered' });
  } catch (error) {
    console.error('Reorder programs error:', error.message);
    res.status(500).json({ message: 'Could not change the order' });
  }
};
