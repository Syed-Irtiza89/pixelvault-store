import { useMemo, useState } from 'react'
import {
  inPriceBand,
  matchesQuery,
  products,
  sortProducts,
  type Category,
  type PriceBand,
  type SortKey,
} from '../data'
import { Filters } from './Filters'
import { ProductCard } from './ProductCard'

export function Catalog({ query }: { query: string }) {
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [priceBand, setPriceBand] = useState<PriceBand>('any')
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState<SortKey>('popular')

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      if (category !== 'all' && product.category !== category) return false
      if (!inPriceBand(product.price, priceBand)) return false
      if (product.rating < minRating) return false
      return matchesQuery(product, query)
    })
    return sortProducts(filtered, sort)
  }, [category, minRating, priceBand, query, sort])

  const searching = query.trim().length > 0

  return (
    <div>
      {!searching && (
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#7c5cff33,transparent_55%)]" />
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">
              The archive
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.9] tracking-tight text-paper">
              Assets for
              <br />
              <em className="text-white/70">the obsessive.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
              UI kits, type, stills, models, and sound — curated like a gallery,
              priced like a studio. Sixteen works in the current hanging.
            </p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        {searching && (
          <h1 className="mb-8 font-display text-4xl text-paper md:text-5xl">
            Results for “{query.trim()}”
          </h1>
        )}

        <Filters
          category={category}
          priceBand={priceBand}
          minRating={minRating}
          sort={sort}
          onCategory={setCategory}
          onPriceBand={setPriceBand}
          onMinRating={setMinRating}
          onSort={setSort}
        />

        <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/35">
          {visible.length} {visible.length === 1 ? 'work' : 'works'}
        </p>

        {visible.length === 0 ? (
          <p className="mt-16 max-w-md font-display text-3xl text-white/40">
            Nothing in the vault matches those filters.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
