import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ChromeButtonTone = 'dark' | 'light'

type ChromeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  iconOnly?: boolean
  tone?: ChromeButtonTone
}

const toneClasses: Record<ChromeButtonTone, string> = {
  dark:
    'border border-slate-700 bg-white/5 text-slate-300 hover:border-slate-500 hover:text-white dark:border-slate-600 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]',
  light:
    'border border-white/70 bg-white/[0.78] text-slate-700 shadow-[0_12px_32px_-22px_rgba(15,23,42,0.4)] hover:bg-slate-100 dark:border-slate-700/80 dark:bg-slate-950/70 dark:text-slate-100 dark:shadow-[0_18px_38px_-26px_rgba(2,6,23,0.75)] dark:hover:bg-slate-800/90',
}

function ChromeButton({
  children,
  className,
  iconOnly = false,
  tone = 'light',
  type = 'button',
  ...props
}: ChromeButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'transition',
        iconOnly ? 'rounded-[20px] p-2.5' : 'rounded-[20px] px-3 py-2.5',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default ChromeButton
