import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import CategoryGrid from '../components/home/CategoryGrid.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import PartnersSection from '../components/home/PartnersSection.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import InquiryForm from '../components/property/InquiryForm.jsx';
import Loader from '../components/ui/Loader.jsx';
import Button from '../components/ui/Button.jsx';
import { fetchProperties } from '../services/propertyService.js';
import { fetchCmsContent } from '../services/cmsService.js';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [cms, setCms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProperties(), fetchCmsContent()])
      .then(([props, content]) => {
        setProperties(props);
        setCms(content);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const featured = properties.filter((p) => p.featured).slice(0, 3);
  const latest = [...properties].slice(0, 6);

  return (
    <>
      <HeroSection cms={cms} />
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">Featured Properties</h2>
              <p className="mt-2 text-slate-600">Handpicked luxury listings for discerning buyers.</p>
            </div>
            <Link to="/properties" className="hidden sm:block">
              <Button variant="secondary">View All</Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </Container>
      </section>
      <CategoryGrid />
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="font-display text-3xl font-bold text-slate-900">Latest Listings</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </Container>
      </section>
      <TestimonialsSection testimonials={cms?.testimonials} />
      <PartnersSection partners={cms?.partners} />
      <section className="bg-slate-950 py-16 text-white lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Get in Touch</h2>
            <p className="mt-3 text-slate-400">Schedule a visit or ask about any property. Our team responds within 24 hours.</p>
          </div>
          <InquiryForm type="contact" title="Contact Us" />
        </Container>
      </section>
    </>
  );
}
