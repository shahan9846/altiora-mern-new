import express from 'express';
import { getPage, savePage } from '../controllers/pageController.js';
import requireAdminLogin from '../middleware/requireAdminLogin.js';

const router = express.Router();

// Mounted under /api/pages in server.js
router.get('/:pageName', getPage); // anyone can read (public website)
router.put('/:pageName', requireAdminLogin, savePage); // only a logged-in admin can save

export default router;
