import {
  CATEGORIES,
  type Category,
  type PriceBand,
  type SortKey,
} from '../data'

const PRICE_OPTIONS: { value: PriceBand; label: string }[] = [
  { value: 'any', label: 'Any price' },
  { value: 'under20', label: 'Under $20' },
  { value: '20to50', label: '$20–50' },
  { value: '50to100', label: '$50–100' },
  { value: 'over100', label: '$100+' },
]

const RATING_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: 'Any rating' },
  { value: 3, label: '3.0+' },
  { value: 4, label: '4.0+' },
  { value: 4.5, label: '4.5+' },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price · low' },
  { value: 'price-desc', label: 'Price · high' },
]

export function Filters({
  category,
  priceBand,
  minRating,
  sort,
  onCategory,
  onPriceBand,
  onMinRating,
  onSort,
}: {
  category: Category | 'all'
  priceBand: PriceBand
  minRating: number
  sort: SortKey
  onCategory: (value: Category | 'all') => void
  onPriceBand: (value: PriceBand) => void
  onMinRating: (value: number) => void
  onSort: (value: SortKey) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <FilterChip active={category === 'all'} onClick={() => onCategory('all')}>
          All
        </FilterChip>
        {CATEGORIES.map((item) => (
          <FilterChip
            key={item}
            active={category === item}
            onClick={() => onCategory(item)}
          >
            {item}
          </FilterChip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          label="Price"
          value={priceBand}
          onChange={(value) => onPriceBand(value as PriceBand)}
          options={PRICE_OPTIONS}
        />
        <Select
          label="Rating"
          value={String(minRating)}
          onChange={(value) => onMinRating(Number(value))}
          options={RATING_OPTIONS.map((item) => ({
            value: String(item.value),
            label: item.label,
          }))}
        />
        <Select
          label="Sort"
          value={sort}
          onChange={(value) => onSort(value as SortKey)}
          options={SORT_OPTIONS}
        />
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-[12px] tracking-[0.12em] uppercase transition-colors ${
        active
          ? 'border-accent bg-accent text-white'
          : 'border-white/15 text-white/60 hover:border-white/40 hover:text-paper'
      }`}
    >
      {children}
    </button>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-full border border-white/15 bg-ink px-3 py-1.5 text-[12px] tracking-normal text-paper normal-case outline-none focus:border-accent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
