import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/authRoutes.js';
import propertiesRoutes from './routes/propertiesRoutes.js';
import cmsRoutes from './routes/cmsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import inquiriesRoutes from './routes/inquiriesRoutes.js';
import { requireAdmin } from './middleware/requireAdmin.js';
import { readJsonFile } from './services/jsonStore.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.API_PORT) || 3201;
const UPLOAD_DIR = path.resolve(__dirname, '../data/uploads');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/inquiries', inquiriesRoutes);

app.get('/api/admin/stats', requireAdmin, async (_req, res) => {
  try {
    const props = (await readJsonFile('properties.json'))?.properties || [];
    const inquiries = (await readJsonFile('inquiries.json'))?.inquiries || [];
    return res.json({
      success: true,
      stats: {
        totalProperties: props.length,
        featured: props.filter((p) => p.featured).length,
        forSale: props.filter((p) => p.status === 'for-sale').length,
        forRent: props.filter((p) => p.status === 'for-rent').length,
        inquiries: inquiries.length,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to load stats.' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`[urbannest-api] http://localhost:${PORT}`);
});
