import { useState, useEffect } from 'react'
import { ArrowRight, Zap, BarChart3, Layers, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandMark from '../components/ui/BrandMark'

export function WelcomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time product management with instant updates',
      color: 'from-sky-400 to-blue-600',
    },
    {
      icon: BarChart3,
      title: 'Rich Analytics',
      description: 'Beautiful charts and insights at your fingertips',
      color: 'from-emerald-400 to-green-600',
    },
    {
      icon: Layers,
      title: 'Powerful Tools',
      description: 'Advanced filtering, search, and customization',
      color: 'from-amber-400 to-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <BrandMark size="sm" subtitle="Premium Ops" />
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-blue-500/30 dark:shadow-blue-600/20"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Main Content */}
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-sky-200/50 bg-sky-50/50 px-4 py-2 backdrop-blur-sm dark:border-sky-400/20 dark:bg-sky-950/20">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Enterprise-Grade Dashboard
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-100 sm:text-6xl lg:text-7xl">
              Product Operations
              <span className="block bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              Manage products, track inventory, analyze trends, and collaborate in real-time. 
              Built for modern product teams that move fast.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-xl hover:shadow-blue-500/30 dark:shadow-blue-600/20"
              >
                Launch Dashboard
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 pt-12 dark:border-slate-800">
              {[
                { label: 'Products', value: '1000+' },
                { label: 'Features', value: '15+' },
                { label: 'Uptime', value: '99.9%' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-slate-950 dark:text-slate-100">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div
            className={`mt-16 transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-400/20 to-blue-600/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/50 p-8 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/30">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-950 dark:text-slate-100">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Everything you need to manage products like a pro
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-700 delay-${index * 100} group rounded-2xl border border-slate-200/50 bg-white/80 p-8 backdrop-blur hover:border-slate-300 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-900/50 dark:hover:border-slate-600 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <div
                    className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white transition group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-950 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Why Teams Love Alpha</h2>
            <p className="text-lg text-slate-300">Designed for productivity. Built for scale.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: 'Smart Search',
                description: 'Find any product in milliseconds with intelligent filtering',
              },
              {
                title: 'Live Updates',
                description: 'Real-time synchronization across all your devices',
              },
              {
                title: 'Analytics Ready',
                description: 'Beautiful charts and actionable insights built-in',
              },
              {
                title: 'Fully Responsive',
                description: 'Perfect experience on desktop, tablet, and mobile',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <Star className="h-6 w-6 flex-shrink-0 text-amber-400" />
                <div>
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <p className="text-slate-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-950 dark:text-slate-100">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-xl text-slate-600 dark:text-slate-400">
            Experience the future of product management today
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:shadow-lg hover:shadow-blue-500/30"
          >
            Launch Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © 2026 Alpha Dashboard. Built for modern product teams.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default WelcomePage
