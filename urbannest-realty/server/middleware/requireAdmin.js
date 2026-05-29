import { verifyAdminToken } from '../services/adminAuthService.js';

export function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, message: 'Unauthorized admin access.' });
  }
  req.admin = payload;
  return next();
}
