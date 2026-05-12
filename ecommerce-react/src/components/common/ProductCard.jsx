import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import RatingStars from '../ui/RatingStars.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { addToCart } from '../../store/slices/cartSlice.js';
import { toggleWishlist } from '../../store/slices/wishlistSlice.js';
import { cn } from '../../utils/classNames.js';

function ProductCard({ product, onQuickView, className }) {
  const dispatch = useDispatch();
  const inWishlist = useSelector((s) => s.wishlist.productIds.includes(product.id));

  const image = product.images?.[0];
  const discount =
    product.price > product.discountPrice
      ? Math.round((1 - product.discountPrice / product.price) * 100)
      : 0;

  const handleAdd = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes?.[0] ?? null,
        selectedColor: product.colors?.[0]?.name ?? null,
      }),
    );
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-white/50 bg-[var(--glass-light)] p-4 shadow-lg shadow-black/5 backdrop-blur-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-500/10 dark:border-white/10 dark:bg-[var(--glass-dark)]',
        className,
      )}
    >
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden rounded-2xl">
        {discount > 0 ? (
          <Badge tone="sale" className="absolute left-3 top-3 z-[1] shadow-md">
            −{discount}%
          </Badge>
        ) : null}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          {image ? (
            <motion.img
              src={image}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              whileHover={{ scale: 1.06 }}
            />
          ) : null}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to={`/product/${product.slug}`}
              className="font-[family-name:var(--font-display)] text-base font-semibold text-zinc-900 line-clamp-2 hover:text-brand-600 dark:text-white dark:hover:text-brand-300"
            >
              {product.title}
            </Link>
            <p className="mt-0.5 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {product.category}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            className="shrink-0 border border-transparent hover:border-red-200 hover:bg-red-50 dark:hover:border-red-900/60 dark:hover:bg-red-950/40"
            onClick={() => dispatch(toggleWishlist(product.id))}
          >
            <Heart
              className={cn('h-5 w-5', inWishlist ? 'fill-red-500 text-red-500' : 'text-zinc-500')}
            />
          </Button>
        </div>

        <RatingStars rating={product.rating} count={product.reviewCount} />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-zinc-900 dark:text-white">
            {formatPrice(product.discountPrice)}
          </span>
          {product.discountPrice < product.price ? (
            <span className="text-sm text-zinc-400 line-through">{formatPrice(product.price)}</span>
          ) : null}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <Button
            type="button"
            className="flex-1 min-w-[120px]"
            onClick={handleAdd}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden /> Add to cart
          </Button>
          {onQuickView ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="shrink-0"
              onClick={() => onQuickView(product)}
              aria-label="Quick view product"
            >
              <Eye className="h-4 w-4" aria-hidden />
            </Button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
