import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchInput from '@/components/ui/SearchInput'
import { useAppStore } from '@/store/appStore'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':      'Dashboard',
  '/container-yard': 'Container Yard · Digital Twin',
  '/analytics':      'Analytics',
}

export default function Topbar() {
  const location    = useLocation()
  const pageTitle   = PAGE_TITLES[location.pathname] ?? 'Smart Port'
  const searchQuery = useAppStore(s => s.searchQuery)
  const setSearchQuery = useAppStore(s => s.setSearchQuery)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = time.toLocaleTimeString('en-IN', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  })
  const dateStr = time.toLocaleDateString('en-IN', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
    timeZone: 'Asia/Kolkata',
  })

  return (
    <header className="fixed top-0 left-sidebar right-0 h-topbar bg-bg-surface border-b border-border-subtle flex items-center px-4 gap-4 z-20 shadow-sm">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-text-primary truncate">{pageTitle}</h1>
      </div>

      {/* Search */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search containers…"
        width="w-60"
      />

      <div className="w-px h-5 bg-border-subtle" />

      {/* Clock (IST) */}
      <div className="text-right hidden md:block">
        <p className="text-xs font-mono text-text-primary">{timeStr} <span className="text-text-muted text-2xs">IST</span></p>
        <p className="text-2xs font-mono text-text-muted">{dateStr}</p>
      </div>

      {/* Connection status */}
      <div className="flex items-center gap-1.5 pl-1">
        <span className="w-2 h-2 rounded-full bg-status-available animate-pulse" title="Simulated data feed active" />
        <span className="text-2xs text-text-muted font-mono hidden sm:block">SIM</span>
      </div>
    </header>
  )
}
