import type { ReactNode } from 'react'

type InfoCardProps = {
  title: string
  value: string
  description: string
  icon?: ReactNode
}

function InfoCard({ title, value, description, icon }: InfoCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.4)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f172a_0%,#1d4ed8_55%,#f59e0b_100%)]" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        {icon ? (
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 shadow-inner shadow-white">
            {icon}
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-slate-600">{description}</p>
    </article>
  )
}

export default InfoCard
