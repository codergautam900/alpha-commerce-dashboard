import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
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

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-64 w-64 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute right-[-5rem] top-20 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-indigo-200/25 blur-3xl" />
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
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              <Outlet />
            </div>
          </main>
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
