import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from './Container.jsx';

export default function Footer({ contact = {} }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-bold text-white">
            Urban<span className="text-gold-400">Nest</span> Realty
          </p>
          <p className="mt-3 max-w-md text-sm text-slate-400">
            Premium real estate experiences — luxury homes, investment properties, and personalized service for buyers and sellers.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/properties" className="hover:text-white">All Properties</Link></li>
            <li><Link to="/properties?category=villas" className="hover:text-white">Villas</Link></li>
            <li><Link to="/properties?category=luxury-homes" className="hover:text-white">Luxury Homes</Link></li>
            <li><Link to="/admin/login" className="hover:text-white">Admin</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold-500" />{contact.phone || '+1 (555) 234-8900'}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-500" />{contact.email || 'hello@urbannest.com'}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />{contact.address || '1200 Skyline Avenue, NY'}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} UrbanNest Realty. All rights reserved.
      </div>
    </footer>
  );
}
