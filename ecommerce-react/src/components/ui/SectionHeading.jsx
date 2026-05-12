import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
}) {
  const alignment =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex max-w-3xl flex-col gap-2 ${alignment}`}>
      {eyebrow ? (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex w-fit rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-200"
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400"
        >
          {subtitle}
        </motion.p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
