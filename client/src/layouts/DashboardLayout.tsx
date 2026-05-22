import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarNav from '../components/layout/SidebarNav'
import TopNavBar from '../components/layout/TopNavBar'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
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
          <TopNavBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
