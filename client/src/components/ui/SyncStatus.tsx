import { RefreshCcw } from 'lucide-react'
import { useLiveUpdates } from '../../app/useLiveUpdates'
import { formatTime } from '../../utils/formatters'

type SyncStatusProps = {
  isRefreshing: boolean
  lastUpdatedAt: number
  onRefresh: () => void
}

function SyncStatus({
  isRefreshing,
  lastUpdatedAt,
  onRefresh,
}: SyncStatusProps) {
  const { connectionStatus, lastEventAt } = useLiveUpdates()
  const syncLabel =
    lastUpdatedAt > 0 ? `Last synced at ${formatTime(lastUpdatedAt)}` : 'Waiting for first sync'

  return (
    <div className="page-reveal rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(236,253,245,0.96)_100%)] p-5 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.45)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {connectionStatus}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Polling + mock socket
            </span>
          </div>

          <p className="mt-3 text-base font-semibold text-slate-950">Live refresh</p>
          <p className="mt-1 text-sm text-slate-600">
            {isRefreshing ? 'Refreshing catalog data...' : syncLabel}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
            {lastEventAt > 0
              ? `Last live event at ${formatTime(lastEventAt)}`
              : 'Waiting for the first simulated event'}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/80">
            <div
              className={`h-full rounded-full bg-[linear-gradient(90deg,#10b981_0%,#0ea5e9_100%)] transition-all duration-500 ${
                isRefreshing ? 'w-11/12' : 'w-3/4'
              }`}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh now
        </button>
      </div>
    </div>
  )
}

export default SyncStatus
