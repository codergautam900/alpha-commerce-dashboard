import { Bell, Menu, Search } from 'lucide-react'
import { useLiveUpdates } from '../../app/useLiveUpdates'

type TopNavBarProps = {
  onMenuClick: () => void
}

function TopNavBar({ onMenuClick }: TopNavBarProps) {
  const { connectionStatus } = useLiveUpdates()

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-2xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search products, categories, or reports"
            className="w-full rounded-2xl border border-white/70 bg-white/70 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none shadow-[0_10px_30px_-20px_rgba(15,23,42,0.45)] transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 lg:inline-flex lg:items-center lg:gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {connectionStatus}
          </div>

          <button
            type="button"
            className="rounded-2xl border border-white/70 bg-white/75 p-2.5 text-slate-700 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.4)] transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-3 py-2 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.5)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] text-sm font-semibold text-white">
              GS
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Gautam</p>
              <p className="text-xs text-slate-500">Product Operations</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar
