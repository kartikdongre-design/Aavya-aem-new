import { Router } from 'express';
import { validateLoginFields, validateRegisterFields } from '../../shared/validation.js';
import { registerClient, verifyClientLogin } from '../services/userStore.js';
import { adminLogin } from '../services/adminAuthService.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { name = '', email = '', password = '' } = req.body ?? {};
  const errors = validateRegisterFields({ name, email, password });
  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Please fix the highlighted fields.', errors });
  }
  try {
    const user = await registerClient({ name, email, password });
    return res.status(201).json({ success: true, message: 'Account created successfully.', user });
  } catch (err) {
    if (err?.code === 'DUPLICATE_EMAIL') {
      return res.status(409).json({ success: false, message: 'Email already registered.', errors: { email: 'Email in use' } });
    }
    console.error('[auth] register', err);
    return res.status(500).json({ success: false, message: 'Registration failed.' });
  }
});

router.post('/login', async (req, res) => {
  const { email = '', password = '' } = req.body ?? {};
  const errors = validateLoginFields({ email, password });
  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Please fix the highlighted fields.', errors });
  }
  try {
    const user = await verifyClientLogin({ email, password });
    return res.json({ success: true, message: 'Welcome back!', user });
  } catch (err) {
    if (err?.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    return res.status(500).json({ success: false, message: 'Login failed.' });
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const { token, user } = await adminLogin(req.body || {});
    return res.json({ success: true, token, user, message: 'Admin login successful.' });
  } catch (err) {
    if (err?.code === 'INVALID_INPUT') {
      return res.status(400).json({ success: false, message: 'Enter valid admin email and password.' });
    }
    if (err?.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
    return res.status(500).json({ success: false, message: 'Admin login failed.' });
  }
});

export default router;
