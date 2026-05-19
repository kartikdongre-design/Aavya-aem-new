import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_FILE = path.resolve(__dirname, '../../data/users.json');
const SALT_ROUNDS = 10;

const EMPTY_STORE = { users: [] };

/**
 * @returns {Promise<{ users: Array<{ email: string; password: string }> }>}
 */
export async function readUsersStore() {
  try {
    const raw = await fs.readFile(USERS_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.users)) {
      return { ...EMPTY_STORE };
    }
    return data;
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      return { ...EMPTY_STORE };
    }
    throw err;
  }
}

/**
 * @param {{ users: Array<{ email: string; password: string }> }} store
 */
async function writeUsersStore(store) {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

/**
 * @param {string} email
 */
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

/**
 * @param {string} email
 * @param {{ users: Array<{ email: string; password: string }> }} store
 */
function findUserInStore(email, store) {
  const normalized = normalizeEmail(email);
  return store.users.find((user) => normalizeEmail(user.email) === normalized);
}

/**
 * Registers a new user with a bcrypt-hashed password.
 * @param {{ email: string; password: string }} credentials
 * @returns {Promise<{ email: string }>}
 */
export async function registerUser({ email, password }) {
  const store = await readUsersStore();
  const trimmedEmail = email.trim();

  if (findUserInStore(trimmedEmail, store)) {
    const error = new Error('An account with this email already exists');
    error.code = 'DUPLICATE_EMAIL';
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  store.users.push({ email: trimmedEmail, password: hashedPassword });
  await writeUsersStore(store);

  return { email: trimmedEmail };
}

/**
 * Verifies login credentials against stored bcrypt hashes.
 * @param {{ email: string; password: string }} credentials
 * @returns {Promise<{ email: string }>}
 */
export async function verifyUserLogin({ email, password }) {
  const store = await readUsersStore();
  const trimmedEmail = email.trim();
  const user = findUserInStore(trimmedEmail, store);

  if (!user) {
    const error = new Error('Invalid email or password');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    const error = new Error('Invalid email or password');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  return { email: user.email };
}
