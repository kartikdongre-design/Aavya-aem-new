import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { cn } from '../../utils/classNames.js';

export default function SearchBar({
  placeholder = 'Search products, brands, categories…',
  initialValue = '',
  className = '',
  onSearch,
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initialValue);

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      const term = q.trim();
      if (onSearch) onSearch(term);
      else navigate(term ? `/products?q=${encodeURIComponent(term)}` : '/products');
    },
    [q, navigate, onSearch],
  );

  return (
    <form
      onSubmit={submit}
      className={cn(
        'relative flex w-full max-w-xl flex-1 items-center rounded-2xl border border-zinc-200/80 bg-white/70 px-4 py-2 shadow-md shadow-brand-900/5 backdrop-blur-xl dark:border-zinc-600/70 dark:bg-zinc-900/65',
        className,
      )}
    >
      <Search className="mr-2 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden />
      <label htmlFor="global-search" className="sr-only">
        Search
      </label>
      <input
        id="global-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full border-0 bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
      />
    </form>
  );
}
