import { Lock } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import {
  cvcValid,
  emailValid,
  expiryValid,
  formatCardNumber,
  formatExpiry,
  generateOrderId,
  luhnValid,
  TAX_RATE,
} from '../cart'
import { formatMoney, formatPrice, getProduct } from '../data'
import { useStore } from './StoreProvider'

type FieldErrors = {
  name?: string
  email?: string
  card?: string
  expiry?: string
  cvc?: string
}

export function Checkout() {
  const { lines, totals, completeOrder } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [busy, setBusy] = useState(false)

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <h1 className="font-display text-5xl text-paper">Nothing to settle.</h1>
        <a href="#/" className="mt-6 inline-block text-sm text-accent hover:underline">
          Return to catalog
        </a>
      </div>
    )
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Name is required'
    if (!emailValid(email)) next.email = 'Enter a valid email'
    if (!luhnValid(card)) next.card = 'Enter a valid 16-digit card number'
    if (!expiryValid(expiry)) next.expiry = 'Enter a current MM/YY expiry'
    if (!cvcValid(cvc)) next.cvc = 'Enter a 3 or 4 digit CVC'
    return next
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setBusy(true)
    const orderId = generateOrderId()
    window.setTimeout(() => {
      completeOrder(orderId)
      window.location.hash = `#/order/${orderId}`
    }, 700)
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1fr_340px] lg:px-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
          Simulated checkout
        </p>
        <h1 className="mt-2 font-display text-5xl text-paper">Settle the bag.</h1>
        <p className="mt-3 max-w-lg text-sm text-white/45">
          No payment is processed. Use any Luhn-valid 16-digit number —{' '}
          <span className="text-white/70">4242 4242 4242 4242</span> works.
        </p>

        <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-5" noValidate>
          <Field
            label="Full name"
            error={errors.name}
            value={name}
            onChange={setName}
            autoComplete="name"
          />
          <Field
            label="Email"
            error={errors.email}
            value={email}
            onChange={setEmail}
            autoComplete="email"
            type="email"
          />
          <Field
            label="Card number"
            error={errors.card}
            value={card}
            onChange={(value) => setCard(formatCardNumber(value))}
            autoComplete="cc-number"
            inputMode="numeric"
            placeholder="•••• •••• •••• ••••"
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Expiry"
              error={errors.expiry}
              value={expiry}
              onChange={(value) => setExpiry(formatExpiry(value))}
              autoComplete="cc-exp"
              inputMode="numeric"
              placeholder="MM/YY"
            />
            <Field
              label="CVC"
              error={errors.cvc}
              value={cvc}
              onChange={(value) => setCvc(value.replace(/\D/g, '').slice(0, 4))}
              autoComplete="cc-csc"
              inputMode="numeric"
              placeholder="123"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm text-white hover:bg-accent-dim disabled:opacity-60"
          >
            <Lock size={14} />
            {busy ? 'Authorizing…' : `Place simulated order · ${formatMoney(totals.total)}`}
          </button>
        </form>
      </div>

      <aside className="h-fit rounded-2xl border border-white/10 p-6 lg:sticky lg:top-24">
        <h2 className="text-[11px] uppercase tracking-[0.22em] text-white/40">Order</h2>
        <ul className="mt-5 space-y-3">
          {lines.map((line) => {
            const product = getProduct(line.productId)
            if (!product) return null
            return (
              <li key={line.productId} className="flex justify-between gap-4 text-sm">
                <span className="text-white/70">
                  {product.name}
                  <span className="text-white/35"> × {line.qty}</span>
                </span>
                <span>{formatPrice(product.price * line.qty)}</span>
              </li>
            )
          })}
        </ul>
        <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between text-white/55">
            <dt>Subtotal</dt>
            <dd>{formatMoney(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-white/55">
            <dt>Tax ({Math.round(TAX_RATE * 100)}%)</dt>
            <dd>{formatMoney(totals.tax)}</dd>
          </div>
          <div className="flex justify-between font-display text-2xl text-paper">
            <dt>Total</dt>
            <dd>{formatMoney(totals.total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  )
}

function Field({
  label,
  error,
  value,
  onChange,
  autoComplete,
  type = 'text',
  inputMode,
  placeholder,
}: {
  label: string
  error?: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
  type?: string
  inputMode?: 'numeric' | 'email' | 'text'
  placeholder?: string
}) {
  const fieldId = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div>
      <label htmlFor={fieldId} className="text-[11px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-1.5 w-full rounded-xl border bg-white/5 px-4 py-3 text-paper outline-none placeholder:text-white/25 ${
          error ? 'border-red-400/70' : 'border-white/12 focus:border-accent'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  )
}
