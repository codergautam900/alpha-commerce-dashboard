import { memo } from 'react'
import clsx from 'clsx'

type ProductStockBadgeProps = {
  label: string
  tone: 'success' | 'warning' | 'danger'
}

function ProductStockBadge({ label, tone }: ProductStockBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-center text-xs font-semibold',
        tone === 'success' &&
          'border-emerald-200 bg-emerald-100 text-emerald-700 dark:!border-emerald-400/30 dark:!bg-emerald-500/15 dark:!text-emerald-100',
        tone === 'warning' &&
          'border-amber-200 bg-amber-100 text-amber-700 dark:!border-amber-400/30 dark:!bg-amber-500/15 dark:!text-amber-100',
        tone === 'danger' &&
          'border-rose-200 bg-rose-100 text-rose-700 dark:!border-rose-400/30 dark:!bg-rose-500/15 dark:!text-rose-100',
      )}
    >
      {label}
    </span>
  )
}

export default memo(ProductStockBadge)
