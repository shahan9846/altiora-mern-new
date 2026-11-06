import express from 'express';
import { createEnquiry, listEnquiries, updateEnquiryStatus, deleteEnquiry } from '../controllers/enquiryController.js';
import requireAdminLogin from '../middleware/requireAdminLogin.js';

const router = express.Router();

// Mounted under /api/enquiries in server.js
router.post('/', createEnquiry); // public: the Contact form
router.get('/', requireAdminLogin, listEnquiries); // admin: read the enquiries
router.put('/:id', requireAdminLogin, updateEnquiryStatus); // admin: change the status
router.delete('/:id', requireAdminLogin, deleteEnquiry); // admin: delete

export default router;
