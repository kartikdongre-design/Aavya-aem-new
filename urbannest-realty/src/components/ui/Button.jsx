import { cn } from '../../utils/cn.js';

const variants = {
  primary: 'bg-gold-600 text-white hover:bg-gold-500 shadow-lg shadow-gold-600/25',
  secondary: 'border border-slate-300 bg-white text-slate-800 hover:border-gold-400 hover:text-gold-700',
  ghost: 'text-slate-700 hover:bg-slate-100',
  danger: 'bg-red-600 text-white hover:bg-red-500',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
