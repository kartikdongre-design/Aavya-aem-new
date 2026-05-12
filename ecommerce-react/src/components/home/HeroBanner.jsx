import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button.jsx';

export default function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-br from-violet-600/90 via-brand-600 to-fuchsia-500/90 p-8 shadow-2xl shadow-brand-900/25 sm:p-12 lg:p-16 dark:border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.25),transparent_40%)]" />
      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            New season drop
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Curated living.
            <br />
            <span className="text-white/90">Glass-smooth shopping.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl text-base text-white/85 sm:text-lg"
          >
            Discover premium fashion, tech, and home essentials with adaptive search, wishlists, and
            checkout tuned for speed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-3"
          >
            <Button to="/products" className="bg-white text-brand-700 shadow-xl hover:brightness-95">
              Shop all <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              to="/products?category=Shoes"
              variant="secondary"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20"
            >
              Explore footwear
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="relative mx-auto max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/40 bg-white/10 shadow-2xl backdrop-blur-2xl">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
              alt="Premium fashion collection"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute -left-6 top-12 hidden rounded-3xl border border-white/35 bg-white/15 px-5 py-4 shadow-xl backdrop-blur-xl sm:block"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Member perks</p>
            <p className="mt-1 text-lg font-bold text-white">Free express over $120</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
