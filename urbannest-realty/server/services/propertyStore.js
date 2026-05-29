import { readJsonFile, writeJsonFile } from './jsonStore.js';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getAllProperties() {
  const data = await readJsonFile('properties.json');
  return data?.properties || [];
}

export async function getPropertyBySlug(slug) {
  const properties = await getAllProperties();
  return properties.find((p) => p.slug === slug) || null;
}

export async function getPropertyById(id) {
  const properties = await getAllProperties();
  return properties.find((p) => p.id === id) || null;
}

export async function createProperty(payload) {
  const data = (await readJsonFile('properties.json')) || { properties: [] };
  const id = `prop-${Date.now()}`;
  const slug = payload.slug || slugify(payload.title);
  const property = {
    id,
    slug,
    title: payload.title || '',
    description: payload.description || '',
    price: Number(payload.price) || 0,
    location: payload.location || '',
    category: payload.category || 'apartments',
    bedrooms: Number(payload.bedrooms) || 0,
    bathrooms: Number(payload.bathrooms) || 0,
    areaSqft: Number(payload.areaSqft) || 0,
    featured: Boolean(payload.featured),
    status: payload.status || 'for-sale',
    images: Array.isArray(payload.images) ? payload.images : [],
    amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
    agent: payload.agent || { name: '', phone: '', email: '', photo: '' },
    mapEmbed: payload.mapEmbed || '',
  };
  data.properties.push(property);
  await writeJsonFile('properties.json', data);
  return property;
}

export async function updateProperty(id, payload) {
  const data = (await readJsonFile('properties.json')) || { properties: [] };
  const idx = data.properties.findIndex((p) => p.id === id);
  if (idx === -1) {
    const err = new Error('Property not found');
    err.code = 'NOT_FOUND';
    throw err;
  }
  data.properties[idx] = { ...data.properties[idx], ...payload, id };
  if (payload.title && !payload.slug) {
    data.properties[idx].slug = slugify(payload.title);
  }
  await writeJsonFile('properties.json', data);
  return data.properties[idx];
}

export async function deleteProperty(id) {
  const data = (await readJsonFile('properties.json')) || { properties: [] };
  const before = data.properties.length;
  data.properties = data.properties.filter((p) => p.id !== id);
  if (data.properties.length === before) {
    const err = new Error('Property not found');
    err.code = 'NOT_FOUND';
    throw err;
  }
  await writeJsonFile('properties.json', data);
}
