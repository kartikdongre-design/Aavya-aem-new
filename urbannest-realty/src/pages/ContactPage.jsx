import { useEffect, useState } from 'react';
import Container from '../components/layout/Container.jsx';
import InquiryForm from '../components/property/InquiryForm.jsx';
import { fetchCmsContent } from '../services/cmsService.js';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [contact, setContact] = useState({});

  useEffect(() => {
    fetchCmsContent().then((c) => setContact(c.contact || {})).catch(() => {});
  }, []);

  return (
    <div className="py-12 lg:py-20">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-slate-600">We&apos;re here to help you find your next property.</p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold-600" />{contact.phone}</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold-600" />{contact.email}</li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-gold-600" />{contact.address}</li>
          </ul>
        </div>
        <InquiryForm type="contact" title="Send a Message" />
      </Container>
    </div>
  );
}
