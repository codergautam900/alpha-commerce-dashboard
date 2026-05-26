import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

type BreadcrumbItem = {
  label: string
  path?: string
}

type BreadcrumbProps = {
  homeLabel?: string
  homePath?: string
  items: BreadcrumbItem[]
}

function Breadcrumb({
  homeLabel = 'Home',
  homePath = '/',
  items,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link
        to={homePath}
        className="flex items-center gap-1 text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <Home className="h-4 w-4" />
        <span>{homeLabel}</span>
      </Link>

      {items.map((item, index) => (
        <div key={`${item.label}-${item.path ?? index}`} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600" />
          {item.path ? (
            <Link
              to={item.path}
              className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-900 dark:text-slate-200">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
