import type { Product } from '../data'

export function ProductCover({
  product,
  className = '',
}: {
  product: Product
  className?: string
}) {
  const { from, via, to, motif } = product.cover

  return (
    <div
      className={`relative overflow-hidden bg-ink ${className}`}
      style={{
        backgroundImage: `linear-gradient(145deg, ${from} 0%, ${via} 48%, ${to} 100%)`,
      }}
    >
      {motif === 'mesh' && (
        <>
          <div
            className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full blur-3xl opacity-70"
            style={{ background: from }}
          />
          <div
            className="absolute -bottom-[25%] -right-[15%] h-[75%] w-[75%] rounded-full blur-3xl opacity-60"
            style={{ background: via }}
          />
          <div
            className="absolute top-[30%] left-[20%] h-[40%] w-[40%] rounded-full blur-2xl opacity-40"
            style={{ background: to }}
          />
        </>
      )}

      {motif === 'grid' && <div className="cover-grid absolute inset-0" />}

      {motif === 'orbs' && (
        <>
          <div
            className="absolute top-[12%] left-[14%] h-[42%] w-[42%] rounded-full opacity-80"
            style={{ background: from, boxShadow: `0 0 60px ${via}` }}
          />
          <div
            className="absolute bottom-[10%] right-[12%] h-[34%] w-[34%] rounded-full opacity-70"
            style={{ background: to }}
          />
          <div
            className="absolute top-[40%] right-[28%] h-[18%] w-[18%] rounded-full opacity-90"
            style={{ background: via }}
          />
        </>
      )}

      {motif === 'stripes' && <div className="cover-stripes absolute inset-0" />}

      {motif === 'diagonal' && <div className="cover-diagonal absolute inset-0" />}

      {motif === 'rings' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-[120%] w-[120%] rounded-full border border-white/20"
            style={{ boxShadow: `inset 0 0 0 28px ${via}33, inset 0 0 0 56px ${from}22` }}
          />
        </div>
      )}

      {motif === 'split' && (
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{ background: to }}
        />
      )}

      {motif === 'horizon' && (
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: `linear-gradient(to top, ${to}, transparent)`,
          }}
        />
      )}

      <div className="grain absolute inset-0" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5" />

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <p className="font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-none tracking-tight text-white">
          {product.name}
        </p>
      </div>
    </div>
  )
}
