import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Breadcrumb from '../components/ui/Breadcrumb.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ProductCard from '../components/common/ProductCard.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import { getProducts } from '../services/productService.js';

export default function WishlistPage() {
  const ids = useSelector((s) => s.wishlist.productIds);
  const products = useMemo(() => {
    const all = getProducts();
    return all.filter((p) => ids.includes(p.id));
  }, [ids]);

  return (
    <PageWrapper>
      <Container className="py-8 sm:py-12">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />
        <SectionHeading eyebrow="Saved" title="Pieces you love" subtitle="Heart from any product card to curate this board." />
        {!products.length ? (
          <div className="mt-12">
            <EmptyState
              icon={Heart}
              title="No saved items yet"
              description="Tap the heart on product cards to build a premium shortlist."
              action={<Button to="/products">Discover products</Button>}
            />
          </div>
        ) : (
          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </PageWrapper>
  );
}
