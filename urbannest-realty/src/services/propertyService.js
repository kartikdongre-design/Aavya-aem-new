import { apiFetch } from './api.js';

export async function fetchProperties() {
  const data = await apiFetch('/api/properties');
  return data.properties;
}

export async function fetchPropertyBySlug(slug) {
  const data = await apiFetch(`/api/properties/${slug}`);
  return data.property;
}

export async function createProperty(payload) {
  return apiFetch('/api/properties', { method: 'POST', body: payload });
}

export async function updateProperty(id, payload) {
  return apiFetch(`/api/properties/${id}`, { method: 'PUT', body: payload });
}

export async function deleteProperty(id) {
  return apiFetch(`/api/properties/${id}`, { method: 'DELETE' });
}
