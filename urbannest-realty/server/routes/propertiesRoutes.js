import { Router } from 'express';
import {
  getAllProperties,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../services/propertyStore.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const properties = await getAllProperties();
    return res.json({ success: true, properties });
  } catch (err) {
    console.error('[properties] list', err);
    return res.status(500).json({ success: false, message: 'Failed to load properties.' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const property = await getPropertyBySlug(req.params.slug);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found.' });
    return res.json({ success: true, property });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to load property.' });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const property = await createProperty(req.body || {});
    return res.status(201).json({ success: true, property, message: 'Property created.' });
  } catch (err) {
    console.error('[properties] create', err);
    return res.status(500).json({ success: false, message: 'Failed to create property.' });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const property = await updateProperty(req.params.id, req.body || {});
    return res.json({ success: true, property, message: 'Property updated.' });
  } catch (err) {
    if (err?.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Property not found.' });
    return res.status(500).json({ success: false, message: 'Failed to update property.' });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await deleteProperty(req.params.id);
    return res.json({ success: true, message: 'Property deleted.' });
  } catch (err) {
    if (err?.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Property not found.' });
    return res.status(500).json({ success: false, message: 'Failed to delete property.' });
  }
});

export default router;
