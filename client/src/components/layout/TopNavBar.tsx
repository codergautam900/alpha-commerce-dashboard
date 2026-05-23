import { Bell, Menu, Search, ShoppingCart } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useCart } from '../../app/useCart'
import { useLiveUpdates } from '../../app/useLiveUpdates'
import { navigationItems } from '../../data/navigation'
import BrandMark from '../ui/BrandMark'
import ChromeButton from '../ui/ChromeButton'
import StatusBadge from '../ui/StatusBadge'

type TopNavBarProps = {
  onMenuClick: () => void
  onOpenCommandPalette: () => void
}

function TopNavBar({ onMenuClick, onOpenCommandPalette }: TopNavBarProps) {
  const location = useLocation()
  const { cartSummary, openCart } = useCart()
  const { connectionStatus } = useLiveUpdates()
  const activeItem =
    navigationItems.find((item) => location.pathname.startsWith(item.to))?.label ??
    'Workspace'

  return (
    <header className="sticky top-0 z-20 border-b border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.62))] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[92rem] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-2xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 items-center gap-3 xl:flex">
          <BrandMark size="sm" showWordmark={false} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950">Alpha Dashboard</p>
            <p className="truncate text-xs uppercase tracking-[0.22em] text-slate-500">
              {activeItem} workspace
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="hidden flex-1 items-center justify-between rounded-[24px] border border-white/70 bg-white/75 px-4 py-3 text-left text-sm text-slate-500 shadow-[0_16px_38px_-24px_rgba(15,23,42,0.42)] transition hover:bg-white md:flex"
        >
          <span className="flex items-center gap-3">
            <Search className="h-4 w-4 text-slate-400" />
            Search pages, views, or quick actions
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Ctrl K
          </span>
        </button>

        <div className="ml-auto flex items-center gap-3">
          <ChromeButton
            onClick={onOpenCommandPalette}
            className="bg-white/75 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.4)] md:hidden"
            iconOnly
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4" />
          </ChromeButton>

          <StatusBadge className="hidden lg:inline-flex" showDot tone="emerald">
            {connectionStatus}
          </StatusBadge>

          <ChromeButton
            onClick={openCart}
            className="relative"
            aria-label="Open cart"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden text-sm font-semibold sm:inline">
                Cart
              </span>
            </span>
            {cartSummary.totalUnits > 0 ? (
              <span className="absolute -right-2 -top-2 inline-flex min-w-6 items-center justify-center rounded-full bg-slate-950 px-1.5 py-1 text-[11px] font-semibold text-white">
                {cartSummary.totalUnits}
              </span>
            ) : null}
          </ChromeButton>

          <ChromeButton
            className=""
            aria-label="Notifications"
            iconOnly
          >
            <Bell className="h-4 w-4" />
          </ChromeButton>

          <div className="flex items-center gap-3 rounded-[22px] border border-white/80 bg-white/80 px-3 py-2 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.5)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_78%,#60a5fa_100%)] text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(29,78,216,0.85)]">
              GS
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Gautam</p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Product Operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar
