import express from 'express';
import {
  listTraining,
  listAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  listAllPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  reorderPrograms,
} from '../controllers/trainingController.js';
import requireAdminLogin from '../middleware/requireAdminLogin.js';

const router = express.Router();

// Mounted under /api/training in server.js
// Routes with a fixed word (reorder, admin) come before the ones with :id.
router.get('/', listTraining); // public: visible categories with their programs

// Admin: categories
router.get('/admin/categories', requireAdminLogin, listAllCategories);
router.put('/categories/reorder', requireAdminLogin, reorderCategories);
router.post('/categories', requireAdminLogin, createCategory);
router.put('/categories/:id', requireAdminLogin, updateCategory);
router.delete('/categories/:id', requireAdminLogin, deleteCategory);

// Admin: programs
router.get('/admin/programs', requireAdminLogin, listAllPrograms);
router.put('/programs/reorder', requireAdminLogin, reorderPrograms);
router.post('/programs', requireAdminLogin, createProgram);
router.put('/programs/:id', requireAdminLogin, updateProgram);
router.delete('/programs/:id', requireAdminLogin, deleteProgram);

export default router;
