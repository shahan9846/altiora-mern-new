import express from 'express';
import {
  listServices,
  getService,
  listAllServices,
  createService,
  updateService,
  deleteService,
  reorderServices,
} from '../controllers/serviceController.js';
import requireAdminLogin from '../middleware/requireAdminLogin.js';

const router = express.Router();

// Mounted under /api/services in server.js
// Routes with a fixed word (admin/all, reorder) must come before the ones with :slug / :id.
router.get('/', listServices); // public: the visible services
router.get('/admin/all', requireAdminLogin, listAllServices); // admin: every service
router.put('/reorder', requireAdminLogin, reorderServices); // admin: change the order
router.get('/:slug', getService); // public: one service and its related services
router.post('/', requireAdminLogin, createService); // admin: add
router.put('/:id', requireAdminLogin, updateService); // admin: change
router.delete('/:id', requireAdminLogin, deleteService); // admin: delete

export default router;
