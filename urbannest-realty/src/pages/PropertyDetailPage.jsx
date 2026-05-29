import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, ArrowLeft } from 'lucide-react';
import Container from '../components/layout/Container.jsx';
import InquiryForm from '../components/property/InquiryForm.jsx';
import Loader from '../components/ui/Loader.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { getCategoryLabel } from '../utils/categories.js';
import { fetchPropertyBySlug } from '../services/propertyService.js';

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertyBySlug(slug)
      .then((p) => {
        setProperty(p);
        setActiveImg(0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (!property) {
    return (
      <Container className="py-20 text-center">
        <p>Property not found.</p>
        <Link to="/properties" className="mt-4 text-gold-600">Back to listings</Link>
      </Container>
    );
  }

  const images = property.images?.length ? property.images : [''];

  return (
    <div className="py-8 lg:py-12">
      <Container>
        <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-gold-600">
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl">
              <img src={images[activeImg]} alt={property.title} className="aspect-[16/10] w-full object-cover" />
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 ${activeImg === i ? 'border-gold-500' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <h1 className="mt-8 font-display text-3xl font-bold text-slate-900 lg:text-4xl">{property.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-600">
              <MapPin className="h-5 w-5" />
              {property.location}
            </p>
            <p className="mt-2 text-2xl font-semibold text-gold-700">{formatPrice(property.price, property.status)}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-slate-700">
              {property.bedrooms > 0 ? (
                <span className="flex items-center gap-2"><Bed className="h-5 w-5" />{property.bedrooms} Bedrooms</span>
              ) : null}
              <span className="flex items-center gap-2"><Bath className="h-5 w-5" />{property.bathrooms} Bathrooms</span>
              <span className="flex items-center gap-2"><Maximize className="h-5 w-5" />{property.areaSqft?.toLocaleString()} sqft</span>
            </div>
            <p className="mt-8 leading-relaxed text-slate-600">{property.description}</p>
            <h2 className="mt-10 text-xl font-semibold">Features & Amenities</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {(property.amenities || []).map((a) => (
                <li key={a} className="flex items-center gap-2 text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  {a}
                </li>
              ))}
            </ul>
            {property.mapEmbed ? (
              <div className="mt-10 aspect-video overflow-hidden rounded-2xl">
                <iframe title="Map" src={property.mapEmbed} className="h-full w-full border-0" loading="lazy" />
              </div>
            ) : null}
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold uppercase text-gold-600">{getCategoryLabel(property.category)}</p>
              <h3 className="mt-4 text-lg font-semibold">Your Agent</h3>
              <div className="mt-4 flex items-center gap-4">
                <img src={property.agent?.photo} alt="" className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{property.agent?.name}</p>
                  <p className="text-sm text-slate-500">{property.agent?.phone}</p>
                  <p className="text-sm text-gold-600">{property.agent?.email}</p>
                </div>
              </div>
            </div>
            <InquiryForm propertyId={property.id} type="property" title="Schedule a Visit" />
          </aside>
        </div>
      </Container>
    </div>
  );
}
