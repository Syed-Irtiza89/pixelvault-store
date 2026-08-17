import { Download } from 'lucide-react'
import { downloadAsset } from '../cart'
import { getProduct } from '../data'
import { ProductCover } from './ProductCover'
import { useStore } from './StoreProvider'

export function Library() {
  const { library } = useStore()

  if (library.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <h1 className="font-display text-6xl text-paper">Library empty.</h1>
        <p className="mt-4 max-w-md text-white/45">
          Purchases land here. Checkout is simulated — complete an order to generate
          a license file.
        </p>
        <a
          href="#/"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm text-ink"
        >
          Visit the archive
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Owned</p>
      <h1 className="mt-2 font-display text-5xl text-paper">Library</h1>
      <p className="mt-3 text-sm text-white/40">
        Download generates a small license text file in your browser.
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {library.map((entry) => {
          const product = getProduct(entry.productId)
          if (!product) return null
          return (
            <li key={entry.productId}>
              <a href={`#/product/${product.id}`} className="block">
                <ProductCover product={product} className="aspect-[4/5]" />
              </a>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-paper">{product.name}</p>
                  <p className="mt-1 text-xs text-white/35">Order {entry.orderId}</p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadAsset(product, entry.orderId)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[12px] text-ink hover:bg-accent hover:text-white"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
