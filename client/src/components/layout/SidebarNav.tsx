import clsx from 'clsx'
import { PanelLeftClose, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../app/useAuth'
import { getNavigationItems } from '../../data/navigation'
import BrandMark from '../ui/BrandMark'
import ChromeButton from '../ui/ChromeButton'
import StatusBadge from '../ui/StatusBadge'

type SidebarNavProps = {
  onNavigate?: () => void
}

function SidebarNav({ onNavigate }: SidebarNavProps) {
  const { session } = useAuth()
  const navigationItems = getNavigationItems(session?.role ?? 'user')

  return (
    <aside className="relative flex h-full flex-col overflow-hidden border-r border-slate-800/70 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_18rem),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_20rem),linear-gradient(180deg,#060d1d_0%,#0a1327_42%,#111827_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_24%,transparent_76%,rgba(255,255,255,0.04))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      </div>

      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div className="space-y-3">
          <BrandMark size="lg" tone="dark" subtitle="Premium Ops" />
          <p className="text-sm text-slate-400">Dashboard navigation</p>
        </div>

        <ChromeButton
          onClick={onNavigate}
          className="rounded-full md:hidden"
          aria-label="Close sidebar"
          iconOnly
          tone="dark"
        >
          <PanelLeftClose className="h-4 w-4" />
        </ChromeButton>
      </div>

      <nav className="relative flex-1 px-3 py-6">
        <ul className="space-y-1.5">
          {navigationItems.map(({ icon: Icon, label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  clsx(
                    'group flex items-center justify-between rounded-[22px] px-4 py-3 text-sm font-medium transition duration-300',
                    isActive
                      ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(219,234,254,0.96)_54%,rgba(254,249,195,0.94)_100%)] text-slate-950 shadow-[0_22px_40px_-26px_rgba(15,23,42,0.9)] dark:bg-[linear-gradient(135deg,rgba(30,41,59,0.92)_0%,rgba(30,58,138,0.88)_54%,rgba(120,90,40,0.85)_100%)] dark:text-slate-100'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-3">
                      <Icon
                        className={clsx(
                          'h-4 w-4 transition',
                          isActive
                            ? 'text-slate-950 dark:text-slate-100'
                            : 'text-slate-400 group-hover:text-white dark:text-slate-600 dark:group-hover:text-slate-300',
                        )}
                      />
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative border-t border-white/10 px-4 py-4">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-2 text-sky-200">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Workspace ready</p>
              <p className="text-xs text-slate-400">Clean, focused navigation</p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Jump between dashboard insights and products without losing the premium
            app feel.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge className="text-[11px] tracking-[0.2em]" tone="sky">
              Fast nav
            </StatusBadge>
            <StatusBadge className="text-[11px] tracking-[0.2em]" tone="amber">
              Smooth UI
            </StatusBadge>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidebarNav
