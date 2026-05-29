import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { readJsonFile } from './jsonStore.js';
import { isValidEmail, isNonEmptyPassword } from '../../shared/validation.js';

const SECRET = process.env.ADMIN_TOKEN_SECRET || 'urbannest-admin-secret';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;

function b64url(value) {
  return Buffer.from(value).toString('base64url');
}

function unb64url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(data) {
  return crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
}

function createToken(payload) {
  const encoded = b64url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAdminToken(token) {
  const [encoded, signature] = String(token || '').split('.');
  if (!encoded || sign(encoded) !== signature) return null;
  try {
    const payload = JSON.parse(unb64url(encoded));
    if (payload.role !== 'admin' || Date.now() > Number(payload.exp || 0)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function adminLogin({ email, password }) {
  if (!isValidEmail(email) || !isNonEmptyPassword(password)) {
    const err = new Error('Invalid input');
    err.code = 'INVALID_INPUT';
    throw err;
  }
  const data = await readJsonFile('admins.json');
  const admins = data?.admins || [];
  const admin = admins.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    const err = new Error('Invalid credentials');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }
  const token = createToken({
    email: admin.email,
    name: admin.name,
    role: 'admin',
    exp: Date.now() + TOKEN_TTL_MS,
  });
  return { token, user: { email: admin.email, name: admin.name, role: 'admin' } };
}
