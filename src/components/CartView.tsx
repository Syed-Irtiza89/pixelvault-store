import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatMoney, formatPrice, getProduct } from '../data'
import { TAX_RATE } from '../cart'
import { ProductCover } from './ProductCover'
import { useStore } from './StoreProvider'

export function CartView() {
  const { lines, setQty, remove, totals, count } = useStore()

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <h1 className="font-display text-6xl text-paper">Your bag is empty.</h1>
        <p className="mt-4 text-white/45">The archive is still hanging.</p>
        <a
          href="#/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm text-white"
        >
          Browse works
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1fr_320px] lg:px-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Bag</p>
        <h1 className="mt-2 font-display text-5xl text-paper">
          {count} {count === 1 ? 'work' : 'works'}
        </h1>

        <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {lines.map((line) => {
            const product = getProduct(line.productId)
            if (!product) return null
            return (
              <li key={line.productId} className="flex gap-5 py-6">
                <a href={`#/product/${product.id}`} className="w-28 shrink-0 sm:w-36">
                  <ProductCover product={product} className="aspect-[4/5]" />
                </a>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <a
                        href={`#/product/${product.id}`}
                        className="text-lg text-paper hover:text-accent"
                      >
                        {product.name}
                      </a>
                      <p className="mt-1 text-sm text-white/40">{product.creator}</p>
                    </div>
                    <p className="font-display text-xl">
                      {formatPrice(product.price * line.qty)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center rounded-full border border-white/15">
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center text-white/70 hover:text-paper"
                        onClick={() => setQty(product.id, line.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{line.qty}</span>
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center text-white/70 hover:text-paper"
                        onClick={() => setQty(product.id, line.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.14em] text-white/35 hover:text-paper"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-2xl border border-white/10 p-6 lg:sticky lg:top-24">
        <h2 className="text-[11px] uppercase tracking-[0.22em] text-white/40">Summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between text-white/60">
            <dt>Subtotal</dt>
            <dd>{formatMoney(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-white/60">
            <dt>Tax ({Math.round(TAX_RATE * 100)}%)</dt>
            <dd>{formatMoney(totals.tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3 font-display text-2xl text-paper">
            <dt>Total</dt>
            <dd>{formatMoney(totals.total)}</dd>
          </div>
        </dl>
        <a
          href="#/checkout"
          className="mt-6 block rounded-full bg-accent py-3 text-center text-sm text-white hover:bg-accent-dim"
        >
          Checkout
        </a>
        <p className="mt-3 text-center text-[11px] text-white/30">
          Simulated payment · nothing is charged
        </p>
      </aside>
    </div>
  )
}
