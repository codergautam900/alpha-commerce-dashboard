import type { CartItem, CartSummary } from '../types/cart'
import type { Product } from '../types/product'

const FREE_SHIPPING_THRESHOLD = 400
const SHIPPING_FEE = 18
const TAX_RATE = 0.08

export function calculateCartSummary(cartItems: CartItem[]): CartSummary {
  const subtotal = roundCurrency(
    cartItems.reduce(
      (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
      0,
    ),
  )
  const discountTotal = roundCurrency(
    cartItems.reduce(
      (total, cartItem) =>
        total +
        cartItem.product.price *
          (cartItem.product.discountPercentage / 100) *
          cartItem.quantity,
      0,
    ),
  )
  const discountedSubtotal = roundCurrency(subtotal - discountTotal)
  const shipping =
    discountedSubtotal === 0
      ? 0
      : discountedSubtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FEE
  const tax = roundCurrency(discountedSubtotal * TAX_RATE)
  const grandTotal = roundCurrency(discountedSubtotal + shipping + tax)
  const totalUnits = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  )

  return {
    discountedSubtotal,
    discountTotal,
    grandTotal,
    shipping,
    subtotal,
    tax,
    totalUnits,
    uniqueItems: cartItems.length,
  }
}

export function getCartLineSummary(product: Product, quantity: number) {
  const subtotal = roundCurrency(product.price * quantity)
  const discountTotal = roundCurrency(
    product.price * (product.discountPercentage / 100) * quantity,
  )
  const discountedSubtotal = roundCurrency(subtotal - discountTotal)

  return {
    discountedSubtotal,
    discountTotal,
    subtotal,
  }
}

export function getMaxCartQuantity(product: Product) {
  return Math.max(0, Math.min(product.stock, 99))
}

export function clampCartQuantity(product: Product, quantity: number) {
  const maxQuantity = getMaxCartQuantity(product)

  if (maxQuantity === 0) {
    return 0
  }

  return Math.min(Math.max(1, quantity), maxQuantity)
}

export function roundCurrency(value: number) {
  return Math.round(value * 100) / 100
}

export function canPurchaseProduct(product: Product) {
  return getMaxCartQuantity(product) > 0
}

export function getDefaultPurchaseQuantity(product: Product) {
  const maxQuantity = getMaxCartQuantity(product)

  if (maxQuantity === 0) {
    return 0
  }

  return Math.min(Math.max(product.minimumOrderQuantity ?? 1, 1), maxQuantity)
}

export function normalizePurchaseQuantity(product: Product, quantity: number) {
  const minimumQuantity = getDefaultPurchaseQuantity(product)

  if (minimumQuantity === 0) {
    return 0
  }

  return Math.min(getMaxCartQuantity(product), Math.max(minimumQuantity, quantity))
}

export function sanitizeCartItems(cartItems: CartItem[]) {
  return cartItems
    .filter(
      (cartItem) =>
        typeof cartItem?.product?.id === 'number' &&
        typeof cartItem?.quantity === 'number' &&
        clampCartQuantity(cartItem.product, cartItem.quantity) > 0,
    )
    .map((cartItem) => ({
      ...cartItem,
      quantity: clampCartQuantity(cartItem.product, cartItem.quantity),
    }))
}

export function reconcileCartItems(cartItems: CartItem[], products: Product[]) {
  const sanitizedCartItems = sanitizeCartItems(cartItems)

  if (sanitizedCartItems.length === 0 || products.length === 0) {
    return sanitizedCartItems
  }

  const productsById = new Map(products.map((product) => [product.id, product]))
  let hasChanges = sanitizedCartItems.length !== cartItems.length

  const nextCartItems = sanitizedCartItems.reduce<CartItem[]>((items, cartItem) => {
    const latestProduct = productsById.get(cartItem.product.id) ?? cartItem.product
    const nextQuantity = clampCartQuantity(latestProduct, cartItem.quantity)

    if (nextQuantity === 0) {
      hasChanges = true
      return items
    }

    if (
      nextQuantity !== cartItem.quantity ||
      !hasMatchingCartSnapshot(cartItem.product, latestProduct)
    ) {
      hasChanges = true
    }

    items.push(
      hasChanges
        ? {
            product: latestProduct,
            quantity: nextQuantity,
          }
        : cartItem,
    )

    return items
  }, [])

  return hasChanges ? nextCartItems : cartItems
}

export function getShippingCopy(discountedSubtotal: number) {
  if (discountedSubtotal === 0) {
    return 'Add products to unlock shipping estimates.'
  }

  if (discountedSubtotal >= FREE_SHIPPING_THRESHOLD) {
    return 'Free shipping unlocked for this order.'
  }

  return `Spend $${(FREE_SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2)} more for free shipping.`
}

function hasMatchingCartSnapshot(firstProduct: Product, secondProduct: Product) {
  return (
    firstProduct.id === secondProduct.id &&
    firstProduct.title === secondProduct.title &&
    firstProduct.category === secondProduct.category &&
    firstProduct.price === secondProduct.price &&
    firstProduct.discountPercentage === secondProduct.discountPercentage &&
    firstProduct.stock === secondProduct.stock &&
    firstProduct.availabilityStatus === secondProduct.availabilityStatus &&
    firstProduct.thumbnail === secondProduct.thumbnail &&
    firstProduct.minimumOrderQuantity === secondProduct.minimumOrderQuantity
  )
}
