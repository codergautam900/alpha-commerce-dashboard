import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import LayoutFooter from '../components/layout/LayoutFooter'
import SidebarNav from '../components/layout/SidebarNav'
import CartDrawer from '../components/ui/CartDrawer'
import TopNavBar from '../components/layout/TopNavBar'
import CommandPalette from '../components/ui/CommandPalette'

function DashboardLayout() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!sidebarOpen) {
      return
    }

    const scrollY = window.scrollY
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyPosition = document.body.style.position
    const previousBodyTop = document.body.style.top
    const previousBodyWidth = document.body.style.width
    const previousHtmlOverflow = document.documentElement.style.overflow

    // Freeze the page behind the mobile sidebar so the workspace does not shift
    // or scroll while the navigation drawer is open.
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.position = previousBodyPosition
      document.body.style.top = previousBodyTop
      document.body.style.width = previousBodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [sidebarOpen])

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-sky-300/[0.28] blur-3xl" />
        <div className="absolute right-[-5rem] top-20 h-80 w-80 rounded-full bg-amber-200/[0.32] blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-indigo-200/[0.24] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),transparent)]" />
      </div>

      <div className="relative flex min-h-screen">
        <div
          className={`fixed inset-y-0 left-0 z-40 w-72 transform transition duration-300 md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarNav onNavigate={() => setSidebarOpen(false)} />
        </div>

        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        ) : null}

        <div className="flex min-h-screen flex-1 flex-col md:pl-72">
          <TopNavBar
            onMenuClick={() => setSidebarOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-6">
              <Outlet />
            </div>
          </main>
          <LayoutFooter />
        </div>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <CartDrawer />
    </div>
  )
}

export default DashboardLayout
