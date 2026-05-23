import type { Product } from './product'

export type CartItem = {
  product: Product
  quantity: number
}

export type CartSummary = {
  discountedSubtotal: number
  discountTotal: number
  grandTotal: number
  shipping: number
  subtotal: number
  tax: number
  totalUnits: number
  uniqueItems: number
}
