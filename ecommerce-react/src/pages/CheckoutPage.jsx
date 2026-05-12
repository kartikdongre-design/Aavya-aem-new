import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Breadcrumb from '../components/ui/Breadcrumb.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PaymentTiles from '../components/checkout/PaymentTiles.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { useCartTotals } from '../hooks/useCartTotals.js';
import { ShoppingBag } from 'lucide-react';
import { clearCart } from '../store/slices/cartSlice.js';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const coupon = useSelector((s) => s.cart.coupon);
  const { subtotal, discountAmount, shipping, tax, total } = useCartTotals(items, coupon);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [payment, setPayment] = useState('card');
  const [errors, setErrors] = useState({});

  const onChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((e0) => ({ ...e0, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!/^[0-9]{4,}$/.test(form.zip.replace(/\s/g, ''))) e.zip = 'Use a valid postal code';
    if (payment === 'card') {
      if (!form.cardName.trim()) e.cardName = 'Required';
      if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, '').length < 12) {
        e.cardNumber = 'Valid card required';
      }
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Use MM/YY';
      if (!/^[0-9]{3,4}$/.test(form.cvc)) e.cvc = 'CVV invalid';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = (ev) => {
    ev.preventDefault();
    if (!items.length || !validate()) return;
    dispatch(clearCart());
    navigate('/order-success');
  };

  return (
    <PageWrapper>
      <Container className="py-8 sm:py-12">
        <Breadcrumb items={[{ label: 'Checkout' }]} />
        <SectionHeading eyebrow="Secure checkout" title="Almost yours" subtitle="AES-grade SSL callouts, Apple Pay-style summaries — demo form only." />
        {!items.length ? (
          <div className="mt-12">
            <EmptyState
              icon={ShoppingBag}
              title="Add something first"
              description="Your cart is empty. Fill it before checking out."
              action={<Button to="/products">Continue shopping</Button>}
            />
          </div>
        ) : (
          <form onSubmit={placeOrder} className="mt-12 grid gap-10 lg:grid-cols-[1fr,400px]">
            <motion.div layout className="space-y-8">
              <div className="rounded-3xl border border-white/50 bg-[var(--glass-light)] p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[var(--glass-dark)]">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-zinc-900 dark:text-white">
                  Shipping
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" value={form.fullName} onChange={onChange('fullName')} error={errors.fullName} />
                  <Input label="Email" type="email" value={form.email} onChange={onChange('email')} error={errors.email} />
                  <Input label="Phone" value={form.phone} onChange={onChange('phone')} error={errors.phone} />
                  <Input label="Postal code" value={form.zip} onChange={onChange('zip')} error={errors.zip} />
                  <div className="sm:col-span-2">
                    <Input label="Street address" value={form.address} onChange={onChange('address')} error={errors.address} />
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="City" value={form.city} onChange={onChange('city')} error={errors.city} />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/50 bg-[var(--glass-light)] p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[var(--glass-dark)]">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-zinc-900 dark:text-white">
                  Payment method
                </h2>
                <PaymentTiles value={payment} onChange={setPayment} />

                {payment === 'card' ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Input label="Name on card" value={form.cardName} onChange={onChange('cardName')} error={errors.cardName} />
                    </div>
                    <Input
                      label="Card number"
                      value={form.cardNumber}
                      onChange={onChange('cardNumber')}
                      error={errors.cardNumber}
                      placeholder="4242 4242 4242 4242"
                    />
                    <Input label="Expiry (MM/YY)" value={form.expiry} onChange={onChange('expiry')} error={errors.expiry} placeholder="07/29" />
                    <Input label="CVC" value={form.cvc} onChange={onChange('cvc')} error={errors.cvc} />
                  </div>
                ) : (
                  <p className="mt-4 rounded-2xl bg-zinc-100/80 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-300">
                    For demo storefronts only — alternate rails would deep-link to native wallets here.
                  </p>
                )}
              </div>
            </motion.div>

            <aside className="h-fit rounded-3xl border border-white/55 bg-[var(--glass-light)] p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)] lg:sticky lg:top-28">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-zinc-900 dark:text-white">
                Order summary
              </h2>
              <ul className="mt-4 divide-y divide-zinc-200/70 text-sm dark:divide-zinc-700">
                {items.slice(0, 4).map((line) => (
                  <li key={line.key} className="flex gap-3 py-3">
                    <div className="h-14 w-12 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      {line.product.images?.[0] ? (
                        <img src={line.product.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-zinc-900 dark:text-white">{line.product.title}</p>
                      <p className="text-xs text-zinc-500">Qty ×{line.quantity}</p>
                    </div>
                  </li>
                ))}
                {items.length > 4 ? (
                  <li className="py-3 text-xs font-semibold text-zinc-500">+ more in your bag preview</li>
                ) : null}
              </ul>
              <dl className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                {coupon ? (
                  <div className="flex justify-between text-emerald-600">
                    <dt>Coupon</dt>
                    <dd>−{formatPrice(discountAmount)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Shipping</dt>
                  <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Estimated tax</dt>
                  <dd>{formatPrice(tax)}</dd>
                </div>
              </dl>
              <div className="mt-6 flex justify-between border-t border-zinc-200 pt-4 text-lg font-bold text-brand-700 dark:border-zinc-700 dark:text-brand-300">
                <span>Due today</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button type="submit" className="mt-6 w-full">
                Place secure order
              </Button>
            </aside>
          </form>
        )}
      </Container>
    </PageWrapper>
  );
}
