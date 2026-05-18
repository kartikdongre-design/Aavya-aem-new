import { cn } from '../../utils/classNames.js';

const variants = {
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-200',
  error:
    'border-red-200 bg-red-50 text-red-800 dark:border-red-800/60 dark:bg-red-950/50 dark:text-red-200',
};

export default function FormAlert({ variant = 'error', children, className = '' }) {
  if (!children) return null;

  return (
    <p
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-xl border px-4 py-3 text-sm font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </p>
  );
}
