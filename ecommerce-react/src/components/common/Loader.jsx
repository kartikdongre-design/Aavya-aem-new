import { motion } from 'framer-motion';

export default function Loader({ label = 'Loading' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-16"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="h-12 w-12 rounded-full border-2 border-brand-200 border-t-brand-600 dark:border-brand-900 dark:border-t-brand-300"
      />
      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
    </div>
  );
}
