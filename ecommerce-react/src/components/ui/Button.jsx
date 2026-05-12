import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/classNames.js';

const variants = {
  primary:
    'bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/45 hover:brightness-105',
  secondary:
    'bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-600/70 text-zinc-900 dark:text-white hover:bg-white dark:hover:bg-zinc-700/90',
  ghost:
    'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-100',
  outline:
    'border-2 border-brand-500 text-brand-600 dark:text-brand-300 hover:bg-brand-500/10',
  danger:
    'bg-red-600 text-white hover:bg-red-500 shadow-md',
};

const sizes = {
  sm: 'text-sm px-3 py-2 rounded-lg',
  md: 'text-sm md:text-base px-4 py-2.5 rounded-xl',
  lg: 'text-base px-6 py-3 rounded-2xl',
  icon: 'p-2.5 rounded-xl',
};

/**
 * Accessible button presets. Pass `to` for a Router `<Link>` styled as a button.
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    disabled,
    children,
    type = 'button',
    to,
    onClick,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const classes = cn(
    'inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  );

  const content = (
    <>
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </>
  );

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={classes}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
          } else {
            onClick?.(e);
          }
        }}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;
