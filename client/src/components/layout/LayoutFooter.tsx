import BrandMark from '../ui/BrandMark'
import StatusBadge from '../ui/StatusBadge'

function LayoutFooter() {
  const currentYear = new Date().getFullYear()

  const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Documentation', href: '#docs' },
    { label: 'API Reference', href: '#api' },
  ]

  const companyLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
  ]

  const socialLinks = [
    { label: 'Twitter', href: '#twitter', icon: 'X' },
    { label: 'GitHub', href: '#github', icon: 'GH' },
    { label: 'LinkedIn', href: '#linkedin', icon: 'IN' },
    { label: 'Discord', href: '#discord', icon: 'DS' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-[92rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <BrandMark size="md" subtitle="Premium Ops" />
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Modern product operations platform designed for high-performance teams.
              Real-time analytics, catalog management, and live-ready dashboards.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.label}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 px-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-slate-100">
              Product
            </h3>
            <ul className="mt-6 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-slate-100">
              Company
            </h3>
            <ul className="mt-6 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-slate-100">
              Legal
            </h3>
            <ul className="mt-6 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Built with
          </p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="neutral">React 19</StatusBadge>
            <StatusBadge tone="neutral">TypeScript</StatusBadge>
            <StatusBadge tone="neutral">Tailwind CSS</StatusBadge>
            <StatusBadge tone="neutral">DummyJSON API</StatusBadge>
            <StatusBadge tone="neutral">Vite</StatusBadge>
            <StatusBadge tone="neutral">Vercel Ready</StatusBadge>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-[92rem] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Copyright {currentYear} Alpha Dashboard. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Made for product teams.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LayoutFooter
