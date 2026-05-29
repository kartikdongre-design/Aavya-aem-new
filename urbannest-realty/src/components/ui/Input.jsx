import { cn } from '../../utils/cn.js';

export default function Input({ label, error, className = '', id, ...props }) {
  const fieldId = id || props.name || 'field';
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={fieldId} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <input
        id={fieldId}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-400/20',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
