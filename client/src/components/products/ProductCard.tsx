import { ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../app/useCart'
import { useComparison } from '../../app/useComparison'
import type { Product } from '../../types/product'
import type { UserRole } from '../../types/auth'
import {
  formatCategoryLabel,
  formatCurrency,
  formatRating,
} from '../../utils/formatters'
import { canPurchaseProduct } from '../../utils/cart'
import { getStockLabel, getStockTone } from '../../utils/products'
import ProductStockBadge from './ProductStockBadge'
import ComparisonCheckbox from './ComparisonCheckbox'

type ProductCardProps = {
  isProductPublished: boolean
  onTogglePublished: () => void
  product: Product
  role: UserRole
}

function ProductCard({
  isProductPublished,
  onTogglePublished,
  product,
  role,
}: ProductCardProps) {
  const { addToCart, buyNow, getQuantityForProduct } = useCart()
  const { selectedProducts, toggleProduct } = useComparison()
  const quantityInCart = getQuantityForProduct(product.id)
  const isPurchasable = canPurchaseProduct(product)
  const showAdminControls = role === 'admin'
  const isComparisonSelected = selectedProducts.some((p) => p.id === product.id)

  return (
    <article className="page-reveal rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_26px_80px_-36px_rgba(15,23,42,0.45)] dark:border-slate-700/80 dark:bg-slate-900/75 dark:shadow-[0_18px_60px_-32px_rgba(2,6,23,0.82)]">
      <Link to={`/products/${product.id}`} className="block">
        <div className="flex items-start gap-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-20 w-20 rounded-2xl bg-slate-100 object-cover dark:bg-slate-800"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {formatCategoryLabel(product.category)}
                </p>
                <h3 className="mt-2 line-clamp-2 text-base font-semibold text-slate-950 dark:text-slate-100">
                  {product.title}
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                <p className="w-fit max-w-full rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold tabular-nums text-slate-950 dark:bg-slate-800 dark:text-slate-100 sm:text-base">
                  {formatCurrency(product.price)}
                </p>
                <div
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                >
                  <ComparisonCheckbox
                    isSelected={isComparisonSelected}
                    product={product}
                    onToggle={toggleProduct}
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {product.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <ProductStockBadge
                label={getStockLabel(product)}
                tone={getStockTone(product)}
              />

              <span className="inline-flex whitespace-nowrap items-center gap-1 text-sm font-medium tabular-nums text-slate-700 dark:text-slate-300">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {formatRating(product.rating)}
              </span>
            </div>

            {showAdminControls ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                    isProductPublished
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-100 dark:ring-1 dark:ring-emerald-400/30'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-100 dark:ring-1 dark:ring-amber-400/30'
                  }`}
                >
                  {isProductPublished ? 'Published' : 'Hidden'}
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault()
                    onTogglePublished()
                  }}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {isProductPublished ? 'Hide' : 'Publish'}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700/80">
        {quantityInCart > 0 ? (
          <p className="mb-3 text-sm font-medium text-sky-700">
            {quantityInCart} unit{quantityInCart > 1 ? 's' : ''} already in cart
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={!isPurchasable}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" />
            {isPurchasable ? 'Add to cart' : 'Out of stock'}
          </button>
          <button
            type="button"
            onClick={() => buyNow(product)}
            disabled={!isPurchasable}
            className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Buy now
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
