import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import {
  formatCategoryLabel,
  formatCurrency,
  formatRating,
} from '../../utils/formatters'
import { getStockLabel, getStockTone } from '../../utils/products'
import ProductStockBadge from './ProductStockBadge'

type ProductTableProps = {
  products: Product[]
}

function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-3xl border border-slate-200 lg:block">
      <div className="grid grid-cols-[2.2fr_1fr_0.9fr_1fr_0.8fr] gap-3 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        <span>Product</span>
        <span>Category</span>
        <span>Price</span>
        <span>Stock</span>
        <span>Rating</span>
      </div>

      <div className="divide-y divide-slate-200">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="grid grid-cols-[2.2fr_1fr_0.9fr_1fr_0.8fr] gap-3 px-5 py-4 text-sm transition hover:bg-slate-50"
          >
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

            <span className="self-center text-slate-600">
              {formatCategoryLabel(product.category)}
            </span>
            <span className="self-center font-medium text-slate-950">
              {formatCurrency(product.price)}
            </span>
            <div className="self-center">
              <ProductStockBadge
                label={getStockLabel(product)}
                tone={getStockTone(product)}
              />
            </div>
            <span className="inline-flex items-center gap-1 self-center text-slate-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {formatRating(product.rating)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductTable
