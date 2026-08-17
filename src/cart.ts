import { fileSlug, getProduct, type Product } from './data'

export const TAX_RATE = 0.08
export const CART_KEY = 'pixelvault.cart'
export const LIBRARY_KEY = 'pixelvault.library'

export type CartLine = {
  productId: string
  qty: number
}

export type LibraryEntry = {
  productId: string
  orderId: string
  purchasedAt: string
}

export type Totals = {
  subtotal: number
  tax: number
  total: number
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return parsed as T
  } catch {
    return fallback
  }
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false
  const record = value as { productId?: unknown; qty?: unknown }
  return typeof record.productId === 'string' && typeof record.qty === 'number'
}

function isLibraryEntry(value: unknown): value is LibraryEntry {
  if (typeof value !== 'object' || value === null) return false
  const record = value as {
    productId?: unknown
    orderId?: unknown
    purchasedAt?: unknown
  }
  return (
    typeof record.productId === 'string' &&
    typeof record.orderId === 'string' &&
    typeof record.purchasedAt === 'string'
  )
}

export function loadCart(): CartLine[] {
  const parsed = readJson<unknown>(CART_KEY, [])
  if (!Array.isArray(parsed)) return []
  return parsed.filter(isCartLine).filter((line) => line.qty > 0)
}

export function saveCart(lines: CartLine[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(lines))
}

export function loadLibrary(): LibraryEntry[] {
  const parsed = readJson<unknown>(LIBRARY_KEY, [])
  if (!Array.isArray(parsed)) return []
  return parsed.filter(isLibraryEntry)
}

export function saveLibrary(entries: LibraryEntry[]): void {
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(entries))
}

export function cartTotals(lines: CartLine[]): Totals {
  const subtotal = lines.reduce((sum, line) => {
    const product = getProduct(line.productId)
    if (!product) return sum
    return sum + product.price * line.qty
  }, 0)
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100
  return { subtotal, tax, total }
}

export function generateOrderId(): string {
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
  return `PV-${hex}`
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatCardNumber(value: string): string {
  return digitsOnly(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatExpiry(value: string): string {
  const digits = digitsOnly(value).slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function luhnValid(value: string): boolean {
  const digits = digitsOnly(value)
  if (digits.length !== 16) return false
  let sum = 0
  let doubleIt = false
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    const char = digits[i]
    if (char === undefined) return false
    let n = Number(char)
    if (doubleIt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    doubleIt = !doubleIt
  }
  return sum % 10 === 0
}

export function expiryValid(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(value.trim())
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  const lastDay = new Date(year, month, 0, 23, 59, 59, 999)
  return lastDay.getTime() >= Date.now()
}

export function cvcValid(value: string): boolean {
  return /^\d{3,4}$/.test(value)
}

export function emailValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function downloadAsset(product: Product, orderId: string): void {
  const body = [
    'PIXELVAULT — SIMULATED DELIVERY',
    '',
    `Asset:     ${product.name}`,
    `Creator:   ${product.creator}`,
    `Category:  ${product.category}`,
    `Order:     ${orderId}`,
    `Issued:    ${new Date().toISOString()}`,
    '',
    'LICENSE',
    'You may use this asset in personal and commercial work.',
    'You may not resell, relic, or redistribute the source files.',
    '',
    'This file is generated in-browser. No real payment was processed.',
  ].join('\n')

  const blob = new Blob([body], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileSlug(product.name)}-license.txt`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
