import type { Product } from '../types/product'
import { formatCategoryLabel, formatCurrency, formatRating } from './formatters'
import type { ProductColumnDefinition } from './productColumns'
import { getStockLabel } from './products'

export function downloadProductsCsv(
  products: Product[],
  selectedColumns: ProductColumnDefinition[],
) {
  const headers = ['ID', ...selectedColumns.map((column) => column.label)]
  const rows = products.map((product) => [
    String(product.id),
    ...selectedColumns.map((column) => getColumnValue(product, column.id)),
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const fileName = `alpha-products-${new Date().toISOString().slice(0, 10)}.csv`
  const url = window.URL.createObjectURL(blob)
  const link = window.document.createElement('a')

  link.href = url
  link.download = fileName
  link.click()

  window.URL.revokeObjectURL(url)
}

function getColumnValue(product: Product, columnId: ProductColumnDefinition['id']) {
  if (columnId === 'product') {
    return `${product.title}${product.brand ? ` (${product.brand})` : ''}`
  }

  if (columnId === 'category') {
    return formatCategoryLabel(product.category)
  }

  if (columnId === 'price') {
    return formatCurrency(product.price)
  }

  if (columnId === 'stock') {
    return `${product.stock} - ${getStockLabel(product)}`
  }

  return formatRating(product.rating)
}

function escapeCsvValue(value: string) {
  const normalizedValue = value.replace(/"/g, '""')
  return `"${normalizedValue}"`
}
