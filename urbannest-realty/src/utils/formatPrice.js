export function formatPrice(value, status = 'for-sale') {
  const n = Number(value) || 0;
  if (status === 'for-rent') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n) + '/mo';
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}
