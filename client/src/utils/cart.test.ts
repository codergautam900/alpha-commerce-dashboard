import assert from 'node:assert/strict'
import test from 'node:test'
import type { Product } from '../types/product'
import {
  calculateCartSummary,
  getDefaultPurchaseQuantity,
  reconcileCartItems,
} from './cart.ts'

function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: 'Alpha Phone',
    description: 'Flagship device',
    category: 'smartphones',
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 5,
    availabilityStatus: 'In Stock',
    brand: 'Alpha',
    sku: 'ALPHA-1',
    minimumOrderQuantity: 1,
    shippingInformation: 'Ships tomorrow',
    warrantyInformation: '1 year warranty',
    tags: ['featured'],
    thumbnail: 'https://example.com/phone.jpg',
    images: ['https://example.com/phone.jpg'],
    ...overrides,
  }
}

test('reconcileCartItems refreshes cart snapshots and clamps quantity to live stock', () => {
  const staleProduct = createProduct({
    price: 100,
    stock: 5,
    discountPercentage: 10,
  })
  const liveProduct = createProduct({
    price: 130,
    stock: 3,
    discountPercentage: 5,
  })
  const originalCartItems = [{ product: staleProduct, quantity: 5 }]

  const reconciledCartItems = reconcileCartItems(originalCartItems, [liveProduct])

  assert.notEqual(reconciledCartItems, originalCartItems)
  assert.equal(reconciledCartItems.length, 1)
  assert.equal(reconciledCartItems[0]?.quantity, 3)
  assert.equal(reconciledCartItems[0]?.product.price, 130)
  assert.equal(reconciledCartItems[0]?.product.discountPercentage, 5)

  const cartSummary = calculateCartSummary(reconciledCartItems)

  assert.equal(cartSummary.subtotal, 390)
  assert.equal(cartSummary.discountTotal, 19.5)
  assert.equal(cartSummary.grandTotal, 418.14)
})

test('getDefaultPurchaseQuantity returns zero for out-of-stock products and respects minimum order when stocked', () => {
  const outOfStockProduct = createProduct({
    stock: 0,
    minimumOrderQuantity: 4,
  })
  const inStockProduct = createProduct({
    stock: 3,
    minimumOrderQuantity: 2,
  })

  assert.equal(getDefaultPurchaseQuantity(outOfStockProduct), 0)
  assert.equal(getDefaultPurchaseQuantity(inStockProduct), 2)
})
