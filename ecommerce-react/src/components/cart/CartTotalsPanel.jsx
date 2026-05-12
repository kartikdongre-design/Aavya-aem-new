import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { formatPrice } from '../../utils/formatPrice.js';

/**
 * Reusable totals + promo + checkout CTA for cart experiences.
 */
export default function CartTotalsPanel({
  subtotal,
  discountAmount,
  shipping,
  tax,
  total,
  coupon,
  couponInput,
  onCouponInput,
  onApplyCoupon,
  onCheckout,
  footer = null,
}) {
  return (
    <aside className="h-fit rounded-3xl border border-white/55 bg-[var(--glass-light)] p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[var(--glass-dark)] lg:sticky lg:top-28">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Summary</p>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-500">Subtotal</dt>
          <dd className="font-semibold text-zinc-900 dark:text-white">{formatPrice(subtotal)}</dd>
        </div>
        {coupon ? (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <dt>
              Coupon ({coupon.code} {coupon.percent}%)
            </dt>
            <dd className="font-semibold">−{formatPrice(discountAmount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between">
          <dt className="text-zinc-500">Estimated shipping</dt>
          <dd className="font-semibold">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500">Estimated tax</dt>
          <dd className="font-semibold">{formatPrice(tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-zinc-200/70 pt-4 dark:border-zinc-700/70">
          <dt className="text-lg font-semibold text-zinc-900 dark:text-white">Total</dt>
          <dd className="text-lg font-bold text-brand-700 dark:text-brand-300">{formatPrice(total)}</dd>
        </div>
      </dl>
      <form className="mt-6 space-y-3" onSubmit={onApplyCoupon}>
        <Input
          placeholder="Promo code"
          value={couponInput}
          onChange={(e) => onCouponInput(e.target.value)}
          aria-label="Coupon code"
        />
        <Button type="submit" variant="secondary" className="w-full">
          Apply coupon
        </Button>
      </form>
      <Button type="button" className="mt-6 w-full" onClick={onCheckout}>
        Checkout
      </Button>
      {footer ? <div className="mt-3">{footer}</div> : null}
    </aside>
  );
}
