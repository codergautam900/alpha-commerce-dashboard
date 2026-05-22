import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product, ProductColumnId } from '../../types/product'
import {
  formatCategoryLabel,
  formatCurrency,
  formatRating,
} from '../../utils/formatters'
import {
  PRODUCT_COLUMN_DEFINITIONS,
  type ProductColumnDefinition,
} from '../../utils/productColumns'
import { getStockLabel, getStockTone } from '../../utils/products'
import ProductStockBadge from './ProductStockBadge'

type ProductTableProps = {
  products: Product[]
  visibleColumns: ProductColumnId[]
}

function ProductTable({ products, visibleColumns }: ProductTableProps) {
  const selectedColumnDefinitions = PRODUCT_COLUMN_DEFINITIONS.filter((column) =>
    visibleColumns.includes(column.id),
  )

  const gridTemplateColumns = selectedColumnDefinitions
    .map((column) => column.width)
    .join(' ')

  return (
    <div className="page-reveal hidden overflow-hidden rounded-[28px] border border-slate-200/80 lg:block">
      <div
        className="grid gap-3 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_100%)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
        style={{ gridTemplateColumns }}
      >
        {selectedColumnDefinitions.map((column) => (
          <span key={column.id}>{column.label}</span>
        ))}
      </div>

      <div className="divide-y divide-slate-200">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="grid gap-3 px-5 py-4 text-sm transition hover:bg-sky-50/50"
            style={{ gridTemplateColumns }}
          >
            {selectedColumnDefinitions.map((column) => (
              <div key={column.id}>{renderCell(column, product)}</div>
            ))}
          </Link>
        ))}
      </div>
    </div>
  )
}

function renderCell(column: ProductColumnDefinition, product: Product) {
  if (column.id === 'product') {
    return (
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-14 w-14 rounded-2xl bg-slate-100 object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-950">{product.title}</p>
          <p className="truncate text-sm text-slate-500">
            {product.brand || 'Independent Brand'}
          </p>
        </div>
      </div>
    )
  }

  if (column.id === 'category') {
    return (
      <span className="self-center text-slate-600">
        {formatCategoryLabel(product.category)}
      </span>
    )
  }

  if (column.id === 'price') {
    return (
      <span className="self-center font-medium text-slate-950">
        {formatCurrency(product.price)}
      </span>
    )
  }

  if (column.id === 'stock') {
    return (
      <div className="self-center">
        <ProductStockBadge
          label={getStockLabel(product)}
          tone={getStockTone(product)}
        />
      </div>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 self-center text-slate-700">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      {formatRating(product.rating)}
    </span>
  )
}

export default ProductTable
