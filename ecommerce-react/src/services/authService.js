/**
 * @param {Response} response
 * @returns {Promise<Record<string, unknown>>}
 */
async function parseJson(response) {
  return response.json().catch(() => ({}));
}

/**
 * @param {Response} response
 * @param {Record<string, unknown>} data
 * @returns {string}
 */
function apiErrorMessage(response, data, fallback) {
  if (typeof data.message === 'string' && data.message) {
    return data.message;
  }
  if (response.status === 502 || response.status === 504) {
    return 'API server is not running. Stop the app and run npm start from the project root.';
  }
  return fallback;
}

/**
 * @param {{ email: string; password: string }} credentials
 * @returns {Promise<{ success: boolean; message: string; errors?: Record<string, string> }>}
 */
export async function loginUser(credentials) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    return {
      success: false,
      message: apiErrorMessage(response, data, 'Login failed. Please try again.'),
      errors: data.errors,
    };
  }

  return {
    success: true,
    message: data.message || 'Login successful.',
  };
}

/**
 * @param {{ email: string; password: string }} credentials
 * @returns {Promise<{ success: boolean; message: string; errors?: Record<string, string> }>}
 */
export async function registerUser(credentials) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    return {
      success: false,
      message: apiErrorMessage(response, data, 'Registration failed. Please try again.'),
      errors: data.errors,
    };
  }

  return {
    success: true,
    message: data.message || 'Account created successfully.',
  };
}
