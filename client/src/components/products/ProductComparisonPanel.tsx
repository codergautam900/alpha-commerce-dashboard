import { X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useComparison } from '../../app/useComparison'
import type { Product } from '../../types/product'
import {
  formatCategoryLabel,
  formatCurrency,
  formatRating,
} from '../../utils/formatters'

type ComparableField =
  | 'brand'
  | 'category'
  | 'discountPercentage'
  | 'price'
  | 'rating'
  | 'stock'

function ProductComparisonPanel() {
  const { clearComparison, selectedProducts, toggleProduct } = useComparison()
  const { pathname } = useLocation()

  if (!pathname.startsWith('/products') || selectedProducts.length === 0) {
    return null
  }

  const specs: Array<{ key: ComparableField; label: string }> = [
    { label: 'Price', key: 'price' },
    { label: 'Rating', key: 'rating' },
    { label: 'Stock', key: 'stock' },
    { label: 'Category', key: 'category' },
    { label: 'Brand', key: 'brand' },
    { label: 'Discount', key: 'discountPercentage' },
  ]

  return (
    <div className="fixed bottom-0 right-0 z-40 max-h-[26rem] w-full overflow-auto border-t border-l border-slate-200 bg-white shadow-[-8px_0_32px_-8px_rgba(0,0,0,0.1)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[-8px_0_32px_-8px_rgba(0,0,0,0.5)] lg:w-[34rem]">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Compare ({selectedProducts.length}/3)
          </h3>
          <button
            type="button"
            onClick={clearComparison}
            className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Clear comparison"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="w-24 border-r border-slate-200 px-3 py-2 text-left font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
                Spec
              </th>
              {selectedProducts.map((product) => (
                <th
                  key={product.id}
                  className="min-w-32 border-r border-slate-200 px-3 py-2 text-left font-semibold text-slate-700 last:border-r-0 dark:border-slate-700 dark:text-slate-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        to={`/products/${product.id}`}
                        className="line-clamp-2 text-xs font-medium hover:underline"
                      >
                        {product.title}
                      </Link>
                      <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {product.brand || formatCategoryLabel(product.category)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleProduct(product)}
                      className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      aria-label={`Remove ${product.title} from comparison`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={spec.key}
                className={`border-b border-slate-200 dark:border-slate-700 ${
                  index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900/30' : ''
                }`}
              >
                <td className="border-r border-slate-200 px-3 py-2 font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400">
                  {spec.label}
                </td>
                {selectedProducts.map((product) => (
                  <td
                    key={`${product.id}-${spec.key}`}
                    className="min-w-32 border-r border-slate-200 px-3 py-2 text-slate-900 last:border-r-0 dark:border-slate-700 dark:text-slate-100"
                  >
                    {formatComparisonValue(product, spec.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatComparisonValue(product: Product, key: ComparableField): string {
  switch (key) {
    case 'brand':
      return product.brand || 'N/A'
    case 'category':
      return formatCategoryLabel(product.category)
    case 'discountPercentage':
      return `${formatRating(product.discountPercentage)}%`
    case 'price':
      return formatCurrency(product.price)
    case 'rating':
      return formatRating(product.rating)
    case 'stock':
      return String(product.stock)
    default:
      return 'N/A'
  }
}

export default ProductComparisonPanel
