import { Link } from 'react-router-dom'
import BrandMark from '../components/ui/BrandMark'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass-panel w-full max-w-xl rounded-[36px] border border-white/75 p-8 text-center shadow-[0_28px_80px_-40px_rgba(15,23,42,0.48)]">
        <div className="flex justify-center">
          <BrandMark size="md" subtitle="Premium Ops" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The route you opened does not exist or is no longer available. Head back
          to the dashboard and continue with the product workspace.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Go to dashboard
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
