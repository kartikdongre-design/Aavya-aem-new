import { Router } from 'express';
import { validateLoginFields, validateRegisterFields } from '../../shared/validation.js';
import { registerUser, verifyUserLogin } from '../services/userStore.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { email = '', password = '' } = req.body ?? {};
  const fieldErrors = validateRegisterFields({ email, password });

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please fix the highlighted fields.',
      errors: fieldErrors,
    });
  }

  try {
    await registerUser({ email, password });
    return res.status(201).json({
      success: true,
      message: 'Account created successfully. You can log in now.',
    });
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'DUPLICATE_EMAIL') {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
        errors: { email: 'This email is already registered' },
      });
    }

    console.error('[auth] register failed', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to create account. Please try again.',
    });
  }
});

router.post('/login', async (req, res) => {
  const { email = '', password = '' } = req.body ?? {};
  const fieldErrors = validateLoginFields({ email, password });

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please fix the highlighted fields.',
      errors: fieldErrors,
    });
  }

  try {
    await verifyUserLogin({ email, password });
    return res.status(200).json({
      success: true,
      message: 'Welcome back! Login successful.',
    });
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    console.error('[auth] login failed', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to log in. Please try again.',
    });
  }
});

export default router;
