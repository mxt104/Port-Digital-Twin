import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Sidebar />
      <Topbar />
      {/* Main content area offset by sidebar and topbar */}
      <main
        className="ml-sidebar mt-topbar min-h-[calc(100vh-theme(spacing.topbar))]"
        style={{ minWidth: 0 }}
      >
        <Outlet />
      </main>
    </div>
  )
}
