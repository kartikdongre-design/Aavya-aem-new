import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../layout/Container.jsx';
import { CATEGORIES } from '../../utils/categories.js';

export default function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Browse by Category</h2>
        <p className="mt-2 text-slate-600">Find the perfect property type for your lifestyle.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/properties?category=${cat.id}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:border-gold-300 hover:shadow-lg"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-lg font-semibold text-slate-900">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
