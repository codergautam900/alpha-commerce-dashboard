import clsx from 'clsx'
import { useId } from 'react'

type BrandMarkProps = {
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  tone?: 'light' | 'dark'
  subtitle?: string
}

const sizeClasses = {
  sm: {
    icon: 'h-10 w-10',
    title: 'text-base',
    subtitle: 'text-[11px]',
  },
  md: {
    icon: 'h-12 w-12',
    title: 'text-lg',
    subtitle: 'text-xs',
  },
  lg: {
    icon: 'h-14 w-14',
    title: 'text-xl',
    subtitle: 'text-sm',
  },
}

function BrandMark({
  size = 'md',
  showWordmark = true,
  tone = 'light',
  subtitle = 'Control Room',
}: BrandMarkProps) {
  // Multiple brand marks can appear on the same screen, so each instance needs
  // its own SVG ids to avoid gradient collisions in the DOM.
  const gradientIdPrefix = useId()
  const backgroundId = `${gradientIdPrefix}-bg`
  const lineId = `${gradientIdPrefix}-line`
  const glowId = `${gradientIdPrefix}-glow`
  const palette =
    tone === 'dark'
      ? {
          title: 'text-white',
          subtitle: 'text-slate-400',
        }
      : {
          title: 'text-slate-950',
          subtitle: 'text-slate-500',
        }
  const classes = sizeClasses[size]

  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 64 64"
        className={clsx(
          classes.icon,
          'shrink-0 drop-shadow-[0_18px_28px_rgba(8,15,31,0.28)]',
        )}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={backgroundId} x1="12" y1="10" x2="56" y2="58">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="55%" stopColor="#153B8A" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id={lineId} x1="18" y1="18" x2="48" y2="46">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="52%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <radialGradient
            id={glowId}
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(47 17) rotate(90) scale(10)"
          >
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
        </defs>

        <rect x="4" y="4" width="56" height="56" rx="18" fill={`url(#${backgroundId})`} />
        <path
          d="M20 45.5 31.7 17.5 43.5 45.5"
          stroke={`url(#${lineId})`}
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.5 34.5H38.2"
          stroke={`url(#${lineId})`}
          strokeWidth="4.4"
          strokeLinecap="round"
        />
        <circle cx="47" cy="17" r="5.5" fill={`url(#${glowId})`} />
        <circle cx="47" cy="17" r="2.2" fill="#FFF7ED" />
      </svg>

      {showWordmark ? (
        <div className="min-w-0">
          <p className={clsx(classes.title, 'font-semibold tracking-tight', palette.title)}>
            Alpha
          </p>
          <p
            className={clsx(
              classes.subtitle,
              'uppercase tracking-[0.28em]',
              palette.subtitle,
            )}
          >
            {subtitle}
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default BrandMark
