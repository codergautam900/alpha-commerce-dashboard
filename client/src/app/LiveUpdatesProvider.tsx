import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { productQueryKeys } from '../services/products'
import { LiveUpdatesContext } from './liveUpdatesContext'
import type { LiveUpdateEvent, LiveUpdateKind } from '../types/liveUpdates'
import type { Product, ProductListResponse } from '../types/product'

const MOCK_SOCKET_INTERVAL_MS = 18_000
const MAX_EVENTS = 6

type LiveUpdatesProviderProps = {
  children: ReactNode
}

export function LiveUpdatesProvider({ children }: LiveUpdatesProviderProps) {
  const queryClient = useQueryClient()
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected'>(
    'connecting',
  )
  const [lastEventAt, setLastEventAt] = useState(0)
  const [recentEvents, setRecentEvents] = useState<LiveUpdateEvent[]>([])

  useEffect(() => {
    const connectTimeout = window.setTimeout(() => {
      setConnectionStatus('connected')
    }, 900)

    return () => {
      window.clearTimeout(connectTimeout)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const catalog = queryClient.getQueryData<ProductListResponse>(
        productQueryKeys.catalog,
      )

      if (!catalog || catalog.products.length === 0) {
        return
      }

      const randomIndex = Math.floor(Math.random() * catalog.products.length)
      const currentProduct = catalog.products[randomIndex]
      const { event, nextProduct } = buildMockEvent(currentProduct)
      const nextProducts = catalog.products.map((product) =>
        product.id === nextProduct.id ? nextProduct : product,
      )

      queryClient.setQueryData(productQueryKeys.catalog, {
        ...catalog,
        products: nextProducts,
      })
      queryClient.setQueryData(productQueryKeys.detail(nextProduct.id), nextProduct)
      queryClient.setQueryData(
        productQueryKeys.detail(String(nextProduct.id)),
        nextProduct,
      )

      setLastEventAt(event.occurredAt)
      setRecentEvents((currentEvents) => [event, ...currentEvents].slice(0, MAX_EVENTS))
    }, MOCK_SOCKET_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [queryClient])

  const value = useMemo(
    () => ({
      connectionStatus,
      lastEventAt,
      recentEvents,
    }),
    [connectionStatus, lastEventAt, recentEvents],
  )

  return (
    <LiveUpdatesContext.Provider value={value}>
      {children}
    </LiveUpdatesContext.Provider>
  )
}

function buildMockEvent(product: Product) {
  const updateKinds: LiveUpdateKind[] = ['stock', 'rating', 'price']
  const selectedKind =
    updateKinds[Math.floor(Math.random() * updateKinds.length)] ?? 'stock'
  const occurredAt = Date.now()

  if (selectedKind === 'stock') {
    const stockChange = Math.floor(Math.random() * 11) - 4
    const nextStock = Math.max(0, product.stock + stockChange)
    const nextProduct = {
      ...product,
      availabilityStatus:
        nextStock === 0 ? 'Out of Stock' : nextStock <= 10 ? 'Low Stock' : 'In Stock',
      stock: nextStock,
    }

    return {
      event: {
        id: `${occurredAt}-${product.id}-stock`,
        kind: selectedKind,
        message: `${product.title} stock shifted to ${nextStock} units.`,
        occurredAt,
        productId: product.id,
        productTitle: product.title,
      },
      nextProduct,
    }
  }

  if (selectedKind === 'rating') {
    const ratingChange = (Math.random() * 0.4 - 0.15).toFixed(2)
    const nextRating = clampNumber(product.rating + Number(ratingChange), 1, 5)
    const nextProduct = {
      ...product,
      rating: Number(nextRating.toFixed(2)),
    }

    return {
      event: {
        id: `${occurredAt}-${product.id}-rating`,
        kind: selectedKind,
        message: `${product.title} rating adjusted to ${nextProduct.rating.toFixed(2)}.`,
        occurredAt,
        productId: product.id,
        productTitle: product.title,
      },
      nextProduct,
    }
  }

  const multiplier = 1 + (Math.random() * 0.08 - 0.03)
  const nextPrice = Number(Math.max(1, product.price * multiplier).toFixed(2))
  const nextProduct = {
    ...product,
    price: nextPrice,
  }

  return {
    event: {
      id: `${occurredAt}-${product.id}-price`,
      kind: selectedKind,
      message: `${product.title} price moved to $${nextPrice.toFixed(2)}.`,
      occurredAt,
      productId: product.id,
      productTitle: product.title,
    },
    nextProduct,
  }
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
