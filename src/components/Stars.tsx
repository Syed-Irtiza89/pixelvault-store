import { Star } from 'lucide-react'

export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  const filled = Math.round(value)

  return (
    <span
      className="inline-flex items-center gap-1 text-accent"
      aria-label={`${value.toFixed(1)} out of 5`}
    >
      <span className="inline-flex gap-px">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={size}
            strokeWidth={1.5}
            className={index < filled ? 'text-accent' : 'text-white/20'}
            fill={index < filled ? 'currentColor' : 'none'}
          />
        ))}
      </span>
      <span className="text-[11px] tracking-wide text-white/55">{value.toFixed(1)}</span>
    </span>
  )
}
