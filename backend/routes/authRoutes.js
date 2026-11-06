import express from 'express';
import { loginAdmin, logoutAdmin, getCurrentAdmin, updateAccount } from '../controllers/authController.js';
import requireAdminLogin from '../middleware/requireAdminLogin.js';

const router = express.Router();

// These are mounted under /api/auth in server.js
router.post('/login', loginAdmin); // POST /api/auth/login
router.post('/logout', logoutAdmin); // POST /api/auth/logout
router.get('/me', requireAdminLogin, getCurrentAdmin); // GET  /api/auth/me
router.put('/account', requireAdminLogin, updateAccount); // PUT  /api/auth/account (change email or password)

export default router;
