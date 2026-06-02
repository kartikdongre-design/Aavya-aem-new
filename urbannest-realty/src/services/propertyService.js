import { apiFetch } from './api.js';

async function fetchStaticProperties() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}data/properties.json`);
  if (!res.ok) throw new Error('Static properties unavailable');
  const data = await res.json();
  return data.properties || [];
}

async function fetchStaticPropertyBySlug(slug) {
  const properties = await fetchStaticProperties();
  return properties.find((p) => p.slug === slug) || null;
}

export async function fetchProperties() {
  if (import.meta.env.PROD) {
    try {
      return await fetchStaticProperties();
    } catch {
      /* fall through to API if configured */
    }
  }
  try {
    const data = await apiFetch('/api/properties');
    return data.properties;
  } catch (err) {
    if (import.meta.env.PROD) {
      return fetchStaticProperties();
    }
    throw err;
  }
}

export async function fetchPropertyBySlug(slug) {
  if (import.meta.env.PROD) {
    try {
      const property = await fetchStaticPropertyBySlug(slug);
      if (property) return property;
    } catch {
      /* fall through */
    }
  }
  try {
    const data = await apiFetch(`/api/properties/${slug}`);
    return data.property;
  } catch (err) {
    if (import.meta.env.PROD) {
      return fetchStaticPropertyBySlug(slug);
    }
    throw err;
  }
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
