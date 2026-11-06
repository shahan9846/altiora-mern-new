import express from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import requireAdminLogin from '../middleware/requireAdminLogin.js';

const router = express.Router();

// Mounted under /api/dashboard in server.js
router.get('/', requireAdminLogin, getDashboard);

export default router;
