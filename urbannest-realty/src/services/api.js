const ADMIN_KEY = 'urbannest_admin_session';

export function getAdminSession() {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAdminSession(session) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_KEY);
}

async function parseJson(res) {
  return res.json().catch(() => ({}));
}

export async function apiFetch(url, options = {}) {
  const session = getAdminSession();
  const headers = { ...options.headers };
  if (session?.token) headers.Authorization = `Bearer ${session.token}`;
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, { ...options, headers });
  const data = await parseJson(res);
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
