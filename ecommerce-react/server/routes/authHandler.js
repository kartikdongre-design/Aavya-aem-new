import { validateLoginFields } from '../../shared/validation.js';
import { saveOrVerifyUser } from '../services/userStore.js';

/**
 * @param {unknown} body
 * @returns {Promise<{ status: number; body: Record<string, unknown> }>}
 */
async function login(body) {
  const payload = body && typeof body === 'object' ? body : {};
  const email = 'email' in payload ? String(payload.email) : '';
  const password = 'password' in payload ? String(payload.password) : '';
  const fieldErrors = validateLoginFields({ email, password });

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Please fix the highlighted fields.',
        errors: fieldErrors,
      },
    };
  }

  try {
    const { isNew } = await saveOrVerifyUser({ email, password });
    const message = isNew
      ? 'Account saved. You are now logged in.'
      : 'Welcome back! Login successful.';

    return {
      status: 200,
      body: { success: true, message },
    };
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'INVALID_CREDENTIALS') {
      return {
        status: 401,
        body: { success: false, message: 'Invalid email or password.' },
      };
    }

    console.error('[auth] login failed', err);
    return {
      status: 500,
      body: { success: false, message: 'Unable to save login data. Please try again.' },
    };
  }
}

export default { login };
