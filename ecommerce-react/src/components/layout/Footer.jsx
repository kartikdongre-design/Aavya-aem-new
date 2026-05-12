import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin } from 'lucide-react';
import Container from './Container.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-gradient-to-b from-white/60 via-zinc-50/90 to-zinc-100 py-14 text-zinc-900 backdrop-blur-xl dark:border-white/10 dark:from-zinc-950/95 dark:via-zinc-950 dark:to-black dark:text-white">
      <Container className="grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
            Velvora<span className="text-brand-600 dark:text-brand-400">.</span>
          </span>
          <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Velvora brings you curated online shopping — fashion, tech, and lifestyle — with a glassmorphism UI,
            secure checkout, and frictionless discovery.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com" className="rounded-xl bg-zinc-900/5 p-2 hover:bg-zinc-900/10 dark:bg-white/10 dark:hover:bg-white/20" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://github.com" className="rounded-xl bg-zinc-900/5 p-2 hover:bg-zinc-900/10 dark:bg-white/10 dark:hover:bg-white/20" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="rounded-xl bg-zinc-900/5 p-2 hover:bg-zinc-900/10 dark:bg-white/10 dark:hover:bg-white/20" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-zinc-700 hover:text-brand-700 dark:text-zinc-200 dark:hover:text-white" to="/products">All products</Link></li>
            <li><Link className="text-zinc-700 hover:text-brand-700 dark:text-zinc-200 dark:hover:text-white" to="/products?category=Fashion">Fashion</Link></li>
            <li><Link className="text-zinc-700 hover:text-brand-700 dark:text-zinc-200 dark:hover:text-white" to="/products?category=Electronics">Electronics</Link></li>
            <li><Link className="text-zinc-700 hover:text-brand-700 dark:text-zinc-200 dark:hover:text-white" to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Support</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><span className="text-zinc-700 dark:text-zinc-200">Help center</span></li>
            <li><span className="text-zinc-700 dark:text-zinc-200">Shipping & returns</span></li>
            <li><span className="text-zinc-700 dark:text-zinc-200">Privacy</span></li>
            <li><span className="text-zinc-700 dark:text-zinc-200">Terms</span></li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 border-t border-zinc-200/90 pt-6 text-center text-xs text-zinc-500 dark:border-white/10">
        © {year} Velvora. Online shopping demo — not affiliated with brands shown.
      </Container>
    </footer>
  );
}
