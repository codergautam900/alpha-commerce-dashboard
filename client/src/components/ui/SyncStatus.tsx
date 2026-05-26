import { RefreshCcw } from 'lucide-react'
import { useLiveUpdates } from '../../app/useLiveUpdates'
import { formatTime } from '../../utils/formatters'
import ChromeButton from './ChromeButton'
import StatusBadge from './StatusBadge'

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
    <div className="page-reveal rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(236,253,245,0.96)_100%)] p-5 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.45)] dark:border-slate-700/80 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.96)_100%)] dark:shadow-[0_18px_50px_-32px_rgba(2,6,23,0.86)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge showDot tone="emerald">
              {connectionStatus}
            </StatusBadge>
            <StatusBadge tone="dark">
              Polling + mock socket
            </StatusBadge>
          </div>

          <p className="mt-3 text-base font-semibold text-slate-950 dark:text-slate-100">Live refresh</p>
          <p className="mt-1 text-sm text-slate-600">
            {isRefreshing ? 'Refreshing catalog data...' : syncLabel}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
            {lastEventAt > 0
              ? `Last live event at ${formatTime(lastEventAt)}`
              : 'Waiting for the first simulated event'}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/80 dark:bg-slate-800">
            <div
              className={`h-full rounded-full bg-[linear-gradient(90deg,#10b981_0%,#0ea5e9_100%)] transition-all duration-500 ${
                isRefreshing ? 'w-11/12' : 'w-3/4'
              }`}
            />
          </div>
        </div>

        <ChromeButton
          onClick={onRefresh}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-none bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-none hover:bg-slate-800 sm:w-auto"
        >
          <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh now
        </ChromeButton>
      </div>
    </div>
  )
}

export default SyncStatus
