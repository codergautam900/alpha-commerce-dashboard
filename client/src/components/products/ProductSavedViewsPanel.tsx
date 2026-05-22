import { BookmarkPlus, Star, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ProductSavedView } from '../../types/product'
import { formatCategoryLabel } from '../../utils/formatters'
import { PRODUCT_SORT_OPTIONS } from '../../utils/products'

type ProductSavedViewsPanelProps = {
  activeViewId: string | null
  canSaveCurrentView: boolean
  onApplyView: (queryString: string) => void
  onDeleteView: (viewId: string) => void
  onSaveView: (name: string) => void
  savedViews: ProductSavedView[]
}

function ProductSavedViewsPanel({
  activeViewId,
  canSaveCurrentView,
  onApplyView,
  onDeleteView,
  onSaveView,
  savedViews,
}: ProductSavedViewsPanelProps) {
  const [draftName, setDraftName] = useState('')
  const [isComposerOpen, setIsComposerOpen] = useState(false)

  const sortLabelMap = useMemo(
    () =>
      new Map(PRODUCT_SORT_OPTIONS.map((option) => [option.value, option.label])),
    [],
  )

  const handleSave = () => {
    if (!draftName.trim()) {
      return
    }

    onSaveView(draftName)
    setDraftName('')
    setIsComposerOpen(false)
  }

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Saved Views
          </p>
          <h3 className="mt-2 text-base font-semibold text-slate-950">
            Reopen common catalog setups instantly
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Saved views are built directly from the current URL-synced filters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsComposerOpen((currentValue) => !currentValue)}
          disabled={!canSaveCurrentView}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BookmarkPlus className="h-4 w-4" />
          Save current view
        </button>
      </div>

      {isComposerOpen ? (
        <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <input
              type="text"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              placeholder="Example: Top-rated beauty products"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={!draftName.trim()}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save view
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraftName('')
                  setIsComposerOpen(false)
                }}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 xl:grid-cols-3">
        {savedViews.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600 xl:col-span-3">
            Save one or two smart filter combinations here so reviewers can see
            thoughtful workflows, not just a raw table.
          </div>
        ) : (
          savedViews.map((view) => {
            const isActive = view.id === activeViewId

            return (
              <div
                key={view.id}
                className={`rounded-[24px] border p-4 transition ${
                  isActive
                    ? 'border-slate-900 bg-slate-950 text-white shadow-[0_16px_36px_-24px_rgba(15,23,42,0.75)]'
                    : 'border-slate-200 bg-slate-50 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{view.name}</p>
                      {isActive ? (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                          Active
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={`mt-2 text-sm leading-6 ${
                        isActive ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {summarizeSavedView(view.queryString, sortLabelMap)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteView(view.id)}
                    className={`rounded-full p-2 transition ${
                      isActive
                        ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                        : 'text-slate-400 hover:bg-white hover:text-slate-700'
                    }`}
                    aria-label={`Delete ${view.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyView(view.queryString)}
                  className={`mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white/10 text-white hover:bg-white/15'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Star className="h-4 w-4" />
                  Open view
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

function summarizeSavedView(
  queryString: string,
  sortLabelMap: Map<string, string>,
) {
  const searchParams = new URLSearchParams(queryString)
  const parts: string[] = []

  const search = searchParams.get('search')
  if (search) {
    parts.push(`Search: ${search}`)
  }

  const categories = searchParams.get('categories')
  if (categories) {
    const categoryLabels = categories
      .split(',')
      .slice(0, 2)
      .map((category) => formatCategoryLabel(category))

    parts.push(
      categoryLabels.length === 1
        ? categoryLabels[0]
        : `${categoryLabels.join(', ')}${categories.split(',').length > 2 ? ' +' : ''}`,
    )
  }

  const sort = searchParams.get('sort')
  if (sort) {
    parts.push(sortLabelMap.get(sort) ?? sort)
  }

  return parts.length > 0 ? parts.join(' • ') : 'Default catalog view'
}

export default ProductSavedViewsPanel
