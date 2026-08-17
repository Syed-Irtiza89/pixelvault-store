import { useEffect, useState } from 'react'
import { Catalog } from './components/Catalog'
import { CartView } from './components/CartView'
import { Checkout } from './components/Checkout'
import { Creator } from './components/Creator'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Library } from './components/Library'
import { ProductDetail } from './components/ProductDetail'
import { StoreProvider } from './components/StoreProvider'
import { Success } from './components/Success'
import { parseRoute, type Route } from './data'

function View({ route, query }: { route: Route; query: string }) {
  switch (route.name) {
    case 'catalog':
      return <Catalog query={query} />
    case 'product':
      return <ProductDetail id={route.id} />
    case 'cart':
      return <CartView />
    case 'checkout':
      return <Checkout />
    case 'success':
      return <Success orderId={route.orderId} />
    case 'library':
      return <Library />
    case 'creator':
      return <Creator slug={route.slug} />
  }
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  return (
    <StoreProvider>
      <div className="min-h-dvh bg-ink text-paper">
        <Header query={query} onQueryChange={setQuery} />
        <main>
          <View route={route} query={query} />
        </main>
        <Footer />
      </div>
    </StoreProvider>
  )
}
