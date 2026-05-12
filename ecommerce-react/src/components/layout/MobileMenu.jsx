import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import SearchBar from '../ui/SearchBar.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/products?category=Fashion', label: 'Fashion' },
  { to: '/products?category=Electronics', label: 'Electronics' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/cart', label: 'Cart' },
];

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} aria-label="Close menu" />
          <motion.nav
            className="absolute right-0 top-0 flex h-full w-[min(100%,340px)] flex-col gap-4 border-l border-white/30 bg-[var(--glass-light)] p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            aria-label="Mobile"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white dark:text-white">
                Menu
              </span>
              <Button variant="ghost" size="icon" type="button" onClick={onClose} aria-label="Close navigation">
                <X className="h-6 w-6" stroke='#fff' />
              </Button>
            </div>
            <SearchBar
              placeholder="Search the store…"
              onSearch={(term) => {
                onClose();
                window.location.href = term ? `/products?q=${encodeURIComponent(term)}` : '/products';
              }}
            />
            <ul className="mt-2 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="block rounded-2xl px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/60 dark:text-zinc-100 dark:hover:bg-white/10"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 border-t border-zinc-200/60 pt-4 dark:border-zinc-700/60">
              <div className="flex items-center justify-between rounded-2xl bg-white/50 px-3 py-2 dark:bg-zinc-950/35">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Theme</span>
                <ThemeToggle />
              </div>
              <Link to="/login" onClick={onClose} className="text-center text-sm font-semibold text-white dark:text-brand-300">
                Log in
              </Link>
              <Link to="/signup" onClick={onClose} className="text-center text-sm font-semibold text-white dark:text-white">
                Create account
              </Link>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
