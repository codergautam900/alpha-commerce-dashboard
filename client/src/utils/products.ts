import type { Product, ProductSortValue } from '../types/product'

export const PRODUCT_PAGE_SIZE = 12
export const DEFAULT_PRODUCT_SORT: ProductSortValue = 'title-asc'

export const PRODUCT_SORT_OPTIONS: Array<{
  label: string
  value: ProductSortValue
}> = [
  { label: 'Name: A to Z', value: 'title-asc' },
  { label: 'Name: Z to A', value: 'title-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: Low to High', value: 'rating-asc' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
]

export function parseCategoriesParam(value: string | null) {
  if (!value) {
    return []
  }

  return [...new Set(value.split(',').map((item) => item.trim()).filter(Boolean))]
}

export function parseSortParam(value: string | null): ProductSortValue {
  const validOptions = new Set(PRODUCT_SORT_OPTIONS.map((option) => option.value))

  if (value && validOptions.has(value as ProductSortValue)) {
    return value as ProductSortValue
  }

  return DEFAULT_PRODUCT_SORT
}

export function parsePageParam(value: string | null) {
  const pageNumber = Number(value)

  if (!Number.isFinite(pageNumber) || pageNumber < 1) {
    return 1
  }

  return Math.floor(pageNumber)
}

export function filterProducts(
  products: Product[],
  search: string,
  selectedCategories: string[],
) {
  const normalizedSearch = search.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.brand?.toLowerCase().includes(normalizedSearch)

    // Multiple selected categories are treated as an OR filter.
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)

    return matchesSearch && matchesCategory
  })
}

export function sortProducts(products: Product[], sortValue: ProductSortValue) {
  const [field, direction] = sortValue.split('-') as [
    'title' | 'price' | 'rating',
    'asc' | 'desc',
  ]
  const orderedProducts = [...products]

  orderedProducts.sort((firstProduct, secondProduct) => {
    const firstValue = firstProduct[field]
    const secondValue = secondProduct[field]

    if (typeof firstValue === 'string' && typeof secondValue === 'string') {
      const comparison = firstValue.localeCompare(secondValue)
      return direction === 'asc' ? comparison : comparison * -1
    }

    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      const comparison = firstValue - secondValue
      return direction === 'asc' ? comparison : comparison * -1
    }

    return 0
  })

  return orderedProducts
}

export function paginateProducts(
  products: Product[],
  currentPage: number,
  pageSize: number,
) {
  const totalItems = products.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const items = products.slice(startIndex, startIndex + pageSize)

  return {
    items,
    totalItems,
    totalPages,
    safePage,
  }
}

export function getStockLabel(product: Product) {
  if (product.availabilityStatus) {
    return product.availabilityStatus
  }

  if (product.stock <= 0) {
    return 'Out of Stock'
  }

  if (product.stock <= 10) {
    return 'Low Stock'
  }

  return 'In Stock'
}

export function getStockTone(product: Product) {
  const label = getStockLabel(product).toLowerCase()

  if (label.includes('out')) {
    return 'danger' as const
  }

  if (label.includes('low')) {
    return 'warning' as const
  }

  return 'success' as const
}
