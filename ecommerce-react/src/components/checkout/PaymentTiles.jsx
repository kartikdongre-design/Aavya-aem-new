/**
 * Opinionated wallet + card selectors for checkout flows (demo UX only).
 */
export default function PaymentTiles({ value, onChange }) {
  const methods = ['card', 'apple', 'paypal'];

  const label = (m) =>
    ({
      apple: 'Apple Pay',
      paypal: 'PayPal',
      card: 'Credit card',
    })[m] || m;

  return (
    <div className="mt-4 space-y-3">
      {methods.map((method) => (
        <label
          key={method}
          className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold capitalize transition ${value === method ? 'border-brand-600 bg-brand-500/10' : 'border-zinc-200 bg-white/50 dark:border-zinc-600 dark:bg-zinc-900/40'}`}
        >
          <span>{label(method)}</span>
          <input
            type="radio"
            name="checkout-pay"
            className="h-4 w-4 accent-brand-600"
            checked={value === method}
            onChange={() => onChange(method)}
          />
        </label>
      ))}
    </div>
  );
}
