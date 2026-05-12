import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Breadcrumb from '../components/ui/Breadcrumb.jsx';
import ProductGallery from '../components/product/ProductGallery.jsx';
import RatingStars from '../components/ui/RatingStars.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import QuantitySelector from '../components/ui/QuantitySelector.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ProductCard from '../components/common/ProductCard.jsx';
import { getProductBySlug, getProducts } from '../services/productService.js';
import { formatPrice } from '../utils/formatPrice.js';
import { addToCart } from '../store/slices/cartSlice.js';
import { toggleWishlist } from '../store/slices/wishlistSlice.js';
import { cn } from '../utils/classNames.js';
import EmptyState from '../components/ui/EmptyState.jsx';

const sampleReviews = (seed) =>
  Array.from({ length: 5 }).map((_, i) => ({
    id: `${seed}-${i}`,
    author: ['Alex M.', 'Priya K.', 'Noah V.', 'Lina S.', 'Diego R.'][i % 5],
    title: ['Perfect fit', 'Worth every cent', 'Stunning packaging', 'Everyday staple', 'Game changer'][i % 5],
    body: 'Thoughtful craftsmanship, tactile materials, and a premium unboxing. Would recommend sizing up if between sizes.',
    rating: 4 + (i % 2 ? 1 : 0),
  }));

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishIds = useSelector((s) => s.wishlist.productIds);

  const product = useMemo(() => (slug ? getProductBySlug(slug) : null), [slug]);
  const related = useMemo(() => {
    if (!product) return [];
    return getProducts()
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (!product) return undefined;
    setSize(product.sizes?.[0] || '');
    setColor(product.colors?.[0]?.name || '');
    return undefined;
  }, [product]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const reviews = useMemo(() => (product ? sampleReviews(product.id) : []), [product]);

  if (!product) {
    return (
      <PageWrapper>
        <Container className="py-20">
          <EmptyState title="Product not found" description="This item may have moved. Browse the catalog to keep shopping." />
        </Container>
      </PageWrapper>
    );
  }

  const inWish = wishIds.includes(product.id);

  const add = (checkout = false) => {
    dispatch(
      addToCart({
        product,
        quantity: qty,
        selectedSize: size || null,
        selectedColor: color || null,
      }),
    );
    if (checkout) navigate('/checkout');
  };

  return (
    <PageWrapper className="pb-28 md:pb-10">
      <Container className="py-8 sm:py-12">
        <Breadcrumb
          items={[
            { label: 'Shop', href: '/products' },
            { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
            { label: product.title },
          ]}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} alt={product.title} />
          <div className="space-y-7">
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">{product.category}</Badge>
              {product.featured ? <Badge tone="success">Editor’s choice</Badge> : null}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-white">
              {product.title}
            </h1>
            <RatingStars rating={product.rating} count={product.reviewCount} size="lg" />
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{product.description}</p>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                {formatPrice(product.discountPrice)}
              </span>
              {product.discountPrice < product.price ? (
                <span className="text-xl text-zinc-400 line-through">{formatPrice(product.price)}</span>
              ) : null}
            </div>

            {product.sizes?.length ? (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={cn(
                        'rounded-xl border px-4 py-2 text-sm font-semibold transition',
                        size === s
                          ? 'border-brand-600 bg-brand-600/10 text-brand-900 dark:text-brand-100'
                          : 'border-zinc-200 bg-white/60 hover:border-brand-300 dark:border-zinc-600 dark:bg-zinc-900/50',
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {product.colors?.length ? (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Color</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={`Color ${c.name}`}
                      onClick={() => setColor(c.name)}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm ring-offset-2 transition',
                        color === c.name
                          ? 'border-brand-600 ring-2 ring-brand-400/40'
                          : 'border-transparent ring-zinc-200 dark:ring-zinc-700',
                      )}
                    >
                      <span className="h-8 w-8 rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-6">
              <QuantitySelector value={qty} onChange={setQty} />
              <Button
                type="button"
                variant="secondary"
                onClick={() => dispatch(toggleWishlist(product.id))}
                aria-pressed={inWish}
                className={inWish ? 'border-red-400 text-red-600' : ''}
              >
                {inWish ? 'Saved' : 'Wishlist'}
              </Button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="button" className="flex-1" onClick={() => add(false)}>
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => add(true)}>
                <Zap className="h-4 w-4" /> Buy now
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-16 rounded-[2rem] border border-white/50 bg-[var(--glass-light)] p-8 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)] sm:p-10">
          <SectionHeading eyebrow="Reviews" title={`What shoppers say (${reviews.length}+)`} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <motion.article
                key={r.id}
                layout
                className="rounded-2xl border border-zinc-200/70 bg-white/65 p-5 shadow-inner dark:border-zinc-700 dark:bg-zinc-900/55"
              >
                <RatingStars rating={r.rating} showValue={false} />
                <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{r.body}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">{r.author}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-16 pb-10">
          <SectionHeading eyebrow="You may also like" title="Related picks" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.length ? related.map((p) => <ProductCard key={p.id} product={p} /> ) : (
              <p className="text-sm text-zinc-500">More arrivals coming soon.</p>
            )}
          </div>
        </section>
      </Container>

      <motion.div
        initial={false}
        animate={{ y: showSticky ? 0 : 100, opacity: showSticky ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/50 bg-[var(--glass-light)]/95 px-4 py-3 shadow-[0_-14px_50px_-20px_rgba(0,0,0,.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)]/95 md:hidden"
      >
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
          <div>
            <p className="text-xs text-zinc-500">Total</p>
            <p className="font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 dark:text-white">
              {formatPrice(product.discountPrice * qty)}
            </p>
          </div>
          <Button type="button" className="flex-1" onClick={() => add(false)}>
            Add to cart
          </Button>
          <Button to="/cart" variant="secondary">
            Bag
          </Button>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
