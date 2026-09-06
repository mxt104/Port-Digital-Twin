import type { ContainerStatus, ContainerType } from '@/types/container'

// ── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: 'Dashboard',      path: '/dashboard',      icon: 'dashboard' },
  { label: 'Container Yard', path: '/container-yard', icon: 'yard' },
  { label: 'Analytics',      path: '/analytics',      icon: 'analytics' },
  { label: 'Port Map',       path: '/port-map',       icon: 'map' },
] as const

// ── JNPA Terminals ───────────────────────────────────────────────────────────
export const TERMINALS = ['NSFT', 'NSICT', 'NSIGT', 'APMT', 'BMCT', 'NSDT'] as const
export type TerminalCode = (typeof TERMINALS)[number]

// ── Status config — full 9-value operational vocabulary ──────────────────────
export const STATUS_CONFIG: Record<
  ContainerStatus,
  { label: string; color: string; bg: string; dot: string; hex: string }
> = {
  import:        { label: 'Import',       color: 'text-status-import',        bg: 'bg-status-import/10',        dot: 'bg-status-import',        hex: '#1d4ed8' },
  export:        { label: 'Export',       color: 'text-status-export',        bg: 'bg-status-export/10',        dot: 'bg-status-export',        hex: '#16a34a' },
  transshipment: { label: 'Transshipment',color: 'text-status-transshipment', bg: 'bg-status-transshipment/10', dot: 'bg-status-transshipment', hex: '#7c3aed' },
  'gate-in':     { label: 'Gate In',      color: 'text-status-gate-in',       bg: 'bg-status-gate-in/10',       dot: 'bg-status-gate-in',       hex: '#0891b2' },
  'gate-out':    { label: 'Gate Out',     color: 'text-status-gate-out',      bg: 'bg-status-gate-out/10',      dot: 'bg-status-gate-out',      hex: '#0f766e' },
  'customs-hold':{ label: 'Customs Hold', color: 'text-status-customs-hold',  bg: 'bg-status-customs-hold/10',  dot: 'bg-status-customs-hold',  hex: '#dc2626' },
  inspection:    { label: 'Inspection',   color: 'text-status-inspection',    bg: 'bg-status-inspection/10',    dot: 'bg-status-inspection',    hex: '#ea580c' },
  empty:         { label: 'Empty',        color: 'text-status-empty',         bg: 'bg-status-empty/10',         dot: 'bg-status-empty',         hex: '#64748b' },
  loaded:        { label: 'Loaded',       color: 'text-status-loaded',        bg: 'bg-status-loaded/10',        dot: 'bg-status-loaded',        hex: '#4f46e5' },
}

// ── Container type labels ─────────────────────────────────────────────────────
export const TYPE_LABELS: Record<ContainerType, string> = {
  '20ft':    '20 ft Standard',
  '40ft':    '40 ft Standard',
  '40ft-HC': '40 ft High-Cube',
  '45ft-HC': '45 ft High-Cube',
}

// ── ECharts shared theme — light backgrounds ──────────────────────────────────
export const CHART_COLORS = {
  blue:   '#1d4ed8',
  green:  '#16a34a',
  amber:  '#d97706',
  red:    '#dc2626',
  purple: '#7c3aed',
  cyan:   '#0891b2',
  indigo: '#4f46e5',
  teal:   '#0f766e',
  orange: '#ea580c',
  slate:  '#64748b',
} as const

export const CHART_TEXT_COLOR  = '#334155'   // slate-700 — readable on white
export const CHART_GRID_COLOR  = '#e2e8f0'   // slate-200 — subtle on white

export const CHART_TOOLTIP_STYLE = {
  backgroundColor: '#ffffff',
  borderColor:     '#e2e8f0',
  borderWidth:     1,
  textStyle:       { color: '#0f172a', fontSize: 12 },
  extraCssText:    'box-shadow: 0 4px 12px rgba(0,0,0,0.12); border-radius:6px;',
}

// ── KPI thresholds ────────────────────────────────────────────────────────────
export const UTILIZATION_THRESHOLDS = {
  low:    50,
  medium: 75,
  high:   90,
} as const

// ── AQI breakpoints (CPCB standard) ──────────────────────────────────────────
export const AQI_BREAKPOINTS = {
  good:     [0,   50],
  moderate: [51,  100],
  poor:     [101, 200],
  critical: [201, Infinity],
} as const
