import { useEffect, useState } from 'react'
import { ArrowUpDown, History, Search, Star, X } from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce'
import { useRecentSearches } from '../../hooks/useRecentSearches'
import type {
  ProductCategory,
  ProductRatingFilterValue,
  ProductSavedView,
  ProductSortValue,
} from '../../types/product'
import { formatCategoryLabel } from '../../utils/formatters'
import {
  PRODUCT_RATING_FILTER_OPTIONS,
  PRODUCT_SORT_OPTIONS,
} from '../../utils/products'
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
  onRatingChange: (value: ProductRatingFilterValue | null) => void
  onSaveCurrentView: (name: string) => void
  onSortChange: (value: ProductSortValue) => void
  onToggleCategory: (slug: string) => void
  ratingValue: ProductRatingFilterValue | null
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
  onRatingChange,
  onSaveCurrentView,
  onSortChange,
  onToggleCategory,
  ratingValue,
  savedViews,
  searchValue,
  selectedCategories,
  sortValue,
}: ProductFiltersProps) {
  const [searchInput, setSearchInput] = useState(searchValue)
  const debouncedSearch = useDebounce(searchInput, 400)
  const { addSearch, clearSearches, recentSearches } = useRecentSearches()

  useEffect(() => {
    // Typing stays local and responsive here while the URL remains the source
    // of truth for the actual applied filters.
    const normalizedSearch = debouncedSearch.trim()

    if (normalizedSearch === searchValue) {
      return
    }

    onSearchChange(normalizedSearch)

    if (normalizedSearch) {
      addSearch(normalizedSearch)
    }
  }, [addSearch, debouncedSearch, onSearchChange, searchValue])

  const applyRecentSearch = (search: string) => {
    setSearchInput(search)
    onSearchChange(search)
    addSearch(search)
  }

  return (
    <section className="page-reveal rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.96))] p-5 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.4)] dark:border-slate-700/80 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.96))] dark:shadow-[0_18px_60px_-32px_rgba(2,6,23,0.86)]">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_0.75fr]">
        <div className="md:col-span-2 xl:col-span-1">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') {
                  return
                }

                const normalizedSearch = searchInput.trim()

                onSearchChange(normalizedSearch)

                if (normalizedSearch) {
                  addSearch(normalizedSearch)
                }
              }}
              placeholder="Search by name, brand, description, or category"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:bg-slate-900 dark:focus:ring-slate-800"
            />
          </label>

          {recentSearches.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                <History className="h-3.5 w-3.5" />
                Recent
              </span>
              {recentSearches.slice(0, 5).map((search) => (
                <button
                  key={search}
                  type="button"
                  onClick={() => applyRecentSearch(search)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-sky-400 dark:hover:text-sky-300"
                >
                  {search}
                </button>
              ))}
              <button
                type="button"
                onClick={clearSearches}
                className="text-xs font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Clear history
              </button>
            </div>
          ) : null}
        </div>

        <label className="relative block">
          <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={sortValue}
            onChange={(event) => onSortChange(event.target.value as ProductSortValue)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:bg-slate-900 dark:focus:ring-slate-800"
          >
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="relative block">
          <Star className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
          <select
            value={ratingValue ? String(ratingValue) : ''}
            onChange={(event) =>
              onRatingChange(
                event.target.value
                  ? (Number(event.target.value) as ProductRatingFilterValue)
                  : null,
              )
            }
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:bg-slate-900 dark:focus:ring-slate-800"
          >
            {PRODUCT_RATING_FILTER_OPTIONS.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 dark:border-slate-700/80">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              Filter Studio
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950 dark:text-slate-100">
              Category filters
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Select one or more categories to narrow the list.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {activeFilterCount} active
            </span>
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedCategories.length === 0 ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400">
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

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {categories.map((category) => {
            const checked = selectedCategories.includes(category.slug)

            return (
              <label
                key={category.slug}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  checked
                    ? 'border-slate-900 bg-slate-950 text-white shadow-[0_10px_30px_-20px_rgba(15,23,42,0.8)]'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800'
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
