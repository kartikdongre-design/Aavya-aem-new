import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/classNames.js';

/**
 * @param {{ label: string, href?: string }[]} items
 */
export default function Breadcrumb({ items = [], className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-zinc-500 dark:text-zinc-400">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-lg px-1 py-0.5 font-medium text-zinc-600 transition hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-300"
          >
            <Home className="h-3.5 w-3.5" aria-hidden />
            Home
          </Link>
        </li>
        {items.map((crumb, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 opacity-70" aria-hidden />
              {!last && crumb.href ? (
                <Link
                  className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400"
                  to={crumb.href}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-zinc-900 dark:text-white">{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
