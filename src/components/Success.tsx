import { ArrowRight } from 'lucide-react'

export function Success({ orderId }: { orderId: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Order confirmed</p>
      <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] text-paper">
        The vault is yours.
      </h1>
      <p className="mt-6 max-w-lg text-white/50">
        Simulated authorization succeeded. Nothing was charged. Your license files
        are waiting in the library.
      </p>
      <p className="mt-8 font-display text-3xl tracking-wide text-accent">{orderId}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#/library"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm text-white hover:bg-accent-dim"
        >
          Open library <ArrowRight size={16} />
        </a>
        <a
          href="#/"
          className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm text-paper hover:border-white/40"
        >
          Continue browsing
        </a>
      </div>
    </div>
  )
}
