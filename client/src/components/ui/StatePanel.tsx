import type { ReactNode } from 'react'
import clsx from 'clsx'

type StatePanelProps = {
  title: string
  description: string
  action?: ReactNode
  tone?: 'default' | 'error'
}

function StatePanel({
  title,
  description,
  action,
  tone = 'default',
}: StatePanelProps) {
  return (
    <div
      className={clsx(
        'rounded-3xl border p-8 shadow-sm',
        tone === 'error'
          ? 'border-rose-200 bg-rose-50 text-rose-950 shadow-rose-100/80'
          : 'border-slate-200 bg-white text-slate-950 shadow-slate-200/60',
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p
        className={clsx(
          'mt-3 max-w-2xl text-sm leading-6',
          tone === 'error' ? 'text-rose-700' : 'text-slate-600',
        )}
      >
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

export default StatePanel
