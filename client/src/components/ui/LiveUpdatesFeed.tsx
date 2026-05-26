import { DollarSign, Package2, Star } from 'lucide-react'
import { useAuth } from '../../app/useAuth'
import { useLiveUpdates } from '../../app/useLiveUpdates'
import { usePublication } from '../../app/usePublication'
import { formatTime } from '../../utils/formatters'

function LiveUpdatesFeed() {
  const { connectionStatus, recentEvents } = useLiveUpdates()
  const { session } = useAuth()
  const { isProductPublished } = usePublication()
  const visibleEvents =
    session?.role === 'admin'
      ? recentEvents
      : recentEvents.filter((event) => isProductPublished(event.productId))

  return (
    <article className="page-reveal rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-700/80 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.94)_100%)] dark:shadow-[0_18px_60px_-28px_rgba(2,6,23,0.86)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
            Mock Socket
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950 dark:text-slate-100">
            Live activity stream
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {visibleEvents.length > 0
              ? `${visibleEvents.length} recent events are being surfaced in real time.`
              : 'The stream will populate as simulated catalog events arrive.'}
          </p>
        </div>

        <div className="space-y-2 text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:!border-emerald-400/25 dark:!bg-[linear-gradient(135deg,rgba(6,78,59,0.78),rgba(20,83,45,0.88))] dark:!text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-300" />
            {connectionStatus}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Buffer {visibleEvents.length}/6
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {visibleEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
            Waiting for the first simulated live update event.
          </div>
        ) : (
          visibleEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-2xl bg-slate-50/90 p-4 dark:bg-slate-800/70"
            >
              <div className="rounded-2xl bg-white p-2 text-slate-700 shadow-sm shadow-slate-200/80 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900">
                {getEventIcon(event.kind)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {event.productTitle}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {event.message}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  {formatTime(event.occurredAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  )
}

function getEventIcon(kind: 'stock' | 'rating' | 'price') {
  if (kind === 'stock') {
    return <Package2 className="h-4 w-4" />
  }

  if (kind === 'rating') {
    return <Star className="h-4 w-4" />
  }

  return <DollarSign className="h-4 w-4" />
}

export default LiveUpdatesFeed
