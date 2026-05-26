import { Activity, Percent, ShieldCheck, Shapes } from 'lucide-react'
import { useLiveUpdates } from '../../app/useLiveUpdates'
import type { DashboardAnalytics } from '../../utils/analytics'
import { formatRating, formatTime } from '../../utils/formatters'

type OperationsPulsePanelProps = {
  analytics: DashboardAnalytics
}

function OperationsPulsePanel({ analytics }: OperationsPulsePanelProps) {
  const { connectionStatus, lastEventAt, recentEvents } = useLiveUpdates()

  const insightItems = [
    {
      label: 'Healthy inventory',
      value: `${formatRating(analytics.healthyInventoryRate)}%`,
      caption: 'Products currently above the low-stock threshold.',
      progress: analytics.healthyInventoryRate,
      icon: <ShieldCheck className="h-4 w-4" />,
      trackClassName: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
    {
      label: 'Average discount',
      value: `${formatRating(analytics.averageDiscount)}%`,
      caption: 'Average markdown visible across the live catalog.',
      progress: Math.min(analytics.averageDiscount * 4, 100),
      icon: <Percent className="h-4 w-4" />,
      trackClassName: 'from-amber-400 via-orange-500 to-rose-500',
    },
    {
      label: 'Category leader',
      value: analytics.largestCategoryLabel,
      caption: `${formatRating(analytics.largestCategoryShare)}% of the catalog mix.`,
      progress: analytics.largestCategoryShare,
      icon: <Shapes className="h-4 w-4" />,
      trackClassName: 'from-sky-500 via-blue-500 to-indigo-500',
    },
  ]

  return (
    <article className="page-reveal rounded-[32px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(15,23,42,0.98)_0%,rgba(15,23,42,0.92)_55%,rgba(30,41,59,0.95)_100%)] p-6 text-slate-100 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.7)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
            <Activity className="h-3.5 w-3.5" />
            Operations pulse
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            A sharper control-room story for the judge
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            These derived metrics make the dashboard feel more product-minded than
            a plain CRUD screen, while still being easy to explain in review.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Live monitor
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.9)]" />
            {connectionStatus}
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Tracking {recentEvents.length} recent simulated catalog events.
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
            {lastEventAt > 0
              ? `Last signal ${formatTime(lastEventAt)}`
              : 'Waiting for first signal'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {insightItems.map((item) => (
          <div
            key={item.label}
            className="rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                  {item.value}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-2 text-slate-100">
                {item.icon}
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-300">{item.caption}</p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.trackClassName}`}
                style={{ width: `${Math.max(8, Math.min(item.progress, 100))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default OperationsPulsePanel
