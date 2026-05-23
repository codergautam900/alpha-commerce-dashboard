import type { ReactNode } from 'react'

type InfoCardProps = {
  title: string
  value: string
  description: string
  icon?: ReactNode
}

function InfoCard({ title, value, description, icon }: InfoCardProps) {
  return (
    <article className="page-reveal relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_-38px_rgba(15,23,42,0.42)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f172a_0%,#1d4ed8_55%,#f59e0b_100%)]" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
            {value}
          </p>
        </div>

        {icon ? (
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 shadow-inner shadow-white dark:bg-slate-800 dark:text-slate-300 dark:shadow-slate-900">
            {icon}
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </article>
  )
}

export default InfoCard
