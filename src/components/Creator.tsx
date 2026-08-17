import { productsByCreator } from '../data'
import { ProductCard } from './ProductCard'

export function Creator({ slug }: { slug: string }) {
  const works = productsByCreator(slug)
  const name = works[0]?.creator

  if (!name) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <h1 className="font-display text-5xl text-paper">Creator not found.</h1>
        <a href="#/" className="mt-6 inline-block text-sm text-accent hover:underline">
          Return to catalog
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Creator</p>
      <h1 className="mt-3 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] text-paper">
        {name}
      </h1>
      <p className="mt-5 text-white/45">
        {works.length} {works.length === 1 ? 'work' : 'works'} in the current hanging.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
