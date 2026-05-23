import type { ReactNode } from 'react'
import BrandMark from './BrandMark'

type PageHeaderMetaItem = {
  label: string
  value: string
}

type PageHeaderProps = {
  title: string
  description: string
  action?: ReactNode
  eyebrow?: string
  metaItems?: PageHeaderMetaItem[]
}

function PageHeader({
  title,
  description,
  action,
  eyebrow = 'Alpha Dashboard',
  metaItems = [],
}: PageHeaderProps) {
  return (
    <section className="page-reveal glass-panel relative overflow-hidden rounded-[36px] border border-white/75 p-6 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.48)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.26),transparent_24rem),radial-gradient(circle_at_bottom_left,rgba(252,211,77,0.16),transparent_18rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_14px_32px_-22px_rgba(15,23,42,0.8)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            {description}
          </p>

          {metaItems.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {metaItems.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.35)] backdrop-blur"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div className="rounded-[26px] border border-white/70 bg-white/75 p-3 shadow-[0_18px_38px_-26px_rgba(15,23,42,0.42)]">
            <BrandMark size="sm" subtitle="Premium Ops" />
          </div>
          {action ? <div className="relative">{action}</div> : null}
        </div>
      </div>
    </section>
  )
}

export default PageHeader
