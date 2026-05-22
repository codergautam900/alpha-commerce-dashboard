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

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_26px_80px_-36px_rgba(15,23,42,0.45)]"
    >
      <div className="flex items-start gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-20 w-20 rounded-2xl bg-slate-100 object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {formatCategoryLabel(product.category)}
              </p>
              <h3 className="mt-2 line-clamp-2 text-base font-semibold text-slate-950">
                {product.title}
              </h3>
            </div>

            <p className="rounded-full bg-slate-100 px-3 py-1 text-base font-semibold text-slate-950">
              {formatCurrency(product.price)}
            </p>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <ProductStockBadge
              label={getStockLabel(product)}
              tone={getStockTone(product)}
            />

            <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {formatRating(product.rating)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
