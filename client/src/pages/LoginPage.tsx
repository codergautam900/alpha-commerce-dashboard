import type { ReactNode } from 'react'
import { ArrowRight, CheckCircle2, Shield, UserRound } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../app/useAuth'
import BrandMark from '../components/ui/BrandMark'
import { DEMO_PROFILES, getHomeRouteForRole, type UserRole } from '../types/auth'

type LocationState = {
  from?: {
    pathname?: string
  }
}

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, session, signInAsRole } = useAuth()

  if (isAuthenticated && session) {
    return <Navigate to={getHomeRouteForRole(session.role)} replace />
  }

  const redirectState = location.state as LocationState | null

  const handleSignIn = (role: UserRole) => {
    signInAsRole(role)
    navigate(resolvePostLoginRoute(role, redirectState?.from?.pathname), { replace: true })
  }

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
                Role Based Review
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                Sign in as admin or reviewer to test the complete assessment flow.
              </h1>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                Admins can reach analytics and toggle product visibility. Reviewers are
                limited to published products across the catalog and detail pages.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <FeatureTile label="Roles" value="2 profiles" />
              <FeatureTile label="Visibility" value="Published only" />
              <FeatureTile label="Access" value="Route guarded" />
            </div>
          </div>
        </section>

        <section className="glass-panel p-8 sm:p-10">
          <div className="lg:hidden">
            <BrandMark size="md" subtitle="Premium Ops" />
          </div>

          <div className="mt-8 lg:mt-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Alpha Access
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Choose a demo profile
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This assessment uses client-side demo accounts so the deployed app stays
              easy to review without backend setup.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            <ProfileCard
              capabilityCopy="Access analytics, full catalog, and publish/hide controls."
              email={DEMO_PROFILES.admin.email}
              icon={<Shield className="h-5 w-5" />}
              password={DEMO_PROFILES.admin.password}
              title="Admin View"
              onSelect={() => handleSignIn('admin')}
            />
            <ProfileCard
              capabilityCopy="See only published products in listing and detail views."
              email={DEMO_PROFILES.user.email}
              icon={<UserRound className="h-5 w-5" />}
              password={DEMO_PROFILES.user.password}
              title="User View"
              onSelect={() => handleSignIn('user')}
            />
          </div>

          <div className="mt-8 rounded-[24px] border border-slate-200/80 bg-white/70 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Review shortcut</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A few products start hidden by default so the admin and user experiences
                  differ immediately during review.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

type FeatureTileProps = {
  label: string
  value: string
}

function FeatureTile({ label, value }: FeatureTileProps) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  )
}

type ProfileCardProps = {
  capabilityCopy: string
  email: string
  icon: ReactNode
  password: string
  title: string
  onSelect: () => void
}

function ProfileCard({
  capabilityCopy,
  email,
  icon,
  password,
  title,
  onSelect,
}: ProfileCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-slate-950 p-3 text-white">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{capabilityCopy}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSelect}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#153b8a_54%,#1d4ed8_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_22px_36px_-24px_rgba(29,78,216,0.85)] transition hover:brightness-110"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid gap-3 rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Email
          </p>
          <p className="mt-1 font-medium">{email}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Password
          </p>
          <p className="mt-1 font-medium">{password}</p>
        </div>
      </div>
    </div>
  )
}

function resolvePostLoginRoute(role: UserRole, requestedPathname: string | undefined) {
  if (role === 'admin') {
    return requestedPathname || getHomeRouteForRole(role)
  }

  if (
    requestedPathname === '/products' ||
    requestedPathname?.startsWith('/products/')
  ) {
    return requestedPathname
  }

  return getHomeRouteForRole(role)
}

export default LoginPage
