import { Minus, Plus } from 'lucide-react';
import Button from './Button.jsx';
import { cn } from '../../utils/classNames.js';

export default function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}) {
  const dec = () => onChange?.(Math.max(min, value - 1));
  const inc = () => onChange?.(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl border border-zinc-200/80 bg-white/70 p-1 shadow-sm backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/70',
        className,
      )}
    >
      <Button variant="ghost" size="icon" type="button" onClick={dec} aria-label="Decrease quantity">
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-[2ch] text-center text-sm font-semibold tabular-nums text-zinc-900 dark:text-white">
        {value}
      </span>
      <Button variant="ghost" size="icon" type="button" onClick={inc} aria-label="Increase quantity">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
