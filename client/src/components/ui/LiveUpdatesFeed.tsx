import { DollarSign, Package2, Star } from 'lucide-react'
import { useLiveUpdates } from '../../app/useLiveUpdates'
import { formatTime } from '../../utils/formatters'

function LiveUpdatesFeed() {
  const { connectionStatus, recentEvents } = useLiveUpdates()

  return (
    <article className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
            Mock Socket
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Live activity stream
          </h2>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {connectionStatus}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {recentEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Waiting for the first simulated live update event.
          </div>
        ) : (
          recentEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-2xl bg-slate-50/90 p-4"
            >
              <div className="rounded-2xl bg-white p-2 text-slate-700 shadow-sm shadow-slate-200/80">
                {getEventIcon(event.kind)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {event.productTitle}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {event.message}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
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
