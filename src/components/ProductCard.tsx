import { formatPrice, formatSales, type Product } from '../data'
import { ProductCover } from './ProductCover'
import { Stars } from './Stars'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <a href={`#/product/${product.id}`} className="block">
        <ProductCover
          product={product}
          className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
      </a>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
            {product.category}
          </p>
          <a
            href={`#/product/${product.id}`}
            className="mt-1 block truncate text-[15px] text-paper transition-colors hover:text-accent"
          >
            {product.name}
          </a>
          <a
            href={`#/creator/${product.creatorSlug}`}
            className="mt-0.5 block text-sm text-white/45 hover:text-white"
          >
            {product.creator}
          </a>
          <div className="mt-2 flex items-center gap-3">
            <Stars value={product.rating} />
            <span className="text-[11px] text-white/35">{formatSales(product.sales)} sales</span>
          </div>
        </div>
        <p className="shrink-0 font-display text-xl text-paper">{formatPrice(product.price)}</p>
      </div>
    </article>
  )
}
