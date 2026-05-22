import type { ReactNode } from 'react'

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
    <section className="page-reveal relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(240,249,255,0.95)_55%,rgba(255,251,235,0.96)_100%)] p-6 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.45)]">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-amber-200/35 blur-3xl" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
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
                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {action ? <div className="relative">{action}</div> : null}
      </div>
    </section>
  )
}

export default PageHeader
