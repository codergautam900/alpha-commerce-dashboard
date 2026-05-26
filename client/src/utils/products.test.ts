import assert from 'node:assert/strict'
import test from 'node:test'
import type { Product } from '../types/product'
import { buildNormalizedQueryString, filterProducts } from './products.ts'

function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: 'Alpha Phone',
    description: 'Fast device for creators',
    category: 'smartphones',
    price: 799,
    discountPercentage: 10,
    rating: 4.7,
    stock: 14,
    brand: 'Nova',
    thumbnail: 'https://example.com/phone.jpg',
    images: ['https://example.com/phone.jpg'],
    ...overrides,
  }
}

test('buildNormalizedQueryString keeps saved-view query strings stable across param order changes', () => {
  const searchParams = new URLSearchParams()
  searchParams.set('sort', 'price-desc')
  searchParams.set('rating', '4')
  searchParams.set('search', 'phone')
  searchParams.set('categories', 'smartphones,laptops')

  assert.equal(
    buildNormalizedQueryString(searchParams),
    'categories=smartphones%2Claptops&rating=4&search=phone&sort=price-desc',
  )
})

test('filterProducts matches search, category, and minimum rating filters', () => {
  const products = [
    createProduct(),
    createProduct({
      id: 2,
      title: 'Studio Laptop',
      description: 'Portable workstation',
      category: 'laptops',
      brand: 'Nova',
    }),
    createProduct({
      id: 3,
      title: 'Desk Lamp',
      description: 'Warm ambient light',
      category: 'home-decoration',
      brand: 'Glow',
      rating: 3.2,
    }),
  ]

  const searchResults = filterProducts(products, 'portable', [], null)
  const categoryResults = filterProducts(products, '', ['smartphones', 'laptops'], null)
  const ratingResults = filterProducts(products, '', [], 4)

  assert.deepEqual(
    searchResults.map((product) => product.id),
    [2],
  )
  assert.deepEqual(
    categoryResults.map((product) => product.id),
    [1, 2],
  )
  assert.deepEqual(
    ratingResults.map((product) => product.id),
    [1, 2],
  )
})
