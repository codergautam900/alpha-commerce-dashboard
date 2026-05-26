import clsx from 'clsx'
import { memo } from 'react'
import type { ReactNode } from 'react'

type StatusBadgeTone = 'amber' | 'dark' | 'emerald' | 'neutral' | 'sky'

type StatusBadgeProps = {
  children: ReactNode
  className?: string
  showDot?: boolean
  tone?: StatusBadgeTone
}

const badgeToneClasses: Record<StatusBadgeTone, string> = {
  amber:
    'border border-amber-300/25 bg-amber-300/10 text-amber-100 dark:!border-amber-200/35 dark:!bg-[linear-gradient(135deg,rgba(180,83,9,0.45),rgba(146,64,14,0.62))] dark:!text-amber-50',
  dark: 'bg-slate-900 text-white dark:!bg-slate-200 dark:!text-slate-950',
  emerald:
    'border border-emerald-200/80 bg-[linear-gradient(135deg,rgba(240,253,250,0.9),rgba(220,252,231,0.92))] text-emerald-700 dark:!border-emerald-300/35 dark:!bg-[linear-gradient(135deg,rgba(5,150,105,0.34),rgba(22,163,74,0.26))] dark:!text-emerald-50',
  neutral: 'bg-slate-100 text-slate-700 dark:!bg-slate-800 dark:!text-slate-100',
  sky: 'border border-sky-400/30 bg-sky-400/10 text-sky-200 dark:!border-sky-300/35 dark:!bg-[linear-gradient(135deg,rgba(14,116,144,0.42),rgba(37,99,235,0.28))] dark:!text-sky-50',
}

const dotToneClasses: Record<StatusBadgeTone, string> = {
  amber: 'bg-amber-300 dark:bg-amber-100',
  dark: 'bg-white/80',
  emerald: 'bg-emerald-500 dark:bg-emerald-100',
  neutral: 'bg-slate-500 dark:bg-slate-200',
  sky: 'bg-sky-300 dark:bg-sky-100',
}

function StatusBadge({
  children,
  className,
  showDot = false,
  tone = 'neutral',
}: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
        badgeToneClasses[tone],
        className,
      )}
    >
      {showDot ? (
        <span className={clsx('h-2 w-2 rounded-full', dotToneClasses[tone])} />
      ) : null}
      {children}
    </span>
  )
}

export default memo(StatusBadge)
