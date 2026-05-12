import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading.jsx';
import CategoryCard from '../common/CategoryCard.jsx';
import Container from '../layout/Container.jsx';

const categories = [
  { title: 'Fashion', subtitle: 'Runway-ready layers & textures', slug: 'Fashion' },
  { title: 'Electronics', subtitle: 'Spatial sound & smart hubs', slug: 'Electronics' },
  { title: 'Shoes', subtitle: 'Performance and street classics', slug: 'Shoes' },
  { title: 'Watches', subtitle: 'Titanium chronographs', slug: 'Watches' },
  { title: 'Beauty', subtitle: 'Glow rituals that last', slug: 'Beauty' },
  { title: 'Furniture', subtitle: 'Sculptural living spaces', slug: 'Furniture' },
  { title: 'Gaming', subtitle: 'Gear that keeps up', slug: 'Gaming' },
  { title: 'Groceries', subtitle: 'Farm-fresh staples', slug: 'Groceries' },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="Shop by mood, not aisle"
          subtitle="Eight curated universes — each card opens a filtered storefront with glassy gradients."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <CategoryCard {...c} gradientIndex={i} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
