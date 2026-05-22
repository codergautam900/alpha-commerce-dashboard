import { Boxes, CircleDollarSign, Shapes, Star } from 'lucide-react'
import InfoCard from '../components/ui/InfoCard'
import PageHeader from '../components/ui/PageHeader'

const overviewCards = [
  {
    title: 'Total Products',
    value: '1,240',
    description: 'This card will be wired to the products API summary.',
    icon: <Boxes className="h-5 w-5" />,
  },
  {
    title: 'Average Rating',
    value: '4.6',
    description: 'Perfect place for computed review averages from live data.',
    icon: <Star className="h-5 w-5" />,
  },
  {
    title: 'Inventory Value',
    value: '$84,320',
    description: 'Will calculate stock multiplied by price across all products.',
    icon: <CircleDollarSign className="h-5 w-5" />,
  },
  {
    title: 'Categories',
    value: '18',
    description: 'Category distribution chart section can live right below.',
    icon: <Shapes className="h-5 w-5" />,
  },
]

function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="This is the dashboard foundation. Next we will connect live product data, analytics cards, and category distribution charts from the DummyJSON API."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <h2 className="text-xl font-semibold text-slate-950">Build Sequence</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                1. Product Listing
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Search, filters, sorting, pagination, URL sync.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                2. Product Detail
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Dedicated route with gallery, description, category, and rating.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                3. Analytics
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Summary metrics and category distribution chart using Recharts.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                4. Optimization
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Debounced search, lazy loading, and memoization.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <h2 className="text-xl font-semibold text-slate-950">Notes</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            <li>Responsive shell is in place with sidebar and top navigation.</li>
            <li>React Query provider is already wired in the app root.</li>
            <li>Services, types, and hooks folders are ready for API integration.</li>
          </ul>
        </article>
      </section>
    </>
  )
}

export default DashboardPage
