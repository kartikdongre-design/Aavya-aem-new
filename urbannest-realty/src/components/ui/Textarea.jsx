import { cn } from '../../utils/cn.js';

export default function Textarea({ label, error, className = '', id, ...props }) {
  const fieldId = id || props.name || 'textarea';
  return (
    <div className="space-y-1.5">
      {label ? <label htmlFor={fieldId} className="block text-sm font-medium text-slate-700">{label}</label> : null}
      <textarea
        id={fieldId}
        className={cn(
          'min-h-[100px] w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20',
          error && 'border-red-500',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
