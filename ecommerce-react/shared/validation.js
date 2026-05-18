/** @type {RegExp} */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim());
}

/**
 * @param {string} password
 * @returns {boolean}
 */
export function isNonEmptyPassword(password) {
  return String(password).length > 0;
}

/**
 * @param {{ email?: string; password?: string }} fields
 * @returns {Record<string, string>}
 */
export function validateLoginFields({ email = '', password = '' }) {
  const errors = {};
  if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!isNonEmptyPassword(password)) {
    errors.password = 'Password is required';
  }
  return errors;
}
