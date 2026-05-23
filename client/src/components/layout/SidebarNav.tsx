import clsx from 'clsx'
import { PanelLeftClose, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import BrandMark from '../ui/BrandMark'
import ChromeButton from '../ui/ChromeButton'
import StatusBadge from '../ui/StatusBadge'

type SidebarNavProps = {
  onNavigate?: () => void
}

function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <aside className="relative flex h-full flex-col overflow-hidden border-r border-slate-800/70 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_18rem),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_20rem),linear-gradient(180deg,#060d1d_0%,#0a1327_42%,#111827_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_24%,transparent_76%,rgba(255,255,255,0.04))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      </div>

      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div className="space-y-4">
          <BrandMark size="lg" tone="dark" subtitle="Premium Ops" />

          <div className="flex flex-wrap gap-2">
            <StatusBadge className="text-[11px] tracking-[0.22em]" tone="sky">
              Live catalog
            </StatusBadge>
            <StatusBadge className="text-[11px] tracking-[0.22em]" tone="amber">
              Premium UI
            </StatusBadge>
          </div>

          <p className="max-w-[15rem] text-sm leading-6 text-slate-400">
            Commerce analytics, saved views, live activity, and stock-aware product
            operations in one polished workspace.
          </p>
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
          {navigationItems.map(({ icon: Icon, label, to, badge }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  clsx(
                    'group flex items-center justify-between rounded-[22px] px-4 py-3 text-sm font-medium transition duration-300',
                    isActive
                      ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(219,234,254,0.96)_54%,rgba(254,249,195,0.94)_100%)] text-slate-950 shadow-[0_22px_40px_-26px_rgba(15,23,42,0.9)]'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white',
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
                            ? 'text-slate-950'
                            : 'text-slate-400 group-hover:text-white',
                        )}
                      />
                      {label}
                    </span>
                    {badge ? (
                      <span
                        className={clsx(
                          'rounded-full px-2 py-0.5 text-xs',
                          isActive
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-slate-800/90 text-slate-300',
                        )}
                      >
                        {badge}
                      </span>
                    ) : null}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative border-t border-white/10 px-5 py-5">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-2 text-amber-200">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Delivery checklist</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Final polish active
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Core flows, analytics, URL sync, live updates, column controls, and
            checkout math are wired into one cohesive experience.
          </p>

          <div className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            <span>Readiness</span>
            <span>88%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[88%] rounded-full bg-[linear-gradient(90deg,#38bdf8_0%,#60a5fa_45%,#f59e0b_100%)]" />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidebarNav
