import { useEffect, useState } from 'react'
import { ArrowUpDown, Search, X } from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce'
import type {
  ProductCategory,
  ProductSavedView,
  ProductSortValue,
} from '../../types/product'
import { formatCategoryLabel } from '../../utils/formatters'
import { PRODUCT_SORT_OPTIONS } from '../../utils/products'
import ProductSavedViewsPanel from './ProductSavedViewsPanel'

type ProductFiltersProps = {
  activeFilterCount: number
  activeViewId: string | null
  canSaveCurrentView: boolean
  categories: ProductCategory[]
  onApplySavedView: (queryString: string) => void
  onClearFilters: () => void
  onDeleteSavedView: (viewId: string) => void
  onSearchChange: (value: string) => void
  onSaveCurrentView: (name: string) => void
  onSortChange: (value: ProductSortValue) => void
  onToggleCategory: (slug: string) => void
  savedViews: ProductSavedView[]
  searchValue: string
  selectedCategories: string[]
  sortValue: ProductSortValue
}

function ProductFilters({
  activeFilterCount,
  activeViewId,
  canSaveCurrentView,
  categories,
  onApplySavedView,
  onClearFilters,
  onDeleteSavedView,
  onSearchChange,
  onSaveCurrentView,
  onSortChange,
  onToggleCategory,
  savedViews,
  searchValue,
  selectedCategories,
  sortValue,
}: ProductFiltersProps) {
  const [searchInput, setSearchInput] = useState(searchValue)
  const debouncedSearch = useDebounce(searchInput, 400)

  useEffect(() => {
    if (debouncedSearch === searchValue) {
      return
    }

    onSearchChange(debouncedSearch)
  }, [debouncedSearch, onSearchChange, searchValue])

  return (
    <section className="page-reveal rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.96))] p-5 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.4)]">
      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by name, brand, description, or category"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-200"
          />
        </label>

        <label className="relative block">
          <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={sortValue}
            onChange={(event) => onSortChange(event.target.value as ProductSortValue)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-200"
          >
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              Filter Studio
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">Category filters</h2>
            <p className="mt-1 text-sm text-slate-600">
              Select one or more categories to narrow the list.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {activeFilterCount} active
            </span>
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedCategories.length === 0 ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              No category selected
            </span>
          ) : (
            selectedCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onToggleCategory(category)}
                className="rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] px-3 py-1 text-sm font-medium text-white transition hover:brightness-110"
              >
                {formatCategoryLabel(category)}
              </button>
            ))
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const checked = selectedCategories.includes(category.slug)

            return (
              <label
                key={category.slug}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  checked
                    ? 'border-slate-900 bg-slate-950 text-white shadow-[0_10px_30px_-20px_rgba(15,23,42,0.8)]'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleCategory(category.slug)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>{category.name || formatCategoryLabel(category.slug)}</span>
              </label>
            )
          })}
        </div>

        <ProductSavedViewsPanel
          activeViewId={activeViewId}
          canSaveCurrentView={canSaveCurrentView}
          onApplyView={onApplySavedView}
          onDeleteView={onDeleteSavedView}
          onSaveView={onSaveCurrentView}
          savedViews={savedViews}
        />
      </div>
    </section>
  )
}

export default ProductFilters
