export const CATEGORIES = [
  'UI Kits',
  '3D Models',
  'Fonts',
  'Photo Packs',
  'Brushes',
  'Sound Kits',
] as const

export type Category = (typeof CATEGORIES)[number]

export const COVER_MOTIFS = [
  'mesh',
  'grid',
  'orbs',
  'stripes',
  'diagonal',
  'rings',
  'split',
  'horizon',
] as const

export type CoverMotif = (typeof COVER_MOTIFS)[number]

export type Cover = {
  from: string
  via: string
  to: string
  motif: CoverMotif
}

export type Product = {
  id: string
  name: string
  creator: string
  creatorSlug: string
  price: number
  category: Category
  tags: string[]
  rating: number
  sales: number
  description: string
  released: string
  cover: Cover
}

export type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'newest'

export type PriceBand = 'any' | 'under20' | '20to50' | '50to100' | 'over100'

export type Route =
  | { name: 'catalog' }
  | { name: 'product'; id: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'success'; orderId: string }
  | { name: 'library' }
  | { name: 'creator'; slug: string }

export const products: Product[] = [
  {
    id: 'aurora-interface',
    name: 'Aurora Interface',
    creator: 'Mira Chen',
    creatorSlug: 'mira-chen',
    price: 79,
    category: 'UI Kits',
    tags: ['figma', 'dashboard', 'dark', 'components'],
    rating: 4.9,
    sales: 12840,
    released: '2026-03-12',
    description:
      'A nocturnal design system for product teams who want cinema, not chrome. Two hundred sixteen frames, auto-layout everywhere, and a violet signal color that never shouts.',
    cover: {
      from: '#1a1038',
      via: '#7c5cff',
      to: '#0a0a0a',
      motif: 'mesh',
    },
  },
  {
    id: 'nocturne-os',
    name: 'Nocturne OS Kit',
    creator: 'Atlas Studio',
    creatorSlug: 'atlas-studio',
    price: 129,
    category: 'UI Kits',
    tags: ['mobile', 'os', 'widgets', 'prototype'],
    rating: 4.8,
    sales: 6420,
    released: '2026-06-02',
    description:
      'A full mobile operating-system fiction: lock screens, control center, settings, and 48 app shells. Built for concept films and high-fidelity prototypes.',
    cover: {
      from: '#111111',
      via: '#3a3a3a',
      to: '#7c5cff',
      motif: 'grid',
    },
  },
  {
    id: 'glass-grid',
    name: 'Glass & Grid',
    creator: 'Kade Okonkwo',
    creatorSlug: 'kade-okonkwo',
    price: 96,
    category: 'UI Kits',
    tags: ['glassmorphism', 'saas', 'light', 'web'],
    rating: 4.7,
    sales: 8910,
    released: '2025-11-18',
    description:
      'Frosted panels, hairline grids, and a type ramp that feels typeset rather than themed. Ideal for fintech, galleries, and anything that needs to look expensive.',
    cover: {
      from: '#ece8ff',
      via: '#7c5cff',
      to: '#1a1a1a',
      motif: 'split',
    },
  },
  {
    id: 'marble-relics',
    name: 'Marble Relics',
    creator: 'Vera Solis',
    creatorSlug: 'vera-solis',
    price: 64,
    category: '3D Models',
    tags: ['sculpture', 'blender', 'cinema4d', 'neutral'],
    rating: 4.9,
    sales: 4102,
    released: '2026-01-09',
    description:
      'Twelve classical fragments — busts, columns, broken pediments — scanned from studio clay and retopologized for stills. Includes 4K displacement and calibrated marble shaders.',
    cover: {
      from: '#d9cfc3',
      via: '#8a7a6b',
      to: '#2b2622',
      motif: 'orbs',
    },
  },
  {
    id: 'chrome-primitives',
    name: 'Chrome Primitives',
    creator: 'Atlas Studio',
    creatorSlug: 'atlas-studio',
    price: 48,
    category: '3D Models',
    tags: ['abstract', 'metal', 'hdr', 'logo'],
    rating: 4.6,
    sales: 7330,
    released: '2025-09-22',
    description:
      'A kit of liquid-metal platonic solids and boolean accidents. Drop them behind a wordmark and the brand meeting is over.',
    cover: {
      from: '#9aa3ad',
      via: '#f4f6f8',
      to: '#2c3138',
      motif: 'rings',
    },
  },
  {
    id: 'clay-garden',
    name: 'Soft Clay Garden',
    creator: 'Nova Field',
    creatorSlug: 'nova-field',
    price: 36,
    category: '3D Models',
    tags: ['organic', 'toy', 'octane', 'color'],
    rating: 4.8,
    sales: 5120,
    released: '2026-04-28',
    description:
      'Squishy botanicals and pebble fauna with subsurface scattering already dialed. Eighteen assets, each with a low and high subdivision archive.',
    cover: {
      from: '#f2c6b6',
      via: '#7c5cff',
      to: '#1d1420',
      motif: 'orbs',
    },
  },
  {
    id: 'editorial-grotesk',
    name: 'Editorial Grotesk',
    creator: 'Lumen Type',
    creatorSlug: 'lumen-type',
    price: 89,
    category: 'Fonts',
    tags: ['sans', 'variable', 'magazine', 'latin'],
    rating: 5,
    sales: 15400,
    released: '2025-08-04',
    description:
      'A variable grotesque with the posture of a 1970s arts quarterly. Nine axes of attitude, from whisper captions to billboard black. Includes tabular figures and a full case of arrows.',
    cover: {
      from: '#0a0a0a',
      via: '#222222',
      to: '#7c5cff',
      motif: 'split',
    },
  },
  {
    id: 'display-didone',
    name: 'Display Didone',
    creator: 'Lumen Type',
    creatorSlug: 'lumen-type',
    price: 72,
    category: 'Fonts',
    tags: ['serif', 'fashion', 'high-contrast', 'display'],
    rating: 4.7,
    sales: 9804,
    released: '2026-02-14',
    description:
      'Hairline serifs that only work if you mean them. Cut for covers, lookbooks, and anything hung at 160 points. Optical sizes for 12pt and 72pt included.',
    cover: {
      from: '#f6f1e8',
      via: '#c4b7a4',
      to: '#1a120c',
      motif: 'horizon',
    },
  },
  {
    id: 'signal-mono',
    name: 'Signal Mono',
    creator: 'Kade Okonkwo',
    creatorSlug: 'kade-okonkwo',
    price: 42,
    category: 'Fonts',
    tags: ['mono', 'code', 'technical', 'ui'],
    rating: 4.5,
    sales: 11200,
    released: '2025-12-01',
    description:
      'A technical mono with humanist terminals — readable in diffs, elegant on packaging. Five weights, true italics, and boxed glyphs for diagrams.',
    cover: {
      from: '#101820',
      via: '#7c5cff',
      to: '#05080c',
      motif: 'grid',
    },
  },
  {
    id: 'night-cities',
    name: 'Night Cities',
    creator: 'Drift & Grain',
    creatorSlug: 'drift-grain',
    price: 54,
    category: 'Photo Packs',
    tags: ['urban', 'night', '35mm', 'color'],
    rating: 4.8,
    sales: 6700,
    released: '2026-05-19',
    description:
      'Eighty frames of wet asphalt, sodium vapor, and glass towers after midnight. Shot on 35mm, drum-scanned, and graded to hold both neon and shadow.',
    cover: {
      from: '#0b1020',
      via: '#5b2cff',
      to: '#ff5a36',
      motif: 'horizon',
    },
  },
  {
    id: 'tungsten-portraits',
    name: 'Tungsten Portraits',
    creator: 'Drift & Grain',
    creatorSlug: 'drift-grain',
    price: 61,
    category: 'Photo Packs',
    tags: ['people', 'studio', 'film', 'editorial'],
    rating: 4.9,
    sales: 3890,
    released: '2026-07-08',
    description:
      'A closed set of 40 editorial portraits under tungsten and bounce. Skin that looks like skin. Negative space you can actually crop.',
    cover: {
      from: '#3a2418',
      via: '#c9894a',
      to: '#0e0b09',
      motif: 'mesh',
    },
  },
  {
    id: 'desert-light',
    name: 'Desert Light',
    creator: 'Vera Solis',
    creatorSlug: 'vera-solis',
    price: 39,
    category: 'Photo Packs',
    tags: ['landscape', 'minimal', 'noon', 'texture'],
    rating: 4.6,
    sales: 4410,
    released: '2025-10-30',
    description:
      'Hard noon in the high desert: dunes, salt, and architecture that forgot its architect. Sixty stills plus a contact sheet PDF.',
    cover: {
      from: '#e8d5a3',
      via: '#c45c26',
      to: '#1c1208',
      motif: 'diagonal',
    },
  },
  {
    id: 'ink-wash',
    name: 'Ink Wash Brushes',
    creator: 'Mira Chen',
    creatorSlug: 'mira-chen',
    price: 24,
    category: 'Brushes',
    tags: ['procreate', 'photoshop', 'ink', 'calligraphy'],
    rating: 4.8,
    sales: 18750,
    released: '2025-07-16',
    description:
      'Thirty-two pressure-sensitive washes sampled from real sumi and a worn nib. Works in Procreate and Photoshop. Includes paper grains as overlays.',
    cover: {
      from: '#f4f0ea',
      via: '#2a2a2a',
      to: '#7c5cff',
      motif: 'stripes',
    },
  },
  {
    id: 'grain-press',
    name: 'Grain Press',
    creator: 'Echo Labs',
    creatorSlug: 'echo-labs',
    price: 18,
    category: 'Brushes',
    tags: ['texture', 'print', 'halftone', 'grunge'],
    rating: 4.4,
    sales: 22100,
    released: '2026-01-25',
    description:
      'Halftone, letterpress bite, and xerox bloom — twenty brushes that make digital type look like it went through a shop. Tiny file, large attitude.',
    cover: {
      from: '#1a1a1a',
      via: '#4a4a4a',
      to: '#7c5cff',
      motif: 'stripes',
    },
  },
  {
    id: 'analog-drums',
    name: 'Analog Drum Vault',
    creator: 'Echo Labs',
    creatorSlug: 'echo-labs',
    price: 45,
    category: 'Sound Kits',
    tags: ['drums', 'wav', 'hardware', 'breakbeat'],
    rating: 4.7,
    sales: 8340,
    released: '2026-03-30',
    description:
      'Hit through a 1970s desk and a dying plate. One hundred twenty one-shots, fourteen breaks, and processed rooms. 24-bit / 48k, already named like you care.',
    cover: {
      from: '#1a0a14',
      via: '#7c5cff',
      to: '#e8ff47',
      motif: 'rings',
    },
  },
  {
    id: 'ambient-chambers',
    name: 'Ambient Chambers',
    creator: 'Nova Field',
    creatorSlug: 'nova-field',
    price: 38,
    category: 'Sound Kits',
    tags: ['drone', 'pads', 'film', 'seamless'],
    rating: 4.9,
    sales: 2760,
    released: '2026-07-21',
    description:
      'Seamless chambers recorded in empty galleries and a concrete cistern. Twenty-four pads, eight ir files, and a booklet on how not to overuse them.',
    cover: {
      from: '#061820',
      via: '#2a6b7c',
      to: '#7c5cff',
      motif: 'mesh',
    },
  },
]

export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, '').split('?')[0] ?? ''
  const segments = path.split('/').filter(Boolean)
  const a = segments[0]
  const b = segments[1]
  if (!a) return { name: 'catalog' }
  if (a === 'product' && b) return { name: 'product', id: decodeURIComponent(b) }
  if (a === 'cart') return { name: 'cart' }
  if (a === 'checkout') return { name: 'checkout' }
  if (a === 'order' && b) return { name: 'success', orderId: decodeURIComponent(b) }
  if (a === 'library') return { name: 'library' }
  if (a === 'creator' && b) return { name: 'creator', slug: decodeURIComponent(b) }
  return { name: 'catalog' }
}

export function getProduct(id: string): Product | undefined {
  return products.find((item) => item.id === id)
}

export function productsByCreator(slug: string): Product[] {
  return products.filter((item) => item.creatorSlug === slug)
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, limit)
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function formatSales(value: number): string {
  if (value >= 1000) {
    const shortened = value / 1000
    const label = shortened >= 10 ? shortened.toFixed(0) : shortened.toFixed(1)
    return `${label.replace(/\.0$/, '')}k`
  }
  return String(value)
}

export function inPriceBand(price: number, band: PriceBand): boolean {
  switch (band) {
    case 'any':
      return true
    case 'under20':
      return price < 20
    case '20to50':
      return price >= 20 && price <= 50
    case '50to100':
      return price > 50 && price <= 100
    case 'over100':
      return price > 100
  }
}

export function matchesQuery(product: Product, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return (
    product.name.toLowerCase().includes(needle) ||
    product.creator.toLowerCase().includes(needle) ||
    product.category.toLowerCase().includes(needle) ||
    product.tags.some((tag) => tag.toLowerCase().includes(needle)) ||
    product.description.toLowerCase().includes(needle)
  )
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const next = [...list]
  switch (sort) {
    case 'popular':
      return next.sort((a, b) => b.sales - a.sales)
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price)
    case 'newest':
      return next.sort(
        (a, b) => Date.parse(b.released) - Date.parse(a.released),
      )
  }
}

export function fileSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
