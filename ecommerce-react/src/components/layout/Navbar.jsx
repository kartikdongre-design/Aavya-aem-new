import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Menu, ShoppingBag, User, LogOut, Package } from 'lucide-react';
import SearchBar from '../ui/SearchBar.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import MobileMenu from './MobileMenu.jsx';
import { logout } from '../../store/slices/authSlice.js';

const navClass = ({ isActive }) =>
  `text-sm font-semibold transition ${isActive ? 'text-brand-600 dark:text-brand-300' : 'text-zinc-600 hover:text-brand-600 dark:text-zinc-300 dark:hover:text-brand-300'}`;

export default function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useSelector((s) => s.wishlist.productIds.length);
  const user = useSelector((s) => s.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/30 bg-[var(--glass-light)]/90 shadow-sm shadow-black/5 backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)]/90">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-zinc-900 dark:text-white"
          >
            Velvora<span className="text-brand-600 dark:text-brand-400">.</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            <NavLink className={navClass} to="/">
              Home
            </NavLink>
            <NavLink className={navClass} to="/products">
              Shop
            </NavLink>
            <NavLink className={navClass} to="/products?category=Fashion">
              Fashion
            </NavLink>
            <NavLink className={navClass} to="/products?category=Electronics">
              Tech
            </NavLink>
          </nav>

          <div className="hidden md:block md:flex-1">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link
              to="/wishlist"
              className="relative inline-flex rounded-2xl p-2.5 transition hover:bg-white/70 dark:hover:bg-white/10"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 text-zinc-800 dark:text-zinc-100" aria-hidden />
              {wishCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-1 text-[10px] font-bold text-white shadow-md">
                  {wishCount > 99 ? '99+' : wishCount}
                </span>
              ) : null}
            </Link>
            <Link
              to="/cart"
              className="relative inline-flex rounded-2xl p-2.5 transition hover:bg-white/70 dark:hover:bg-white/10"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5 text-zinc-800 dark:text-zinc-100" aria-hidden />
              {cartCount > 0 ? (
                <Badge tone="brand" className="absolute -right-1 -top-1 px-1.5 py-0 text-[10px]">
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              ) : null}
            </Link>

            <div className="relative" ref={profileRef}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
                aria-expanded={profileOpen}
                aria-haspopup="true"
                onClick={() => setProfileOpen((v) => !v)}
                aria-label="Account menu"
              >
                <User className="h-5 w-5" />
              </Button>
              {profileOpen ? (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/40 bg-white/90 p-2 shadow-2xl backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/95">
                  {user ? (
                    <>
                      <p className="border-b border-zinc-200/80 px-3 py-2 text-xs font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                        Hello, {user.name}
                      </p>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <Package className="h-4 w-4" /> Orders
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(logout());
                          setProfileOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <LogOut className="h-4 w-4" /> Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-950/40"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>
              ) : null}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
