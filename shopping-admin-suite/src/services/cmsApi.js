import { getAdminSession } from './adminApi.js';

export async function getCmsContent() {
  const response = await fetch('/api/admin/content');
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Failed to load CMS content.');
  }
  return data.content;
}

export async function updateCmsContent(content) {
  const session = getAdminSession();
  const response = await fetch('/api/admin/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token || ''}`,
    },
    body: JSON.stringify({ content }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update CMS content.');
  }
  return data;
}
