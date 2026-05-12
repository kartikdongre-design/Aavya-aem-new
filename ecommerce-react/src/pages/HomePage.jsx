import { useMemo, useState } from 'react';
import { getProducts } from '../services/productService.js';
import HeroBanner from '../components/home/HeroBanner.jsx';
import CategoriesSection from '../components/home/CategoriesSection.jsx';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import FlashSale from '../components/home/FlashSale.jsx';
import TrendingCarousel from '../components/home/TrendingCarousel.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import BrandLogos from '../components/home/BrandLogos.jsx';
import NewsletterSection from '../components/home/NewsletterSection.jsx';
import Modal from '../components/ui/Modal.jsx';
import QuickViewPanel from '../components/product/QuickViewPanel.jsx';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';

export default function HomePage() {
  const all = useMemo(() => getProducts(), []);
  const featured = useMemo(() => all.filter((p) => p.featured).slice(0, 8), [all]);
  const flash = useMemo(() => all.filter((p) => p.sale).slice(0, 3), [all]);
  const trending = useMemo(() => [...all].sort((a, b) => b.rating - a.rating).slice(0, 8), [all]);
  const [qv, setQv] = useState(null);

  return (
    <PageWrapper>
      <Container className="space-y-4 pt-6 sm:pt-10">
        <HeroBanner />
      </Container>
      <CategoriesSection />
      <FeaturedProducts products={featured} onQuickView={setQv} />
      <FlashSale products={flash} />
      <TrendingCarousel products={trending} onQuickView={setQv} />
      <Testimonials />
      <BrandLogos />
      <NewsletterSection />
      <Modal open={Boolean(qv)} onClose={() => setQv(null)} title="Quick view" size="lg">
        <QuickViewPanel product={qv} onClose={() => setQv(null)} />
      </Modal>
    </PageWrapper>
  );
}
