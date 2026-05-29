import bcrypt from 'bcrypt';
import { readJsonFile, writeJsonFile } from './jsonStore.js';

const SALT_ROUNDS = 10;

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export async function registerClient({ name, email, password }) {
  const store = (await readJsonFile('users.json')) || { users: [] };
  const trimmedEmail = email.trim();
  if (store.users.find((u) => normalizeEmail(u.email) === normalizeEmail(trimmedEmail))) {
    const err = new Error('Email already registered');
    err.code = 'DUPLICATE_EMAIL';
    throw err;
  }
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  store.users.push({ name: name.trim(), email: trimmedEmail, password: hashed, role: 'client' });
  await writeJsonFile('users.json', store);
  return { name: name.trim(), email: trimmedEmail, role: 'client' };
}

export async function verifyClientLogin({ email, password }) {
  const store = (await readJsonFile('users.json')) || { users: [] };
  const user = store.users.find((u) => normalizeEmail(u.email) === normalizeEmail(email));
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const err = new Error('Invalid credentials');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }
  return { name: user.name, email: user.email, role: 'client' };
}
