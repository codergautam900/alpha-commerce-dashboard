import BrandMark from '../ui/BrandMark'
import StatusBadge from '../ui/StatusBadge'

function LayoutFooter() {
  return (
    <footer className="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto flex w-full max-w-[92rem] flex-col gap-4 rounded-[32px] border border-white/75 px-5 py-5 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.38)] dark:border-slate-800/70 dark:shadow-[0_28px_64px_-38px_rgba(2,6,23,0.88)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark size="sm" subtitle="Premium Ops" />
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">
              Built for modern product operations
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fast catalog workflows, analytics, and live-ready UI in one place.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <StatusBadge tone="neutral">React + TypeScript</StatusBadge>
          <StatusBadge tone="neutral">DummyJSON API</StatusBadge>
          <StatusBadge tone="neutral">Vercel ready</StatusBadge>
        </div>
      </div>
    </footer>
  )
}

export default LayoutFooter
