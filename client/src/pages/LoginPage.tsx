import BrandMark from '../components/ui/BrandMark'

function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-5rem] h-80 w-80 rounded-full bg-amber-200/25 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/70 bg-white/70 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.42)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_16rem),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.2),transparent_18rem),linear-gradient(180deg,#07101f_0%,#0b1730_48%,#13254f_100%)] px-8 py-10 text-white lg:block">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25" />
          <div className="relative">
            <BrandMark size="lg" tone="dark" subtitle="Premium Ops" />

            <div className="mt-16 max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-200">
                Commerce Control Layer
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                Manage products, analytics, and live catalog signals in one place.
              </h1>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                Alpha blends a modern admin dashboard with richer product operations,
                including saved views, URL sync, mock live updates, and stock-aware cart
                calculations.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  Search
                </p>
                <p className="mt-2 text-lg font-semibold">Debounced</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  Views
                </p>
                <p className="mt-2 text-lg font-semibold">Shareable</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  Updates
                </p>
                <p className="mt-2 text-lg font-semibold">Live mock</p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel p-8 sm:p-10">
          <div className="lg:hidden">
            <BrandMark size="md" subtitle="Premium Ops" />
          </div>

          <div className="mt-8 lg:mt-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Alpha Admin
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Sign in to continue
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Temporary access screen for reviewing the layout, routing, and polished UI
              layer of the dashboard.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-[22px] border border-slate-200 bg-white/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-[22px] border border-slate-200 bg-white/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-[22px] bg-[linear-gradient(135deg,#0f172a_0%,#153b8a_54%,#1d4ed8_100%)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_22px_36px_-24px_rgba(29,78,216,0.85)] transition hover:brightness-110"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 rounded-[24px] border border-slate-200/80 bg-white/70 p-4">
            <p className="text-sm font-semibold text-slate-900">Preview notes</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use this screen as the branded entry point for the dashboard while keeping
              the assignment&apos;s focus on product operations and analytics.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
