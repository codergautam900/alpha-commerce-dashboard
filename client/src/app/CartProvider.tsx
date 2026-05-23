import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllProducts, productQueryKeys } from '../services/products'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'
import {
  calculateCartSummary,
  clampCartQuantity,
  reconcileCartItems,
  sanitizeCartItems,
} from '../utils/cart'
import { CartContext } from './cartContext'

const STORAGE_KEY = 'alpha-dashboard:cart'

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [storedCartItems, setStoredCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return []
    }

    try {
      return sanitizeCartItems(JSON.parse(storedValue) as CartItem[])
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const catalogQuery = useQuery({
    queryKey: productQueryKeys.catalog,
    queryFn: fetchAllProducts,
    enabled: storedCartItems.length > 0,
    staleTime: 60_000,
  })
  const catalogProducts = useMemo(
    () => catalogQuery.data?.products ?? [],
    [catalogQuery.data?.products],
  )
  // We persist the cart as a local snapshot, then reconcile it against the
  // latest catalog data before rendering totals or applying quantity changes.
  const cartItems = useMemo(
    () =>
      catalogProducts.length > 0
        ? reconcileCartItems(storedCartItems, catalogProducts)
        : storedCartItems,
    [catalogProducts, storedCartItems],
  )
  const syncCartItems = useCallback(
    (cartItemsToSync: CartItem[]) => reconcileCartItems(cartItemsToSync, catalogProducts),
    [catalogProducts],
  )
  const resolveCatalogProduct = useCallback(
    (product: Product) =>
      catalogProducts.find((catalogProduct) => catalogProduct.id === product.id) ??
      product,
    [catalogProducts],
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const cartSummary = useMemo(() => calculateCartSummary(cartItems), [cartItems])

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setStoredCartItems((currentItems) => {
      const syncedItems = syncCartItems(currentItems)
      const nextProduct = resolveCatalogProduct(product)
      const nextQuantity = clampCartQuantity(nextProduct, quantity)

      if (nextQuantity === 0) {
        return syncedItems
      }

      const existingItem = syncedItems.find((cartItem) => cartItem.product.id === product.id)

      if (!existingItem) {
        return [
          ...syncedItems,
          {
            product: nextProduct,
            quantity: nextQuantity,
          },
        ]
      }

      return syncedItems.map((cartItem) =>
        cartItem.product.id === product.id
          ? {
              ...cartItem,
              product: nextProduct,
              quantity: clampCartQuantity(nextProduct, cartItem.quantity + quantity),
            }
          : cartItem,
      )
    })
  }, [resolveCatalogProduct, syncCartItems])

  const buyNow = useCallback((product: Product, quantity = 1) => {
    addToCart(product, quantity)
    setIsCartOpen(true)
  }, [addToCart])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setStoredCartItems((currentItems) =>
      syncCartItems(currentItems).map((cartItem) =>
        cartItem.product.id === productId
          ? {
              ...cartItem,
              quantity: clampCartQuantity(cartItem.product, quantity),
            }
          : cartItem,
      ),
    )
  }, [syncCartItems])

  const removeFromCart = useCallback((productId: number) => {
    setStoredCartItems((currentItems) =>
      syncCartItems(currentItems).filter(
        (cartItem) => cartItem.product.id !== productId,
      ),
    )
  }, [syncCartItems])

  const clearCart = useCallback(() => {
    setStoredCartItems([])
  }, [])

  const getQuantityForProduct = useCallback(
    (productId: number) =>
      cartItems.find((cartItem) => cartItem.product.id === productId)?.quantity ?? 0,
    [cartItems],
  )

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const value = useMemo(
    () => ({
      addToCart,
      buyNow,
      cartItems,
      cartSummary,
      clearCart,
      closeCart,
      getQuantityForProduct,
      isCartOpen,
      openCart,
      removeFromCart,
      updateQuantity,
    }),
    [
      addToCart,
      buyNow,
      cartItems,
      cartSummary,
      clearCart,
      closeCart,
      getQuantityForProduct,
      isCartOpen,
      openCart,
      removeFromCart,
      updateQuantity,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
