import { ArrowUpDown, Filter, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'

const sampleRows = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Audio',
    price: '$129.00',
    stock: 'In Stock',
    rating: '4.7',
  },
  {
    id: 2,
    name: 'Smart Desk Lamp',
    category: 'Home',
    price: '$59.00',
    stock: 'Low Stock',
    rating: '4.3',
  },
  {
    id: 3,
    name: 'Portable Speaker',
    category: 'Audio',
    price: '$89.00',
    stock: 'In Stock',
    rating: '4.5',
  },
]

function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        description="This page structure is ready for the DummyJSON product API. Next we will replace placeholder data with live search, filters, sorting, pagination, and URL state synchronization."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Filter className="h-4 w-4" />
            Filter panel
          </button>
        }
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-200"
            />
          </label>

          <button
            type="button"
            className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            Categories
            <Filter className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            Sort by
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">
          <div className="grid grid-cols-[1.8fr_1fr_0.9fr_0.9fr_0.8fr] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Rating</span>
          </div>

          <div className="divide-y divide-slate-200">
            {sampleRows.map((row) => (
              <Link
                key={row.id}
                to={`/products/${row.id}`}
                className="grid grid-cols-[1.8fr_1fr_0.9fr_0.9fr_0.8fr] gap-3 px-4 py-4 text-sm transition hover:bg-slate-50"
              >
                <span className="font-medium text-slate-900">{row.name}</span>
                <span className="text-slate-600">{row.category}</span>
                <span className="text-slate-900">{row.price}</span>
                <span className="text-slate-600">{row.stock}</span>
                <span className="text-slate-900">{row.rating}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsPage
