import { Bell, LogOut, Menu, MoonStar, Search, ShoppingCart, SunMedium } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../app/useAuth'
import { useCart } from '../../app/useCart'
import { useTheme } from '../../app/useTheme'
import { useLiveUpdates } from '../../app/useLiveUpdates'
import { getNavigationItems } from '../../data/navigation'
import BrandMark from '../ui/BrandMark'
import ChromeButton from '../ui/ChromeButton'
import StatusBadge from '../ui/StatusBadge'

type TopNavBarProps = {
  onMenuClick: () => void
  onOpenCommandPalette: () => void
}

function TopNavBar({ onMenuClick, onOpenCommandPalette }: TopNavBarProps) {
  const location = useLocation()
  const { session, signOut } = useAuth()
  const { cartSummary, openCart } = useCart()
  const { isDarkMode, toggleTheme } = useTheme()
  const { connectionStatus } = useLiveUpdates()
  const navigationItems = getNavigationItems(session?.role ?? 'user')
  const activeItem =
    navigationItems.find((item) => location.pathname.startsWith(item.to))?.label ??
    'Workspace'
  const initials =
    session?.displayName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'AA'

  return (
    <header className="sticky top-0 z-20 border-b border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.62))] backdrop-blur-2xl dark:border-slate-800/70 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.88),rgba(15,23,42,0.76))]">
      <div className="mx-auto flex max-w-[92rem] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-2xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 items-center gap-3 xl:flex">
          <BrandMark size="sm" showWordmark={false} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950 dark:text-slate-100">
              Alpha Dashboard
            </p>
            <p className="truncate text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              {activeItem} workspace
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="hidden flex-1 items-center justify-between rounded-[24px] border border-white/70 bg-white/75 px-4 py-3 text-left text-sm text-slate-500 shadow-[0_16px_38px_-24px_rgba(15,23,42,0.42)] transition hover:bg-white dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300 dark:shadow-[0_18px_40px_-30px_rgba(2,6,23,0.9)] dark:hover:bg-slate-900 md:flex"
        >
          <span className="flex items-center gap-3">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            Search pages, views, or quick actions
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Ctrl K
          </span>
        </button>

        <div className="ml-auto flex items-center gap-3">
          <ChromeButton
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <span className="flex items-center gap-2">
              {isDarkMode ? (
                <SunMedium className="h-4 w-4" />
              ) : (
                <MoonStar className="h-4 w-4" />
              )}
              <span className="hidden text-sm font-semibold sm:inline">
                {isDarkMode ? 'Light' : 'Dark'}
              </span>
            </span>
          </ChromeButton>

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
            onClick={signOut}
            aria-label="Sign out"
          >
            <span className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden text-sm font-semibold sm:inline">Logout</span>
            </span>
          </ChromeButton>

          <ChromeButton
            className=""
            aria-label="Notifications"
            iconOnly
          >
            <Bell className="h-4 w-4" />
          </ChromeButton>

          <div className="flex items-center gap-3 rounded-[22px] border border-white/80 bg-white/80 px-3 py-2 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.5)] dark:border-slate-800 dark:bg-slate-950/65 dark:shadow-[0_18px_38px_-30px_rgba(2,6,23,0.88)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_78%,#60a5fa_100%)] text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(29,78,216,0.85)]">
              {initials}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {session?.displayName ?? 'Alpha User'}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {session?.title ?? 'Workspace'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar
