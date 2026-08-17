import { ArrowLeft, Check } from 'lucide-react'
import {
  formatPrice,
  formatSales,
  getProduct,
  relatedProducts,
} from '../data'
import { ProductCard } from './ProductCard'
import { ProductCover } from './ProductCover'
import { Stars } from './Stars'
import { useStore } from './StoreProvider'

export function ProductDetail({ id }: { id: string }) {
  const product = getProduct(id)
  const { add, owned } = useStore()

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="font-display text-5xl text-paper">Not in the archive.</p>
        <a href="#/" className="mt-6 inline-block text-sm text-accent hover:underline">
          Return to catalog
        </a>
      </div>
    )
  }

  const alreadyOwned = owned(product.id)
  const related = relatedProducts(product)

  return (
    <article>
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <a
          href="#/"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/45 hover:text-paper"
        >
          <ArrowLeft size={14} /> Catalog
        </a>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-2 md:gap-16 md:px-8">
        <ProductCover product={product} className="aspect-[4/5] md:sticky md:top-24" />

        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
            {product.category}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] tracking-tight text-paper">
            {product.name}
          </h1>
          <a
            href={`#/creator/${product.creatorSlug}`}
            className="mt-4 text-lg text-white/55 hover:text-accent"
          >
            {product.creator}
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Stars value={product.rating} size={15} />
            <span className="text-sm text-white/40">{formatSales(product.sales)} sales</span>
          </div>

          <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-white/65">
            {product.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/12 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/45"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-end gap-6">
            <p className="font-display text-5xl text-paper">{formatPrice(product.price)}</p>
            {alreadyOwned ? (
              <a
                href="#/library"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm text-ink"
              >
                <Check size={16} /> In your library
              </a>
            ) : (
              <button
                type="button"
                onClick={() => add(product.id)}
                className="rounded-full bg-accent px-7 py-3 text-sm text-white transition-colors hover:bg-accent-dim"
              >
                Add to bag
              </button>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl border-t border-white/10 px-5 py-16 md:px-8">
          <h2 className="font-display text-3xl text-paper">In the same room</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
