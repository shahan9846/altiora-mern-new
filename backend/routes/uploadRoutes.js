import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import requireAdminLogin from '../middleware/requireAdminLogin.js';

const router = express.Router();

// 1. Where to save uploaded images
const uploadFolder = 'uploads';

// Create the folder if it does not exist yet
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// 2. Configure multer storage with clean, unique file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Keep the file extension (.jpg, .png, etc.) and add a timestamp
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueFileName = `slide-${Date.now()}${ext}`;
    cb(null, uniqueFileName);
  },
});

// 3. Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Please upload an image file (JPG, PNG, or WebP)'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter,
});

// 4. POST /api/upload (Admin only)
router.post('/', requireAdminLogin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Image upload failed' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file was provided' });
    }

    // Return the image URL that the frontend can display
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl, filename: req.file.filename });
  });
});

export default router;

