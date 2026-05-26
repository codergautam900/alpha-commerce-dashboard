import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Minus, Package, Plus, ShieldCheck, ShoppingCart, Star, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../app/useAuth'
import { useCart } from '../app/useCart'
import { usePublication } from '../app/usePublication'
import ProductGallery from '../components/products/ProductGallery'
import ProductStockBadge from '../components/products/ProductStockBadge'
import PageLoader from '../components/ui/PageLoader'
import PageHeader from '../components/ui/PageHeader'
import StatePanel from '../components/ui/StatePanel'
import { fetchProductById, productQueryKeys } from '../services/products'
import type { Product } from '../types/product'
import {
  formatCategoryLabel,
  formatCurrency,
  formatRating,
} from '../utils/formatters'
import {
  calculateCartSummary,
  canPurchaseProduct,
  getDefaultPurchaseQuantity,
  getMaxCartQuantity,
  getShippingCopy,
  normalizePurchaseQuantity,
} from '../utils/cart'
import { getStockLabel, getStockTone } from '../utils/products'

function ProductDetailsPage() {
  const { productId } = useParams()
  const numericProductId = Number(productId)
  const { session } = useAuth()
  const { isProductPublished, toggleProductPublished } = usePublication()
  const isAdmin = session?.role === 'admin'

  const productQuery = useQuery({
    queryKey: productQueryKeys.detail(productId ?? 'unknown'),
    queryFn: () => fetchProductById(numericProductId),
    enabled: Number.isFinite(numericProductId),
  })

  if (!Number.isFinite(numericProductId)) {
    return (
      <StatePanel
        title="Invalid product link"
        description="The product id in the URL is not valid. Open the products list and choose an item from there."
        tone="error"
        action={
          <Link
            to="/products"
            className="inline-flex rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to products
          </Link>
        }
      />
    )
  }

  if (productQuery.isLoading) {
    return (
      <>
        <PageHeader
          title={`Product #${productId ?? '1'}`}
          description="Loading product details, gallery, and metadata."
          action={
            <Link
              to="/products"
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Back to products
            </Link>
          }
        />
        <PageLoader message="Fetching product details..." />
      </>
    )
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <>
        <PageHeader
          title={`Product #${productId ?? '1'}`}
          description="The selected product could not be loaded."
          action={
            <Link
              to="/products"
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Back to products
            </Link>
          }
        />
        <StatePanel
          title="Unable to load product details"
          description={
            productQuery.error instanceof Error
              ? productQuery.error.message
              : 'Something went wrong while requesting this product.'
          }
          tone="error"
          action={
            <button
              type="button"
              onClick={() => {
                void productQuery.refetch()
              }}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try again
            </button>
          }
        />
      </>
    )
  }

  const product = productQuery.data
  const galleryImages = product.images.length > 0 ? product.images : [product.thumbnail]
  const isPublished = isProductPublished(product.id)

  if (!isAdmin && !isPublished) {
    return (
      <>
        <PageHeader
          title={product.title}
          description="This product is currently hidden from the standard user catalog."
          action={
            <Link
              to="/products"
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Back to products
            </Link>
          }
        />
        <StatePanel
          title="Published access only"
          description="Only products marked as published are visible in the standard user experience. Sign in as admin to change this product's visibility."
        />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title={product.title}
        description={product.description}
        eyebrow="Product Detail"
        metaItems={[
          { label: 'Category', value: formatCategoryLabel(product.category) },
          { label: 'Rating', value: formatRating(product.rating) },
          { label: 'In stock', value: `${product.stock} units` },
          ...(isAdmin
            ? [{ label: 'Visibility', value: isPublished ? 'Published' : 'Hidden' }]
            : []),
        ]}
        action={
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Back to products
            </Link>
            {isAdmin ? (
              <button
                type="button"
                onClick={() => toggleProductPublished(product.id)}
                className="inline-flex rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {isPublished ? 'Hide from users' : 'Publish for users'}
              </button>
            ) : null}
          </div>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="page-reveal rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 dark:shadow-[0_18px_60px_-30px_rgba(2,6,23,0.82)]">
          <ProductGallery
            key={product.id}
            images={galleryImages}
            title={product.title}
          />
        </article>

        <article className="page-reveal rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 dark:shadow-[0_18px_60px_-30px_rgba(2,6,23,0.82)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Details
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100">{product.title}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {formatCategoryLabel(product.category)}
            </span>
            <ProductStockBadge
              label={getStockLabel(product)}
              tone={getStockTone(product)}
            />
            {isAdmin ? (
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  isPublished
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-100 dark:ring-1 dark:ring-emerald-400/30'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-100 dark:ring-1 dark:ring-amber-400/30'
                }`}
              >
                {isPublished ? 'Published for user view' : 'Hidden from user view'}
              </span>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="min-w-0 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-2 break-words text-xl font-semibold tabular-nums text-slate-950 dark:text-slate-100 lg:text-2xl">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm text-slate-500">Rating</p>
              <p className="mt-2 inline-flex max-w-full items-center gap-2 break-words text-xl font-semibold tabular-nums text-slate-950 dark:text-slate-100 lg:text-2xl">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                {formatRating(product.rating)}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm text-slate-500">Discount</p>
              <p className="mt-2 break-words text-xl font-semibold tabular-nums text-slate-950 dark:text-slate-100 lg:text-2xl">
                {formatRating(product.discountPercentage)}%
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ProductPurchasePanel key={product.id} product={product} />
          </div>

          <div className="mt-6 grid gap-4">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <Package className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Inventory</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {product.stock} units available
                  {product.minimumOrderQuantity
                    ? ` | minimum order ${product.minimumOrderQuantity}`
                    : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <Truck className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Shipping</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {product.shippingInformation || 'Shipping details unavailable'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Warranty</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {product.warrantyInformation || 'Warranty information unavailable'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-400">
            Product id:
            <span className="ml-2 font-semibold text-slate-900">{product.id}</span>
            {product.brand ? (
              <>
                <span className="mx-2 text-slate-400">|</span>
                Brand:
                <span className="ml-2 font-semibold text-slate-900 dark:text-slate-100">
                  {product.brand}
                </span>
              </>
            ) : null}
            {product.sku ? (
              <>
                <span className="mx-2 text-slate-400">|</span>
                SKU:
                <span className="ml-2 font-semibold text-slate-900">{product.sku}</span>
              </>
            ) : null}
          </div>

          {product.tags && product.tags.length > 0 ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </section>
    </>
  )
}

export default ProductDetailsPage

type ProductPurchasePanelProps = {
  product: Product
}

function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { addToCart, buyNow, getQuantityForProduct } = useCart()
  const maxQuantity = getMaxCartQuantity(product)
  const minimumQuantity = getDefaultPurchaseQuantity(product)
  const [desiredPurchaseQuantity, setDesiredPurchaseQuantity] = useState(minimumQuantity)
  const isPurchasable = canPurchaseProduct(product)
  const quantityInCart = getQuantityForProduct(product.id)
  const purchaseQuantity = normalizePurchaseQuantity(product, desiredPurchaseQuantity)

  const singleProductSummary = calculateCartSummary([
    {
      product,
      quantity: purchaseQuantity,
    },
  ])

  return (
    <section className="rounded-[30px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(248,250,252,0.95)_0%,rgba(255,255,255,0.98)_100%)] p-5 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.32)] dark:border-slate-700/80 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.96)_100%)] dark:shadow-[0_18px_50px_-34px_rgba(2,6,23,0.86)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Purchase Planner
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-slate-100">
            Build the order before checkout
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Adjust quantity and see the full payable amount update with discount,
            shipping, and tax.
          </p>
        </div>

        {quantityInCart > 0 ? (
          <div className="rounded-[22px] border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 dark:border-sky-400/30 dark:bg-sky-500/12 dark:text-sky-100">
            {quantityInCart} unit{quantityInCart > 1 ? 's' : ''} already in cart
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/80">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Select quantity</p>
          <div className="mt-4 inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() =>
                setDesiredPurchaseQuantity((currentQuantity) => currentQuantity - 1)
              }
              disabled={!isPurchasable || purchaseQuantity === minimumQuantity}
              className="rounded-xl p-2 text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Decrease purchase quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-12 px-4 text-center text-base font-semibold text-slate-950 dark:text-slate-100">
              {purchaseQuantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setDesiredPurchaseQuantity((currentQuantity) => currentQuantity + 1)
              }
              disabled={!isPurchasable || purchaseQuantity >= maxQuantity}
              className="rounded-xl p-2 text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Increase purchase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>Available stock: {product.stock} units</p>
            <p>
              Minimum order:{' '}
              {isPurchasable ? minimumQuantity : 'Unavailable until restocked'}
            </p>
            <p>
              {isPurchasable
                ? `You can add up to ${maxQuantity} unit${maxQuantity > 1 ? 's' : ''} in one go.`
                : 'This product is currently unavailable for purchase.'}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(product, purchaseQuantity)}
              disabled={!isPurchasable}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => buyNow(product, purchaseQuantity)}
              disabled={!isPurchasable}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Buy now
            </button>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.7)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Calculation
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <DetailSummaryRow
              label={`Base price x ${purchaseQuantity}`}
              value={formatCurrency(singleProductSummary.subtotal)}
            />
            <DetailSummaryRow
              label="Discount savings"
              value={`- ${formatCurrency(singleProductSummary.discountTotal)}`}
              valueClassName="text-emerald-300"
            />
            <DetailSummaryRow
              label="Subtotal after discount"
              value={formatCurrency(singleProductSummary.discountedSubtotal)}
            />
            <DetailSummaryRow
              label="Shipping"
              value={formatCurrency(singleProductSummary.shipping)}
            />
            <DetailSummaryRow
              label="Estimated tax"
              value={formatCurrency(singleProductSummary.tax)}
            />
          </div>

          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Order note</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {isPurchasable
                ? getShippingCopy(singleProductSummary.discountedSubtotal)
                : 'Restock required before this product can be added to the cart.'}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-400">Estimated payable</p>
              <p className="mt-2 break-words text-2xl font-semibold tracking-tight tabular-nums text-white">
                {formatCurrency(singleProductSummary.grandTotal)}
              </p>
            </div>

            <div className="rounded-[22px] bg-white/10 px-4 py-3 text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Units
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {purchaseQuantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type DetailSummaryRowProps = {
  label: string
  value: string
  valueClassName?: string
}

function DetailSummaryRow({
  label,
  value,
  valueClassName = 'text-white',
}: DetailSummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="min-w-0 flex-1 text-slate-300">{label}</span>
      <span className={`shrink-0 whitespace-nowrap text-right font-semibold tabular-nums ${valueClassName}`}>
        {value}
      </span>
    </div>
  )
}
