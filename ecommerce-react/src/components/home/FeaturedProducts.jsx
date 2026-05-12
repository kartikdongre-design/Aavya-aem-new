import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading.jsx';
import ProductCard from '../common/ProductCard.jsx';
import Container from '../layout/Container.jsx';
import Button from '../ui/Button.jsx';

export default function FeaturedProducts({ products, onQuickView }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured"
            title="Editor’s picks"
            subtitle="Hover for zoom, quick view, and one-tap cart adds — tuned for premium conversion."
          />
          <Button to="/products" variant="secondary" className="shrink-0">
            Browse catalog
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={p} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
