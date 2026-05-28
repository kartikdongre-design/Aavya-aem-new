import { Router } from 'express';
import { adminLogin, verifyAdminToken } from '../services/adminAuthService.js';
import { readCmsContent, writeCmsContent } from '../services/cmsStore.js';

const router = Router();

function getBearerToken(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return '';
}

function requireAdmin(req, res, next) {
  const token = getBearerToken(req);
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, message: 'Unauthorized admin access.' });
  }
  req.admin = payload;
  return next();
}

router.post('/login', async (req, res) => {
  try {
    const { token, user } = await adminLogin(req.body || {});
    return res.json({ success: true, token, user, message: 'Admin login successful.' });
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'INVALID_INPUT') {
      return res.status(400).json({ success: false, message: 'Enter valid admin email and password.' });
    }
    if (err && typeof err === 'object' && 'code' in err && err.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
    console.error('[admin] login failed', err);
    return res.status(500).json({ success: false, message: 'Admin login failed.' });
  }
});

router.get('/content', async (_req, res) => {
  try {
    const content = await readCmsContent();
    return res.json({ success: true, content });
  } catch (err) {
    console.error('[cms] read failed', err);
    return res.status(500).json({ success: false, message: 'Unable to load content.' });
  }
});

router.put('/content', requireAdmin, async (req, res) => {
  const content = req.body?.content;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid content payload.' });
  }

  try {
    await writeCmsContent(content);
    return res.json({ success: true, message: 'Content updated successfully.' });
  } catch (err) {
    console.error('[cms] update failed', err);
    return res.status(500).json({ success: false, message: 'Unable to update content.' });
  }
});

export default router;
