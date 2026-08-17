import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  cartTotals,
  loadCart,
  loadLibrary,
  saveCart,
  saveLibrary,
  type CartLine,
  type LibraryEntry,
  type Totals,
} from '../cart'

type StoreValue = {
  lines: CartLine[]
  library: LibraryEntry[]
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  completeOrder: (orderId: string) => void
  owned: (productId: string) => boolean
  count: number
  totals: Totals
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadCart())
  const [library, setLibrary] = useState<LibraryEntry[]>(() => loadLibrary())

  useEffect(() => {
    saveCart(lines)
  }, [lines])

  useEffect(() => {
    saveLibrary(library)
  }, [library])

  const add = useCallback((productId: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.productId === productId)
      if (!existing) return [...prev, { productId, qty }]
      return prev.map((line) =>
        line.productId === productId ? { ...line, qty: line.qty + qty } : line,
      )
    })
  }, [])

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) => {
      if (qty < 1) return prev.filter((line) => line.productId !== productId)
      return prev.map((line) =>
        line.productId === productId ? { ...line, qty } : line,
      )
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((line) => line.productId !== productId))
  }, [])

  const completeOrder = useCallback(
    (orderId: string) => {
      const purchasedAt = new Date().toISOString()
      setLibrary((prev) => {
        const next = [...prev]
        for (const line of lines) {
          if (!next.some((entry) => entry.productId === line.productId)) {
            next.push({ productId: line.productId, orderId, purchasedAt })
          }
        }
        return next
      })
      setLines([])
    },
    [lines],
  )

  const owned = useCallback(
    (productId: string) => library.some((entry) => entry.productId === productId),
    [library],
  )

  const value = useMemo<StoreValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0)
    return {
      lines,
      library,
      add,
      setQty,
      remove,
      completeOrder,
      owned,
      count,
      totals: cartTotals(lines),
    }
  }, [add, completeOrder, library, lines, owned, remove, setQty])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
