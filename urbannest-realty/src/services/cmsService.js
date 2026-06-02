import { apiFetch } from './api.js';

async function fetchStaticCms() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}data/cms-content.json`);
  if (!res.ok) throw new Error('Static CMS unavailable');
  return res.json();
}

export async function fetchCmsContent() {
  if (import.meta.env.PROD) {
    try {
      return await fetchStaticCms();
    } catch {
      /* fall through */
    }
  }
  try {
    const data = await apiFetch('/api/cms');
    return data.content;
  } catch (err) {
    if (import.meta.env.PROD) {
      return fetchStaticCms();
    }
    throw err;
  }
}

export async function updateCmsContent(content) {
  return apiFetch('/api/cms', { method: 'PUT', body: { content } });
}
