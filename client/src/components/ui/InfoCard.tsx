import type { ReactNode } from 'react'

type InfoCardProps = {
  title: string
  value: string
  description: string
  icon?: ReactNode
}

function InfoCard({ title, value, description, icon }: InfoCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        {icon ? (
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">{icon}</div>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-slate-600">{description}</p>
    </article>
  )
}

export default InfoCard
