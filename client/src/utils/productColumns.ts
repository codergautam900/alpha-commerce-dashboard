import type { ProductColumnId } from '../types/product'

export type ProductColumnDefinition = {
  id: ProductColumnId
  label: string
  width: string
  hideable: boolean
}

export const PRODUCT_COLUMN_DEFINITIONS: ProductColumnDefinition[] = [
  {
    id: 'product',
    label: 'Product',
    width: '2.2fr',
    hideable: false,
  },
  {
    id: 'category',
    label: 'Category',
    width: '1fr',
    hideable: true,
  },
  {
    id: 'price',
    label: 'Price',
    width: '0.9fr',
    hideable: true,
  },
  {
    id: 'stock',
    label: 'Stock',
    width: '1fr',
    hideable: true,
  },
  {
    id: 'rating',
    label: 'Rating',
    width: '0.8fr',
    hideable: true,
  },
]

export const DEFAULT_VISIBLE_PRODUCT_COLUMNS: ProductColumnId[] =
  PRODUCT_COLUMN_DEFINITIONS.map((column) => column.id)

export function sanitizeVisibleProductColumns(columnIds: ProductColumnId[]) {
  const validColumnIds = new Set(
    PRODUCT_COLUMN_DEFINITIONS.map((column) => column.id),
  )

  const filteredColumnIds = columnIds.filter((columnId) =>
    validColumnIds.has(columnId),
  )

  // We keep the product column always visible so every row still has a clear anchor.
  if (!filteredColumnIds.includes('product')) {
    filteredColumnIds.unshift('product')
  }

  if (filteredColumnIds.length === 0) {
    return DEFAULT_VISIBLE_PRODUCT_COLUMNS
  }

  return [...new Set(filteredColumnIds)]
}
