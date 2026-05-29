import { apiFetch } from './api.js';

export async function fetchCmsContent() {
  const data = await apiFetch('/api/cms');
  return data.content;
}

export async function updateCmsContent(content) {
  return apiFetch('/api/cms', { method: 'PUT', body: { content } });
}
