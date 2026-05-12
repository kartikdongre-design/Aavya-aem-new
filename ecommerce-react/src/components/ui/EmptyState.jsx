import { motion } from 'framer-motion';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200/90 bg-white/40 px-6 py-14 text-center shadow-inner dark:border-zinc-700 dark:bg-zinc-900/30"
    >
      {Icon ? (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-violet-500/20 shadow-lg">
          <Icon className="h-8 w-8 text-brand-600 dark:text-brand-300" aria-hidden />
        </div>
      ) : null}
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </motion.div>
  );
}
