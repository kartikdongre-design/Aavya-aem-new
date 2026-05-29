export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim());
}

export function isNonEmptyPassword(password) {
  return String(password).length > 0;
}

export function validateLoginFields({ email = '', password = '' }) {
  const errors = {};
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address';
  if (!isNonEmptyPassword(password)) errors.password = 'Password is required';
  return errors;
}

export function validateRegisterFields({ email = '', password = '', name = '' }) {
  const errors = validateLoginFields({ email, password });
  if (!String(name).trim()) errors.name = 'Name is required';
  return errors;
}
