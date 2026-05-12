import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import Container from '../layout/Container.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import ProductCard from '../common/ProductCard.jsx';

export default function FlashSale({ products }) {
  const end = useMemo(() => new Date(Date.now() + 1000 * 60 * 60 * 26 + 1000 * 60 * 14), []);
  const { label } = useCountdown(end);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-rose-200/60 bg-gradient-to-br from-rose-500/15 via-orange-400/10 to-amber-300/20 p-8 shadow-xl dark:border-rose-900/40 dark:from-rose-900/30 dark:via-orange-900/25 dark:to-amber-900/25 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-rose-700 shadow-sm backdrop-blur-md dark:bg-zinc-950/55 dark:text-rose-200">
                <Flame className="h-4 w-4 text-orange-600" aria-hidden />
                Flash sale
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-zinc-900 dark:text-white">
                Up to 40% off today’s staples
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Limited inventory on electronics, sneakers, and beauty kits. Timer resets nightly for demo purposes.
              </p>
            </div>
            <motion.div
              layout
              className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 px-6 py-5 text-white shadow-2xl dark:from-black dark:to-zinc-900"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">Ends in</p>
              <p className="mt-2 font-mono text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">{label}</p>
            </motion.div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
