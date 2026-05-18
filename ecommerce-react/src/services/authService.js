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

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      success: false,
      message: data.message || 'Login failed. Please try again.',
      errors: data.errors,
    };
  }

  return {
    success: true,
    message: data.message || 'Login successful.',
  };
}
