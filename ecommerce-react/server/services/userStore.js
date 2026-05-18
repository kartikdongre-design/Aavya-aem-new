import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_FILE = path.resolve(__dirname, '../../data/users.json');

const EMPTY_STORE = { users: [] };

/**
 * @returns {Promise<{ users: Array<{ email: string; password: string }> }>}
 */
async function readUsersStore() {
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
 * Persists a new user or verifies credentials for an existing user.
 * @param {{ email: string; password: string }} credentials
 * @returns {Promise<{ isNew: boolean; user: { email: string; password: string } }>}
 */
export async function saveOrVerifyUser({ email, password }) {
  const store = await readUsersStore();
  const trimmedEmail = email.trim();
  const normalizedEmail = trimmedEmail.toLowerCase();
  const existing = store.users.find((user) => user.email.toLowerCase() === normalizedEmail);

  if (existing) {
    if (existing.password !== password) {
      const error = new Error('Invalid email or password');
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }
    return { isNew: false, user: existing };
  }

  const entry = { email: trimmedEmail, password };
  store.users.push(entry);
  await writeUsersStore(store);
  return { isNew: true, user: entry };
}
