import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';
import { isValidEmail, isNonEmptyPassword } from '../../shared/validation.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMINS_FILE = path.resolve(__dirname, '../../data/admins.json');
const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;

const SECRET = process.env.ADMIN_TOKEN_SECRET || 'velvora-admin-secret-change-me';

/**
 * @returns {Promise<Array<{email: string, name: string, password: string}>>}
 */
async function readAdmins() {
  const raw = await fs.readFile(ADMINS_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed?.admins) ? parsed.admins : [];
}

/**
 * @param {string} value
 */
function b64url(value) {
  return Buffer.from(value).toString('base64url');
}

/**
 * @param {string} value
 */
function unb64url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

/**
 * @param {string} data
 */
function sign(data) {
  return crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
}

/**
 * @param {{email: string, role: 'admin', exp: number, name: string}} payload
 */
function createToken(payload) {
  const encodedPayload = b64url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

/**
 * @param {string} token
 */
export function verifyAdminToken(token) {
  const [encodedPayload, signature] = String(token || '').split('.');
  if (!encodedPayload || !signature) return null;
  if (sign(encodedPayload) !== signature) return null;
  const payload = JSON.parse(unb64url(encodedPayload));
  if (payload.role !== 'admin' || Date.now() > Number(payload.exp || 0)) return null;
  return payload;
}

/**
 * @param {{email: string, password: string}} credentials
 */
export async function adminLogin(credentials) {
  const email = String(credentials?.email || '').trim();
  const password = String(credentials?.password || '');
  if (!isValidEmail(email) || !isNonEmptyPassword(password)) {
    const err = new Error('Invalid credentials');
    err.code = 'INVALID_INPUT';
    throw err;
  }

  const admins = await readAdmins();
  const admin = admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!admin) {
    const err = new Error('Invalid credentials');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
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

  return {
    token,
    user: {
      email: admin.email,
      name: admin.name,
      role: 'admin',
    },
  };
}
