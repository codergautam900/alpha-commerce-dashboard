import clsx from 'clsx'

type ProductStockBadgeProps = {
  label: string
  tone: 'success' | 'warning' | 'danger'
}

function ProductStockBadge({ label, tone }: ProductStockBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
        tone === 'success' && 'bg-emerald-100 text-emerald-700',
        tone === 'warning' && 'bg-amber-100 text-amber-700',
        tone === 'danger' && 'bg-rose-100 text-rose-700',
      )}
    >
      {label}
    </span>
  )
}

export default ProductStockBadge
