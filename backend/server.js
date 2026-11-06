import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { addDefaultServicesIfEmpty } from './controllers/serviceController.js';
import { addDefaultTrainingIfEmpty } from './controllers/trainingController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // lets us read cookies with req.cookies

// Make the uploads folder publicly readable so images can be displayed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve the React frontend production build
app.use(express.static(frontendDistPath));

// Handle React Router routes
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(frontendDistPath, 'index.html'));
});


// Connect to MongoDB first, then start listening for requests.
const startServer = async () => {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    console.error('Please set MONGODB_URI and JWT_SECRET in your .env file');
    process.exit(1);
  }

  await connectDatabase();
  await addDefaultServicesIfEmpty(); // first run only: adds the original five services
  await addDefaultTrainingIfEmpty(); // first run only: adds the original training areas and programs

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
