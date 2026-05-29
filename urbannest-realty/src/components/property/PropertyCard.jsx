import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatPrice.js';
import { getCategoryLabel } from '../../utils/categories.js';
import Button from '../ui/Button.jsx';

export default function PropertyCard({ property, index = 0 }) {
  const img = property.images?.[0] || '';
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {property.featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        ) : null}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
          {getCategoryLabel(property.category)}
        </span>
      </div>
      <div className="p-5">
        <p className="font-display text-2xl font-semibold text-gold-700">{formatPrice(property.price, property.status)}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900 line-clamp-1">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" />
          {property.location}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
          {property.bedrooms > 0 ? (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {property.bedrooms} Beds
            </span>
          ) : null}
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            {property.areaSqft?.toLocaleString()} sqft
          </span>
        </div>
        <Link to={`/properties/${property.slug}`} className="mt-5 block">
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </motion.article>
  );
}
