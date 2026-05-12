import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Breadcrumb from '../components/ui/Breadcrumb.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import QuantitySelector from '../components/ui/QuantitySelector.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { removeFromCart, updateQuantity, applyCoupon } from '../store/slices/cartSlice.js';
import { useCartTotals } from '../hooks/useCartTotals.js';
import CartTotalsPanel from '../components/cart/CartTotalsPanel.jsx';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((s) => s.cart.items);
  const coupon = useSelector((s) => s.cart.coupon);
  const { subtotal, discountAmount, shipping, tax, total } = useCartTotals(items, coupon);
  const [couponInput, setCouponInput] = useState('');

  return (
    <PageWrapper>
      <Container className="py-8 sm:py-12">
        <Breadcrumb items={[{ label: 'Cart' }]} />
        <SectionHeading eyebrow="Your bag" title="Review & elevate" subtitle="Coupon codes: SAVE10 or WELCOME20" />

        {!items.length ? (
          <div className="mt-12">
            <EmptyState
              icon={ShoppingBag}
              title="Your cart feels light"
              description="Explore featured picks on the homepage or jump back into shop."
              action={<Button to="/products">Continue shopping</Button>}
            />
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr,380px]">
            <motion.ul layout className="space-y-4">
              {items.map((line) => {
                const thumb = line.product.images?.[0];
                const unit = line.product.discountPrice ?? line.product.price;
                return (
                  <motion.li
                    layout
                    key={line.key}
                    className="flex gap-4 rounded-3xl border border-white/50 bg-[var(--glass-light)] p-4 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[var(--glass-dark)]"
                  >
                    <Link
                      to={`/product/${line.product.slug}`}
                      className="relative block h-28 w-24 shrink-0 overflow-hidden rounded-2xl"
                      aria-label={`View ${line.product.title}`}
                    >
                      {thumb ? (
                        <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : null}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${line.product.slug}`}
                            className="font-semibold text-zinc-900 dark:text-white"
                          >
                            {line.product.title}
                          </Link>
                          {(line.selectedSize || line.selectedColor) && (
                            <p className="text-xs text-zinc-500">
                              {[line.selectedSize, line.selectedColor].filter(Boolean).join(' • ')}
                            </p>
                          )}
                        </div>
                        <p className="font-bold text-brand-700 dark:text-brand-300">{formatPrice(unit * line.quantity)}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <QuantitySelector
                          value={line.quantity}
                          onChange={(n) => dispatch(updateQuantity({ key: line.key, quantity: n }))}
                        />
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-500"
                          onClick={() => dispatch(removeFromCart(line.key))}
                          aria-label={`Remove ${line.product.title}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div layout>
              <CartTotalsPanel
                subtotal={subtotal}
                discountAmount={discountAmount}
                shipping={shipping}
                tax={tax}
                total={total}
                coupon={coupon}
                couponInput={couponInput}
                onCouponInput={setCouponInput}
                onApplyCoupon={(e) => {
                  e.preventDefault();
                  dispatch(applyCoupon(couponInput));
                }}
                onCheckout={() => navigate('/checkout')}
                footer={
                  <Button to="/products" variant="ghost" className="w-full justify-center dark:hover:bg-white/10">
                    Keep browsing
                  </Button>
                }
              />
            </motion.div>
          </div>
        )}
      </Container>
    </PageWrapper>
  );
}
