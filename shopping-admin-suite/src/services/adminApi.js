const ADMIN_STORAGE_KEY = 'shopping_admin_session';

export function getAdminSession() {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}

export function saveAdminSession(session) {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore storage errors
  }
}

export async function loginAdmin(credentials) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { success: false, message: data.message || 'Admin login failed.' };
  }
  const session = { token: data.token, user: data.user };
  saveAdminSession(session);
  return { success: true, session };
}
