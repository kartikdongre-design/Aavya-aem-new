import { Router } from 'express';
import { readJsonFile, writeJsonFile } from '../services/jsonStore.js';

const router = Router();

router.get('/', async (_req, res) => {
  const data = (await readJsonFile('inquiries.json')) || { inquiries: [] };
  return res.json({ success: true, inquiries: data.inquiries });
});

router.post('/', async (req, res) => {
  const { name, email, phone, message, propertyId, type } = req.body ?? {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }
  const data = (await readJsonFile('inquiries.json')) || { inquiries: [] };
  const inquiry = {
    id: `inq-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || '',
    message: message.trim(),
    propertyId: propertyId || null,
    type: type || 'contact',
    createdAt: new Date().toISOString(),
  };
  data.inquiries.unshift(inquiry);
  await writeJsonFile('inquiries.json', data);
  return res.status(201).json({ success: true, message: 'Thank you! We will contact you shortly.' });
});

export default router;
