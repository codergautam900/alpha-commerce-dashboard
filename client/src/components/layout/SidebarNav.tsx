import clsx from 'clsx'
import { PanelLeftClose } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'

type SidebarNavProps = {
  onNavigate?: () => void
}

function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            Alpha
          </p>
          <h1 className="mt-2 text-xl font-semibold text-white">Admin Suite</h1>
        </div>

        <button
          type="button"
          onClick={onNavigate}
          className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white md:hidden"
          aria-label="Close sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1.5">
          {navigationItems.map(({ icon: Icon, label, to, badge }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-white text-slate-950 shadow-lg shadow-slate-950/20'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-3">
                      <Icon
                        className={clsx(
                          'h-4 w-4',
                          isActive ? 'text-slate-950' : 'text-slate-400',
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
                            : 'bg-slate-800 text-slate-300',
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

      <div className="border-t border-slate-800 px-5 py-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm font-medium text-white">Assignment Checklist</p>
          <p className="mt-2 text-sm text-slate-400">
            Layout, product listing, detail page, analytics, and URL sync.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default SidebarNav
