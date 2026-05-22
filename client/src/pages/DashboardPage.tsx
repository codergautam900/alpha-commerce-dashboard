import { Boxes, CircleDollarSign, PackageSearch, Shapes, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoryDistributionChart from '../components/analytics/CategoryDistributionChart'
import InfoCard from '../components/ui/InfoCard'
import PageHeader from '../components/ui/PageHeader'
import PageLoader from '../components/ui/PageLoader'
import StatePanel from '../components/ui/StatePanel'
import { useDashboardAnalytics } from '../hooks/useDashboardAnalytics'
import {
  formatCurrency,
  formatNumber,
  formatRating,
} from '../utils/formatters'

function DashboardPage() {
  const { analytics, error, isError, isLoading, refetchAll } = useDashboardAnalytics()

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Overview"
          description="Loading live dashboard analytics from the product catalog."
        />
        <PageLoader message="Preparing analytics..." />
      </>
    )
  }

  if (isError) {
    return (
      <>
        <PageHeader
          title="Overview"
          description="The analytics dashboard could not be loaded right now."
        />
        <StatePanel
          title="Unable to load analytics"
          description={
            error instanceof Error
              ? error.message
              : 'Something went wrong while fetching product analytics.'
          }
          tone="error"
          action={
            <button
              type="button"
              onClick={refetchAll}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try again
            </button>
          }
        />
      </>
    )
  }

  const overviewCards = [
    {
      title: 'Total Products',
      value: formatNumber(analytics.totalProducts),
      description: 'Total items currently available in the product catalog.',
      icon: <Boxes className="h-5 w-5" />,
    },
    {
      title: 'Average Rating',
      value: formatRating(analytics.averageRating),
      description: 'Average review score across the full catalog.',
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: 'Inventory Value',
      value: formatCurrency(analytics.inventoryValue),
      description: 'Calculated from product price multiplied by stock quantity.',
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
    {
      title: 'Active Categories',
      value: formatNumber(analytics.categoryCount),
      description: 'Number of categories contributing to the distribution chart.',
      icon: <Shapes className="h-5 w-5" />,
    },
  ]

  return (
    <>
      <PageHeader
        title="Overview"
        description="Live analytics from the DummyJSON product catalog, including inventory value, average rating, and category distribution."
        action={
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <PackageSearch className="h-4 w-4" />
            Open products
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="flex flex-col gap-2 border-b border-slate-200 pb-5">
            <h2 className="text-xl font-semibold text-slate-950">
              Category distribution
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              This chart shows how products are distributed across the strongest
              catalog categories.
            </p>
          </div>

          <div className="pt-5">
            <CategoryDistributionChart
              categories={analytics.categoryDistribution}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <h2 className="text-xl font-semibold text-slate-950">
            Operational snapshot
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Average Price</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {formatCurrency(analytics.averagePrice)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Low Stock Products</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {formatNumber(analytics.lowStockCount)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Top Rated Product</p>
              <p className="mt-2 text-lg font-semibold leading-7 text-slate-950">
                {analytics.topRatedProductTitle}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-900">Why this helps</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              These summary cards give a quick read on catalog health, while the
              distribution chart shows where most of the inventory is concentrated.
            </p>
          </div>
        </article>
      </section>
    </>
  )
}

export default DashboardPage
