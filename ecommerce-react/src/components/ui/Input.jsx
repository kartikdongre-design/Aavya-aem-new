import { forwardRef } from 'react';
import { cn } from '../../utils/classNames.js';

const Input = forwardRef(function Input(
  { label, error, hint, id, className = '', wrapperClassName = '', ...props },
  ref,
) {
  const autoId = id || props.name || 'input-field';
  return (
    <div className={cn('w-full space-y-1.5', wrapperClassName)}>
      {label ? (
        <label htmlFor={autoId} className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={autoId}
        className={cn(
          'w-full rounded-xl border border-zinc-200/90 bg-white/80 px-4 py-2.5 text-sm text-zinc-900 shadow-inner shadow-zinc-200/40 outline-none ring-0 transition placeholder:text-zinc-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:border-zinc-600 dark:bg-zinc-900/60 dark:text-white dark:shadow-none dark:placeholder:text-zinc-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-400/30',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p> : null}
      {hint && !error ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
