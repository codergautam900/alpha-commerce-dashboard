import { useQuery } from '@tanstack/react-query'
import { Package, ShieldCheck, Star, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ProductGallery from '../components/products/ProductGallery'
import ProductStockBadge from '../components/products/ProductStockBadge'
import PageLoader from '../components/ui/PageLoader'
import PageHeader from '../components/ui/PageHeader'
import StatePanel from '../components/ui/StatePanel'
import { fetchProductById, productQueryKeys } from '../services/products'
import {
  formatCategoryLabel,
  formatCurrency,
  formatRating,
} from '../utils/formatters'
import { getStockLabel, getStockTone } from '../utils/products'

function ProductDetailsPage() {
  const { productId } = useParams()
  const numericProductId = Number(productId)

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
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
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
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
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
        ]}
        action={
          <Link
            to="/products"
            className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Back to products
          </Link>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <ProductGallery
            key={product.id}
            images={galleryImages}
            title={product.title}
          />
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Details
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">{product.title}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
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
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Rating</p>
              <p className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold text-slate-950">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                {formatRating(product.rating)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Discount</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {formatRating(product.discountPercentage)}%
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
              <Package className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Inventory</p>
                <p className="mt-1 text-sm text-slate-600">
                  {product.stock} units available
                  {product.minimumOrderQuantity
                    ? ` | minimum order ${product.minimumOrderQuantity}`
                    : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
              <Truck className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Shipping</p>
                <p className="mt-1 text-sm text-slate-600">
                  {product.shippingInformation || 'Shipping details unavailable'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Warranty</p>
                <p className="mt-1 text-sm text-slate-600">
                  {product.warrantyInformation || 'Warranty information unavailable'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            Product id:
            <span className="ml-2 font-semibold text-slate-900">{product.id}</span>
            {product.brand ? (
              <>
                <span className="mx-2 text-slate-400">|</span>
                Brand:
                <span className="ml-2 font-semibold text-slate-900">
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
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600"
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
