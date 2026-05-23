import { createContext } from 'react'
import type { CartItem, CartSummary } from '../types/cart'
import type { Product } from '../types/product'

export type CartContextValue = {
  addToCart: (product: Product, quantity?: number) => void
  buyNow: (product: Product, quantity?: number) => void
  cartItems: CartItem[]
  cartSummary: CartSummary
  clearCart: () => void
  closeCart: () => void
  getQuantityForProduct: (productId: number) => number
  isCartOpen: boolean
  openCart: () => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
}

export const CartContext = createContext<CartContextValue | null>(null)
