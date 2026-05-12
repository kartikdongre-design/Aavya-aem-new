import { useMemo } from 'react';

/**
 * Computes subtotal, discount, shipping (mock), tax, and total from cart lines.
 */
export function useCartTotals(items, coupon) {
  return useMemo(() => {
    const subtotal = items.reduce((acc, line) => {
      const unit = line.product.discountPrice ?? line.product.price;
      return acc + unit * line.quantity;
    }, 0);

    let discountAmount = 0;
    if (coupon?.percent) {
      discountAmount = (subtotal * coupon.percent) / 100;
    }

    const shipping = subtotal >= 120 || items.length === 0 ? 0 : 12.99;
    const taxRate = 0.08;
    const taxableBase = Math.max(0, subtotal - discountAmount + shipping);
    const tax = taxableBase * taxRate;

    const total = Math.max(0, subtotal - discountAmount + shipping + tax);

    return {
      subtotal,
      discountAmount,
      shipping,
      tax,
      total,
    };
  }, [items, coupon]);
}
