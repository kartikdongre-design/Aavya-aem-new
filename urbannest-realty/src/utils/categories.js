export const CATEGORIES = [
  { id: 'apartments', label: 'Apartments', icon: '🏢' },
  { id: 'villas', label: 'Villas', icon: '🏡' },
  { id: 'luxury-homes', label: 'Luxury Homes', icon: '✨' },
  { id: 'commercial', label: 'Commercial Spaces', icon: '🏬' },
  { id: 'rental', label: 'Rental Properties', icon: '🔑' },
  { id: 'farmhouses', label: 'Farmhouses', icon: '🌾' },
];

export function getCategoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label || id;
}
