import { Bell, Menu, Search } from 'lucide-react'

type TopNavBarProps = {
  onMenuClick: () => void
}

function TopNavBar({ onMenuClick }: TopNavBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-200"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 p-2.5 text-slate-700 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              GS
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Gautam</p>
              <p className="text-xs text-slate-500">Product Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar
