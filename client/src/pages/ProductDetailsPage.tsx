import { Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'

function ProductDetailsPage() {
  const { productId } = useParams()

  return (
    <>
      <PageHeader
        title={`Product #${productId ?? '1'}`}
        description="This route is ready for the dedicated product details view. Next we can connect product images, description, category, rating, and stock information."
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
          <div className="grid gap-4 sm:grid-cols-[88px_1fr]">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="aspect-square rounded-2xl border border-dashed border-slate-300 bg-slate-50"
                />
              ))}
            </div>

            <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50">
              <span className="text-sm text-slate-500">Product image gallery</span>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Details
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Product detail layout
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            We will use this area for the product description, category badge,
            pricing, stock status, rating, and CTA actions.
          </p>

          <div className="mt-6 flex items-center gap-2 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-slate-700">
              Rating placeholder
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            URL parameter captured:
            <span className="ml-2 font-semibold text-slate-900">{productId}</span>
          </div>
        </article>
      </section>
    </>
  )
}

export default ProductDetailsPage
