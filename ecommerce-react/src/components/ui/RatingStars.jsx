import { Star } from 'lucide-react';
import { cn } from '../../utils/classNames.js';

export default function RatingStars({
  rating = 0,
  count,
  showValue = true,
  size = 'sm',
}) {
  const filled = Math.min(5, Math.max(0, Math.round(rating)));
  const starSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSize,
              filled >= star ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-600',
            )}
            aria-hidden
            strokeWidth={1.2}
          />
        ))}
      </div>
      {showValue ? (
        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          {rating.toFixed(1)}
          {typeof count === 'number' ? ` (${count})` : ''}
        </span>
      ) : null}
    </div>
  );
}
