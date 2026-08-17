import { Search, ShoppingBag, Library } from 'lucide-react'
import type { FormEvent } from 'react'
import { useStore } from './StoreProvider'

export function Header({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
}) {
  const { count } = useStore()

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.hash = '#/'
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 md:gap-8 md:px-8">
        <a href="#/" className="shrink-0 leading-none">
          <span className="block font-display text-[1.65rem] tracking-tight text-paper">
            PixelVault
          </span>
          <span className="mt-0.5 block text-[9px] uppercase tracking-[0.28em] text-white/40">
            Digital archive
          </span>
        </a>

        <form onSubmit={onSearch} className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/35"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search kits, type, sound…"
            className="w-full rounded-full border border-white/12 bg-white/5 py-2.5 pr-4 pl-10 text-sm text-paper outline-none placeholder:text-white/30 focus:border-accent"
            aria-label="Search catalog"
          />
        </form>

        <nav className="flex items-center gap-1 md:gap-2">
          <a
            href="#/library"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:text-paper"
          >
            <Library size={18} strokeWidth={1.6} />
            <span className="hidden sm:inline">Library</span>
          </a>
          <a
            href="#/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-ink transition-colors hover:bg-accent hover:text-white"
          >
            <ShoppingBag size={16} strokeWidth={1.8} />
            <span className="hidden sm:inline">Bag</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-medium text-white">
                {count}
              </span>
            )}
          </a>
        </nav>
      </div>
    </header>
  )
}
