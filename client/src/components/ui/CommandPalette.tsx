import { Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/useAuth'
import { getNavigationItems } from '../../data/navigation'

type CommandPaletteProps = {
  isOpen: boolean
  onClose: () => void
}

type CommandAction = {
  id: string
  keywords: string[]
  subtitle: string
  title: string
  to: string
}

function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { session } = useAuth()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigationItems = getNavigationItems(session?.role ?? 'user')

  const actions = useMemo<CommandAction[]>(
    () => [
      ...navigationItems.map((item) => ({
        id: item.to,
        keywords: [item.label.toLowerCase(), item.to],
        subtitle: `Open the ${item.label.toLowerCase()} workspace.`,
        title: item.label,
        to: item.to,
      })),
      {
        id: 'products-rating',
        keywords: ['products rating reviews best top'],
        subtitle: 'Open the catalog sorted by highest rating first.',
        title: 'Top Rated Products',
        to: '/products?sort=rating-desc',
      },
      {
        id: 'products-price',
        keywords: ['products expensive price revenue premium'],
        subtitle: 'Open the catalog sorted by highest price first.',
        title: 'Highest Price Products',
        to: '/products?sort=price-desc',
      },
      {
        id: 'products-reset',
        keywords: ['products clear filters reset all'],
        subtitle: 'Open the products page with a clean default view.',
        title: 'Reset Product Filters',
        to: '/products',
      },
    ],
    [navigationItems],
  )

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return actions
    }

    return actions.filter((action) =>
      [action.title, action.subtitle, ...action.keywords]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [actions, query])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleClose = () => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
  }

  const handleSubmit = (action: CommandAction | undefined) => {
    if (!action) {
      return
    }

    navigate(action.to)
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/50 px-4 py-20 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={handleClose}
        aria-label="Close command palette"
      />

      <div className="page-reveal relative z-10 w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.55)] backdrop-blur dark:border-slate-700/80 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.98)_100%)] dark:shadow-[0_30px_80px_-36px_rgba(2,6,23,0.9)]">
        <div className="flex items-center gap-3 border-b border-slate-200/80 px-5 py-4 dark:border-slate-700/80">
          <div className="rounded-2xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Search className="h-4 w-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                handleClose()
                return
              }

              if (event.key === 'ArrowDown') {
                if (filteredActions.length === 0) {
                  return
                }

                event.preventDefault()
                setSelectedIndex((currentIndex) =>
                  Math.min(currentIndex + 1, filteredActions.length - 1),
                )
                return
              }

              if (event.key === 'ArrowUp') {
                if (filteredActions.length === 0) {
                  return
                }

                event.preventDefault()
                setSelectedIndex((currentIndex) => Math.max(currentIndex - 1, 0))
                return
              }

              if (event.key === 'Enter') {
                event.preventDefault()
                handleSubmit(filteredActions[selectedIndex])
              }
            }}
            placeholder="Jump to a page or quick catalog action"
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-600"
          />

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Esc
          </span>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-3">
          {filteredActions.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
              No matching commands found. Try searching for dashboard, products, or
              rating.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredActions.map((action, index) => {
                const isSelected = index === selectedIndex
                const isCurrentRoute =
                  `${location.pathname}${location.search}` === action.to

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleSubmit(action)}
                    className={`flex w-full items-start justify-between gap-4 rounded-[24px] px-4 py-4 text-left transition ${
                      isSelected
                        ? 'bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] text-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)]'
                        : 'bg-slate-50 text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{action.title}</p>
                      <p
                        className={`mt-1 text-sm ${
                          isSelected ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {action.subtitle}
                      </p>
                    </div>

                    {isCurrentRoute ? (
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                          isSelected
                            ? 'bg-white/10 text-white'
                            : 'bg-white text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        Current
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
