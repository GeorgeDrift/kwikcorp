
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.routes.js';
import { DataService } from './services/data.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Upload Endpoint
app.post('/api/admin/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

const PORT = process.env.PORT || 3001;

// Startup Sequence
const startServer = async () => {
  try {
    console.log('KwikCorp: Initializing Database...');
    await DataService.initDb();

    app.listen(PORT, () => {
      console.log(`
      =========================================
      KWIKCORP BACKEND OPERATIONAL
      URL:  http://localhost:${PORT}
      ENV:  ${process.env.NODE_ENV || 'development'}
      =========================================
      `);
    });
  } catch (err) {
    console.error('CRITICAL ERROR: Failed to start server', err);
    process.exit(1);
  }
};

startServer();
