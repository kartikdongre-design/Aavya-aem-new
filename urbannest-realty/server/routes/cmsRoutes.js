import { Router } from 'express';
import { readCmsContent, writeCmsContent } from '../services/cmsStore.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const content = await readCmsContent();
    return res.json({ success: true, content });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to load content.' });
  }
});

router.put('/', requireAdmin, async (req, res) => {
  const { content } = req.body ?? {};
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid content payload.' });
  }
  try {
    await writeCmsContent(content);
    return res.json({ success: true, message: 'Content updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update content.' });
  }
});

export default router;
