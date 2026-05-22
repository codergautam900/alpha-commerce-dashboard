import type { ProductColumnId } from '../../types/product'
import { PRODUCT_COLUMN_DEFINITIONS } from '../../utils/productColumns'

type ProductColumnCustomizerProps = {
  onReset: () => void
  onToggleColumn: (columnId: ProductColumnId) => void
  visibleColumns: ProductColumnId[]
}

function ProductColumnCustomizer({
  onReset,
  onToggleColumn,
  visibleColumns,
}: ProductColumnCustomizerProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Visible columns</p>
          <p className="mt-1 text-sm text-slate-600">
            Show or hide table columns for the desktop view.
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

      <div className="mt-4 flex flex-wrap gap-3">
        {PRODUCT_COLUMN_DEFINITIONS.map((column) => {
          const checked = visibleColumns.includes(column.id)

          return (
            <label
              key={column.id}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                checked
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={!column.hideable}
                onChange={() => onToggleColumn(column.id)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span>
                {column.label}
                {!column.hideable ? ' (required)' : ''}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default ProductColumnCustomizer
