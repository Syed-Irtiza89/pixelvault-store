export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-3xl text-paper">PixelVault</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45">
            A simulated marketplace for digital craft. Checkout is a demonstration —
            no cards are charged, and no Stripe keys are used.
          </p>
        </div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">
          Archive · 2026
        </p>
      </div>
    </footer>
  )
}
