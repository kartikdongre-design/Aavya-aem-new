import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Breadcrumb from '../components/ui/Breadcrumb.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ProductCard from '../components/common/ProductCard.jsx';
import ProductCardSkeleton from '../components/common/ProductCardSkeleton.jsx';
import { getProducts } from '../services/productService.js';
import Input from '../components/ui/Input.jsx';

const categories = [
  'All',
  'Fashion',
  'Electronics',
  'Shoes',
  'Watches',
  'Beauty',
  'Furniture',
  'Gaming',
  'Groceries',
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'rating', label: 'Top rated' },
];

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const q = (params.get('q') || '').trim().toLowerCase();
  const cat = params.get('category') || 'All';
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(t);
  }, [q, cat, sort]);

  const list = useMemo(() => {
    let items = getProducts();
    if (cat && cat !== 'All') {
      items = items.filter((p) => p.category === cat);
    }
    if (q) {
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (sort === 'price-asc') {
      items = [...items].sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sort === 'price-desc') {
      items = [...items].sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sort === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    } else {
      items = [...items].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return items;
  }, [q, cat, sort]);

  const setCategory = (next) => {
    const p = new URLSearchParams(params);
    if (next === 'All') p.delete('category');
    else p.set('category', next);
    setParams(p);
  };

  return (
    <PageWrapper>
      <Container className="py-8 sm:py-12">
        <Breadcrumb
          items={[
            { label: 'Shop', href: '/products' },
            { label: cat === 'All' ? 'All products' : cat },
          ]}
        />
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Catalog"
            title="Find your next obsession"
            subtitle="Filters, search, and sorting mirror premium marketplaces — optimized for smaller screens first."
          />
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Sort
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-zinc-200/90 bg-white/80 px-3 py-2.5 text-sm font-medium text-zinc-900 shadow-inner outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:border-zinc-600 dark:bg-zinc-900/60 dark:text-white"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-4">
          <aside className="rounded-3xl border border-white/50 bg-[var(--glass-light)] p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[var(--glass-dark)] lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Filters</p>
            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const active = (c === 'All' && cat === 'All') || c === cat;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${active ? 'bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-md' : 'bg-white/70 text-zinc-700 hover:bg-white dark:bg-zinc-800/70 dark:text-zinc-200'}`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 border-t border-zinc-200/70 pt-4 dark:border-zinc-700/70">
              <Input
                label="Refine keyword"
                placeholder="e.g. watch, serum…"
                defaultValue={q}
                key={q}
                onBlur={(e) => {
                  const term = e.target.value.trim().toLowerCase();
                  const p = new URLSearchParams(params);
                  if (term) p.set('q', term);
                  else p.delete('q');
                  setParams(p);
                }}
              />
            </div>
          </aside>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((k) => (
                  <ProductCardSkeleton key={k} />
                ))}
              </div>
            ) : (
              <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </motion.div>
            )}
            {!loading && list.length === 0 ? (
              <p className="mt-10 rounded-3xl border border-dashed border-zinc-200 p-12 text-center text-sm text-zinc-500 dark:border-zinc-700">
                Nothing matched your filters. Try another category or search term.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
