import { ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../app/useCart'
import type { Product, ProductColumnId } from '../../types/product'
import type { UserRole } from '../../types/auth'
import {
  formatCategoryLabel,
  formatCurrency,
  formatRating,
} from '../../utils/formatters'
import { canPurchaseProduct } from '../../utils/cart'
import {
  PRODUCT_COLUMN_DEFINITIONS,
  type ProductColumnDefinition,
} from '../../utils/productColumns'
import { getStockLabel, getStockTone } from '../../utils/products'
import ProductStockBadge from './ProductStockBadge'

type ProductTableProps = {
  isProductPublished: (productId: number) => boolean
  onTogglePublished: (productId: number) => void
  products: Product[]
  role: UserRole
  visibleColumns: ProductColumnId[]
}

function ProductTable({
  isProductPublished,
  onTogglePublished,
  products,
  role,
  visibleColumns,
}: ProductTableProps) {
  const { addToCart, buyNow, getQuantityForProduct } = useCart()
  const selectedColumnDefinitions = PRODUCT_COLUMN_DEFINITIONS.filter((column) =>
    visibleColumns.includes(column.id),
  )

  const gridTemplateColumns = selectedColumnDefinitions
    .map((column) => column.width)
    .join(' ')

  return (
    <div className="page-reveal hidden overflow-x-auto rounded-[28px] border border-slate-200/80 xl:block dark:border-slate-700/80">
      <div className="min-w-[960px]">
        <div
          className="grid gap-3 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_100%)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-[linear-gradient(180deg,rgba(30,41,59,0.92)_0%,rgba(15,23,42,0.98)_100%)] dark:text-slate-400"
          style={{ gridTemplateColumns }}
        >
          {selectedColumnDefinitions.map((column) => (
            <span key={column.id}>{column.label}</span>
          ))}
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700/80">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid gap-3 px-5 py-4 text-sm transition hover:bg-sky-50/50 dark:hover:bg-slate-800/50"
              style={{ gridTemplateColumns }}
            >
              {selectedColumnDefinitions.map((column) => (
                <div key={column.id}>
                  {renderCell(column, product, {
                    addToCart,
                    buyNow,
                    isPublished: isProductPublished(product.id),
                    onTogglePublished,
                    quantityInCart: getQuantityForProduct(product.id),
                    role,
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type CartActions = {
  addToCart: (product: Product, quantity?: number) => void
  buyNow: (product: Product, quantity?: number) => void
  isPublished: boolean
  onTogglePublished: (productId: number) => void
  quantityInCart: number
  role: UserRole
}

function renderCell(
  column: ProductColumnDefinition,
  product: Product,
  cartActions: CartActions,
) {
  if (column.id === 'product') {
    const isPurchasable = canPurchaseProduct(product)
    const showAdminControls = cartActions.role === 'admin'

    return (
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-14 w-14 rounded-2xl bg-slate-100 object-cover dark:bg-slate-800"
        />
        <div className="min-w-0 flex-1">
          <Link
            to={`/products/${product.id}`}
            className="truncate font-semibold text-slate-950 transition hover:text-sky-700 dark:text-slate-100 dark:hover:text-sky-400"
          >
            {product.title}
          </Link>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            {product.brand || 'Independent Brand'}
          </p>
          {showAdminControls ? (
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                  cartActions.isPublished
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {cartActions.isPublished ? 'Published' : 'Hidden'}
              </span>
              <button
                type="button"
                onClick={() => cartActions.onTogglePublished(product.id)}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {cartActions.isPublished ? 'Hide' : 'Publish'}
              </button>
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => cartActions.addToCart(product)}
              disabled={!isPurchasable}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {isPurchasable ? 'Add' : 'Out'}
            </button>
            <button
              type="button"
              onClick={() => cartActions.buyNow(product)}
              disabled={!isPurchasable}
              className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Buy
            </button>
            {cartActions.quantityInCart > 0 ? (
              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                {cartActions.quantityInCart} in cart
              </span>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  if (column.id === 'category') {
    return (
      <span className="self-center text-slate-600 dark:text-slate-400">
        {formatCategoryLabel(product.category)}
      </span>
    )
  }

  if (column.id === 'price') {
    return (
      <span className="self-center font-medium text-slate-950 dark:text-slate-100">
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
    <span className="inline-flex items-center gap-1 self-center text-slate-700 dark:text-slate-300">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      {formatRating(product.rating)}
    </span>
  )
}

export default ProductTable
