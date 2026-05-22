import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import type { ProductColumnId } from '../../types/product'
import { PRODUCT_COLUMN_DEFINITIONS } from '../../utils/productColumns'

type ProductColumnCustomizerProps = {
  onMoveColumn: (columnId: ProductColumnId, direction: 'left' | 'right') => void
  onReset: () => void
  onToggleColumn: (columnId: ProductColumnId) => void
  orderedColumns: ProductColumnId[]
  visibleColumns: ProductColumnId[]
}

function ProductColumnCustomizer({
  onMoveColumn,
  onReset,
  onToggleColumn,
  orderedColumns,
  visibleColumns,
}: ProductColumnCustomizerProps) {
  return (
    <div className="page-reveal rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.95))] p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.4)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-700">
            Table Controls
          </p>
          <p className="mt-2 text-base font-semibold text-slate-950">
            Visible columns and order
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Show, hide, and reorder the desktop table columns.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Reset columns
        </button>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {orderedColumns.map((columnId, index) => {
          const column = PRODUCT_COLUMN_DEFINITIONS.find(
            (currentColumn) => currentColumn.id === columnId,
          )

          if (!column) {
            return null
          }

          const checked = visibleColumns.includes(column.id)

          return (
            <div
              key={column.id}
              className={`rounded-2xl border px-4 py-3 transition ${
                checked
                  ? 'border-slate-900 bg-slate-950 text-white'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">{column.label}</p>
                  <p
                    className={`mt-1 text-xs uppercase tracking-[0.2em] ${
                      checked ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    Position {index + 1}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleColumn(column.id)}
                  disabled={!column.hideable}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    checked
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-100 text-slate-700'
                  } ${!column.hideable ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  {checked ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  {checked ? 'Shown' : 'Hidden'}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p
                  className={`text-sm ${checked ? 'text-slate-300' : 'text-slate-500'}`}
                >
                  {column.hideable
                    ? 'Use arrows to reorder this column.'
                    : 'Core product column stays visible.'}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onMoveColumn(column.id, 'left')}
                    disabled={index === 0}
                    className="rounded-xl border border-current/15 bg-white/10 p-2 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Move ${column.label} left`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMoveColumn(column.id, 'right')}
                    disabled={index === orderedColumns.length - 1}
                    className="rounded-xl border border-current/15 bg-white/10 p-2 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Move ${column.label} right`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductColumnCustomizer
