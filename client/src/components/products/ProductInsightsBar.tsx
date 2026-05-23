import { BarChart3, Download, Link2, Package2, Star, Tags } from 'lucide-react'
import { formatCurrency, formatNumber, formatRating } from '../../utils/formatters'

type ProductInsightsBarProps = {
  averagePrice: number
  averageRating: number
  categoryCount: number
  copyStatusLabel: string
  lowStockCount: number
  onCopyViewLink: () => void
  onExportCsv: () => void
  totalResults: number
}

function ProductInsightsBar({
  averagePrice,
  averageRating,
  categoryCount,
  copyStatusLabel,
  lowStockCount,
  onCopyViewLink,
  onExportCsv,
  totalResults,
}: ProductInsightsBarProps) {
  const insightItems = [
    {
      label: 'Filtered results',
      value: formatNumber(totalResults),
      icon: <Package2 className="h-4 w-4" />,
    },
    {
      label: 'Average price',
      value: formatCurrency(averagePrice),
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      label: 'Average rating',
      value: formatRating(averageRating),
      icon: <Star className="h-4 w-4" />,
    },
    {
      label: 'Low stock items',
      value: formatNumber(lowStockCount),
      icon: <Tags className="h-4 w-4" />,
    },
  ]

  return (
    <section className="page-reveal rounded-[32px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(240,249,255,0.95)_100%)] p-5 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.4)] dark:border-slate-700/80 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.96)_100%)] dark:shadow-[0_18px_60px_-32px_rgba(2,6,23,0.86)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Selection Insights
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950 dark:text-slate-100">
            Read the current filtered catalog at a glance
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Useful for demos, QA reviews, and sharing exact workspace context with
            recruiters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onExportCsv}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={onCopyViewLink}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Link2 className="h-4 w-4" />
            {copyStatusLabel}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {insightItems.map((item) => (
          <div
            key={item.label}
            className="rounded-[24px] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.35)] dark:border-slate-700/80 dark:bg-slate-900/75 dark:shadow-[0_14px_32px_-24px_rgba(2,6,23,0.8)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
              <div className="rounded-2xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {item.icon}
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
              {item.value}
            </p>
          </div>
        ))}

        <div className="rounded-[24px] border border-slate-200 bg-slate-950 px-4 py-4 text-white shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)]">
          <p className="text-sm font-medium text-slate-300">Category spread</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">
            {formatNumber(categoryCount)}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            distinct categories in the current filtered result set.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProductInsightsBar
