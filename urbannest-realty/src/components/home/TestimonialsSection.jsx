import { motion } from 'framer-motion';
import Container from '../layout/Container.jsx';

export default function TestimonialsSection({ testimonials = [] }) {
  if (!testimonials.length) return null;
  return (
    <section className="bg-slate-100 py-16 lg:py-24">
      <Container>
        <h2 className="font-display text-3xl font-bold text-slate-900">Client Stories</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white p-6 shadow-lg"
            >
              <p className="text-slate-600">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
