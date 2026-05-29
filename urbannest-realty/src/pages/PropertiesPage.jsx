import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/layout/Container.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import PropertySearch from '../components/property/PropertySearch.jsx';
import Loader from '../components/ui/Loader.jsx';
import { fetchProperties } from '../services/propertyService.js';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  useEffect(() => {
    fetchProperties()
      .then(setProperties)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = (params.get('q') || '').toLowerCase();
    const category = params.get('category') || '';
    const status = params.get('status') || '';
    return properties.filter((p) => {
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchCat = !category || p.category === category;
      const matchStatus = !status || p.status === status;
      return matchQ && matchCat && matchStatus;
    });
  }, [properties, params]);

  if (loading) return <Loader />;

  return (
    <div className="py-10 lg:py-16">
      <Container>
        <h1 className="font-display text-4xl font-bold text-slate-900">Property Listings</h1>
        <p className="mt-2 text-slate-600">{filtered.length} properties found</p>
        <div className="mt-8 max-w-4xl">
          <PropertySearch compact />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
        {!filtered.length ? (
          <p className="mt-12 text-center text-slate-500">No properties match your filters.</p>
        ) : null}
      </Container>
    </div>
  );
}
