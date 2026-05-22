import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  description: string
  action?: ReactNode
}

function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(240,249,255,0.95)_55%,rgba(255,251,235,0.96)_100%)] p-6 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.45)]">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-amber-200/35 blur-3xl" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Alpha Dashboard
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </div>

        {action ? <div className="relative">{action}</div> : null}
      </div>
    </section>
  )
}

export default PageHeader
