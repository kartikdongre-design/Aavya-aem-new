import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/classNames.js';

const gradients = [
  'from-fuchsia-500/30 via-violet-500/30 to-brand-600/35',
  'from-emerald-500/30 via-teal-500/25 to-cyan-600/35',
  'from-amber-500/35 via-orange-400/25 to-rose-500/30',
  'from-blue-500/30 via-indigo-500/25 to-sky-500/35',
  'from-lime-500/25 via-green-400/25 to-emerald-600/30',
  'from-orange-400/35 via-red-400/25 to-rose-500/30',
  'from-purple-600/35 via-brand-700/35 to-brand-500/30',
  'from-yellow-400/35 via-orange-300/25 to-red-400/30',
];

export default function CategoryCard({ title, subtitle, slug, gradientIndex = 0 }) {
  const g = gradients[gradientIndex % gradients.length];
  return (
    <motion.div whileHover={{ y: -6 }} className="h-full">
      <Link
        to={`/products?category=${encodeURIComponent(slug)}`}
        className={cn(
          'relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br p-5 shadow-lg shadow-black/5 backdrop-blur-2xl dark:border-white/10',
          `bg-gradient-to-br ${g}`,
        )}
      >
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-zinc-900 dark:text-white">
          {title}
        </span>
        <div className="flex items-center justify-between">
          <p className="max-w-[80%] text-xs font-medium leading-relaxed text-zinc-800/80 dark:text-zinc-100/85">
            {subtitle}
          </p>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/65 text-zinc-900 shadow-md backdrop-blur-md dark:bg-zinc-950/55 dark:text-white">
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </span>
        </div>
        <motion.span
          className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/35 blur-2xl dark:bg-white/15"
          layoutId={`glow-${title}`}
        />
      </Link>
    </motion.div>
  );
}
