import clsx from 'clsx'
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
    'border border-amber-300/20 bg-amber-300/10 text-amber-100 dark:!border-amber-300/30 dark:!bg-amber-300/15 dark:!text-amber-100',
  dark: 'bg-slate-900 text-white dark:!bg-slate-100 dark:!text-slate-900',
  emerald:
    'border border-emerald-200/80 bg-[linear-gradient(135deg,rgba(240,253,250,0.9),rgba(220,252,231,0.92))] text-emerald-700 dark:!border-emerald-400/25 dark:!bg-[linear-gradient(135deg,rgba(6,78,59,0.78),rgba(20,83,45,0.88))] dark:!text-emerald-100',
  neutral: 'bg-slate-100 text-slate-700 dark:!bg-slate-800 dark:!text-slate-200',
  sky: 'border border-sky-400/30 bg-sky-400/10 text-sky-200 dark:!border-sky-300/30 dark:!bg-sky-300/15 dark:!text-sky-100',
}

const dotToneClasses: Record<StatusBadgeTone, string> = {
  amber: 'bg-amber-300',
  dark: 'bg-white/80',
  emerald: 'bg-emerald-500',
  neutral: 'bg-slate-500',
  sky: 'bg-sky-300',
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

export default StatusBadge
