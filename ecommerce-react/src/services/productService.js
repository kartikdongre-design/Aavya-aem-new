import productsData from '../data/products.json';

/** @typedef {typeof productsData[number]} Product */

/** @returns {Product[]} */
export function getProducts() {
  return productsData;
}

/**
 * @param {string} slug
 * @returns {Product | undefined}
 */
export function getProductBySlug(slug) {
  return productsData.find((p) => p.slug === slug);
}

/**
 * @param {string} id
 * @returns {Product | undefined}
 */
export function getProductById(id) {
  return productsData.find((p) => p.id === id);
}

/**
 * @param {string} category
 * @returns {Product[]}
 */
export function getProductsByCategory(category) {
  if (!category || category === 'All') return productsData;
  return productsData.filter((p) => p.category === category);
}
