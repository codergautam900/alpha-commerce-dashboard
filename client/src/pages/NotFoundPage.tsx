import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The route you opened does not exist yet. Head back to the dashboard
          and continue building the assignment.
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
