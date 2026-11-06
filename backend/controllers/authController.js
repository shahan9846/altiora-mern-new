import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

// Settings for the login cookie.
// httpOnly: JavaScript in the browser cannot read this cookie (protects against token theft).
// secure:   the cookie is only sent over https when the site is live.
// sameSite: the cookie is not sent from other websites (protects against CSRF).
const adminCookieSettings = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

// POST /api/auth/login
// Body: { email, password }
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    // We give the same message for "no such email" and "wrong password"
    // so nobody can use this route to find out which emails exist.
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('adminToken', token, {
      ...adminCookieSettings,
      maxAge: ONE_DAY_IN_MILLISECONDS,
    });

    res.json({ message: 'Logged in', admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

// POST /api/auth/logout
// Removes the cookie from the browser.
export const logoutAdmin = (req, res) => {
  res.clearCookie('adminToken', adminCookieSettings);
  res.json({ message: 'Logged out' });
};

// GET /api/auth/me
// Tells React who is logged in. requireAdminLogin runs first and sets req.adminId.
export const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password'); // never send the hash

    if (!admin) {
      return res.status(401).json({ message: 'This admin no longer exists' });
    }

    res.json({ admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    console.error('Get current admin error:', error.message);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

// PUT /api/auth/account
// Body: { currentPassword, newEmail?, newPassword? }
// Changes the login username (the email) and/or the password.
// The current password is always required, so someone who finds a logged-in screen cannot lock the owner out.
export const updateAccount = async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ message: 'Please enter your current password' });
    }

    const admin = await Admin.findById(req.adminId);

    if (!admin) {
      return res.status(401).json({ message: 'This admin no longer exists' });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Your current password is not correct' });
    }

    let hasChanged = false;

    // New username (email)
    const email = typeof newEmail === 'string' ? newEmail.toLowerCase().trim() : '';

    if (email && email !== admin.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
      }
      if (await Admin.exists({ email, _id: { $ne: admin._id } })) {
        return res.status(400).json({ message: 'That email is already used by another admin' });
      }
      admin.email = email;
      hasChanged = true;
    }

    // New password
    if (newPassword) {
      if (typeof newPassword !== 'string' || newPassword.length < 8) {
        return res.status(400).json({ message: 'The new password must be at least 8 characters' });
      }
      admin.password = await bcrypt.hash(newPassword, 10);
      hasChanged = true;
    }

    if (!hasChanged) {
      return res.status(400).json({ message: 'There is nothing to change' });
    }

    await admin.save();
    res.json({ message: 'Account updated', admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    console.error('Update account error:', error.message);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};
