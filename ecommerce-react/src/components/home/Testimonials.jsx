import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import Container from '../layout/Container.jsx';

const testimonials = [
  {
    quote: 'The glass aesthetic feels Apple-grade. Checkout was instant and animations never jank.',
    name: 'Maya Collins',
    role: 'Creative Director · Studio North',
    tone: 'from-emerald-500/20 via-teal-500/15 to-cyan-500/20',
  },
  {
    quote: 'Search + wishlist flow is the best I’ve demoed for a headless React storefront.',
    name: 'Jonah Pierce',
    role: 'CTO · Loop Commerce',
    tone: 'from-violet-500/25 via-brand-600/20 to-fuchsia-500/25',
  },
  {
    quote: 'Mobile menu, sticky nav, and sale banner feel cohesive — premium without clutter.',
    name: 'Elena Rao',
    role: 'Buyer · Meridian Retail',
    tone: 'from-rose-400/25 via-orange-400/18 to-amber-400/18',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by picky shoppers"
          align="center"
          subtitle="Stories from teams stress-testing polish, responsiveness, and speed."
        />
        <div className="mx-auto mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/45 bg-gradient-to-br p-8 shadow-xl backdrop-blur-xl dark:border-white/15 ${t.tone}`}
            >
              <Quote className="h-8 w-8 text-brand-600 dark:text-brand-300" aria-hidden />
              <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/40 pt-5 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                {t.name}
                <span className="mt-2 block text-[11px] font-medium normal-case tracking-normal text-zinc-500">
                  {t.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
