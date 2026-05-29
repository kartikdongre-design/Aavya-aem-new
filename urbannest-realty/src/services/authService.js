import { apiFetch, saveAdminSession } from './api.js';

export async function registerClient(credentials) {
  return apiFetch('/api/auth/register', { method: 'POST', body: credentials });
}

export async function loginClient(credentials) {
  return apiFetch('/api/auth/login', { method: 'POST', body: credentials });
}

export async function loginAdmin(credentials) {
  const data = await apiFetch('/api/auth/admin/login', { method: 'POST', body: credentials });
  saveAdminSession({ token: data.token, user: data.user });
  return data;
}

export async function submitInquiry(payload) {
  return apiFetch('/api/inquiries', { method: 'POST', body: payload });
}

export async function uploadImage(file) {
  const form = new FormData();
  form.append('image', file);
  const session = JSON.parse(localStorage.getItem('urbannest_admin_session') || '{}');
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${session.token || ''}` },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data.url;
}

export async function fetchAdminStats() {
  return apiFetch('/api/admin/stats');
}
