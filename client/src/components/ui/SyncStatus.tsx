import { RefreshCcw } from 'lucide-react'
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
  const syncLabel =
    lastUpdatedAt > 0 ? `Last synced at ${formatTime(lastUpdatedAt)}` : 'Waiting for first sync'

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">Live refresh</p>
        <p className="mt-1 text-sm text-slate-600">
          {isRefreshing ? 'Refreshing catalog data...' : syncLabel}
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh now
      </button>
    </div>
  )
}

export default SyncStatus
