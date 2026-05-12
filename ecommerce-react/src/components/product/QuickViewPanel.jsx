import { ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import RatingStars from '../ui/RatingStars.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { addToCart } from '../../store/slices/cartSlice.js';

export default function QuickViewPanel({ product, onClose }) {
  const dispatch = useDispatch();
  if (!product) return null;

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
    onClose?.();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">{product.category}</Badge>
          {discount > 0 ? <Badge tone="sale">{discount}% off</Badge> : null}
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-zinc-900 dark:text-white">
          {product.title}
        </h3>
        <RatingStars rating={product.rating} count={product.reviewCount} size="lg" />
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{product.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xl font-bold text-zinc-900 dark:text-white">
            {formatPrice(product.discountPrice)}
          </span>
          {product.discountPrice < product.price ? (
            <span className="text-lg text-zinc-400 line-through">{formatPrice(product.price)}</span>
          ) : null}
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button type="button" className="flex-1" onClick={handleAdd}>
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </Button>
          <Button
            to={`/product/${product.slug}`}
            variant="secondary"
            className="w-full flex-1"
            onClick={onClose}
          >
            Full details
          </Button>
        </div>
      </div>
    </div>
  );
}
