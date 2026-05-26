import { Check, Plus } from 'lucide-react'
import type { Product } from '../../types/product'

type ComparisonCheckboxProps = {
  isSelected: boolean
  product: Product
  onToggle: (product: Product) => void
  showText?: boolean
}

function ComparisonCheckbox({
  isSelected,
  product,
  onToggle,
  showText = false,
}: ComparisonCheckboxProps) {
  const actionLabel = isSelected ? 'Remove from comparison' : 'Add to comparison'

  return (
    <button
      type="button"
      onClick={() => onToggle(product)}
      aria-label={`${actionLabel}: ${product.title}`}
      aria-pressed={isSelected}
      title={actionLabel}
      className={`inline-flex items-center gap-2 rounded-xl px-2.5 py-2 transition ${
        isSelected
          ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
          : 'border border-slate-300 bg-white text-slate-500 hover:border-sky-400 hover:text-sky-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-sky-400 dark:hover:text-sky-300'
      }`}
    >
      {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {showText ? (
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">
          {isSelected ? 'Comparing' : 'Compare'}
        </span>
      ) : null}
    </button>
  )
}

export default ComparisonCheckbox
