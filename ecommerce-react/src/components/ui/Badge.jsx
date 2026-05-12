import { cn } from '../../utils/classNames.js';

const tones = {
  default: 'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-white',
  brand: 'bg-brand-500/15 text-brand-700 dark:text-brand-200',
  success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  warn: 'bg-amber-500/15 text-amber-800 dark:text-amber-200',
  sale: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md',
};

export default function Badge({ children, tone = 'default', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
        tones[tone] || tones.default,
        className,
      )}
    >
      {children}
    </span>
  );
}
