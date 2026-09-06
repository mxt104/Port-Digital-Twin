import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/constants'

// ── Icons ────────────────────────────────────────────────────────────────────
function DashboardIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function YardIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path d="M2 20h20M4 20V10l8-6 8 6v10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m7 16 4-4 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


function MapIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v15m6-12v15" />
    </svg>
  )
}

function AnchorIcon() {
  return (
    <svg className="w-5 h-5 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="12" cy="5" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v14M6 11h12M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6" />
    </svg>
  )
}

const ICONS: Record<string, React.FC> = {
  dashboard: DashboardIcon,
  yard:      YardIcon,
  analytics: AnalyticsIcon,
  map:       MapIcon,
}

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-sidebar bg-bg-surface border-r border-border-subtle flex flex-col z-30 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border-subtle">
        <div className="w-7 h-7 rounded bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0">
          <AnchorIcon />
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-text-primary leading-none tracking-wide">SMART PORT</p>
          <p className="text-2xs text-accent-primary mt-0.5 font-mono tracking-widest leading-none">
            DIGITAL TWIN
          </p>
        </div>
      </div>

      {/* Port context */}
      <div className="px-4 py-2.5 border-b border-border-subtle bg-bg-elevated">
        <p className="text-2xs font-medium text-text-muted uppercase tracking-wider">Reference Port</p>
        <p className="text-xs font-semibold text-text-secondary mt-0.5">JNPA · Navi Mumbai</p>
        <p className="text-2xs text-text-disabled mt-0.5">Simulated data</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        <p className="text-2xs text-text-disabled uppercase tracking-widest px-2 mb-2 font-medium">
          Operations
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(item => {
            const Icon = ICONS[item.icon]
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors duration-150 ${
                      isActive
                        ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20 font-medium'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent'
                    }`
                  }
                >
                  {Icon && <Icon />}
                  {item.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer — operational status only, no version labels */}
      <div className="px-4 py-3 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-status-available animate-pulse" />
          <span className="text-2xs text-text-muted font-mono">SYSTEM ONLINE</span>
        </div>
      </div>
    </aside>
  )
}
