import { motion } from 'framer-motion';
import Container from '../layout/Container.jsx';

const brands = ['Nimbus', 'Lumen', 'Astra', 'Kite', 'Orbit', 'Vertex'];

export default function BrandLogos() {
  return (
    <section className="border-y border-zinc-200/70 bg-white/35 py-12 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/30">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
          Brands we obsess over
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-3xl border border-zinc-200/80 bg-[var(--glass-light)] px-5 py-6 text-center text-sm font-bold tracking-[0.2em] text-zinc-800 shadow-inner shadow-brand-900/10 backdrop-blur-md dark:border-zinc-700 dark:bg-[var(--glass-dark)] dark:text-white"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
