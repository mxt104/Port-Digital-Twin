import { useContainers } from '@/hooks/useContainers'
import { formatUtilization } from '@/utils/formatters'
import { PORT_METRICS } from '@/data/portMetrics'
import KpiCard from '@/features/dashboard/KpiCard'
import DashboardCharts from '@/features/dashboard/DashboardCharts'
import EnvironmentPanel from '@/features/dashboard/EnvironmentPanel'

// ── Icons ─────────────────────────────────────────────────────────────────────
function VesselIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}
function GateIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  )
}
function ThroughputIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}
function ContainersIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 8.25V12m0 0l-3 3m3-3 3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )
}
function SlotsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function UtilIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
  )
}

// ── Section divider ────────────────────────────────────────────────────────────
function SectionHeader({ label, note }: { label: string; note?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">{label}</h2>
      {note && <span className="text-2xs text-text-disabled">{note}</span>}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { stats, loading } = useContainers()

  if (loading || !stats) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <span className="text-text-muted text-sm animate-pulse">Loading dashboard…</span>
      </div>
    )
  }

  const activeContainers = stats.totalContainers - (stats.byStatus['gate-out'] + stats.byStatus['empty'])
  const availableSlots = stats.totalCapacity - activeContainers

  return (
    <div className="p-5 space-y-6">

      {/* ── Section 1: Port Overview ───────────────────────────────────────── */}
      <div className="space-y-3">
        <SectionHeader label="Port Overview" note="Simulated operational data · JNPA reference context" />
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard
            title="Vessels at Berth"
            value={PORT_METRICS.vesselsAtBerth}
            subtitle="Across all 6 terminals"
            icon={<VesselIcon />}
            accent="default"
          />
          <KpiCard
            title="Gate In (24h)"
            value={PORT_METRICS.gateIn24h.toLocaleString('en-IN')}
            subtitle="Containers received today"
            icon={<GateIcon />}
            accent="success"
            trend={{ value: 4.1, label: 'vs yesterday' }}
          />
          <KpiCard
            title="Gate Out (24h)"
            value={PORT_METRICS.gateOut24h.toLocaleString('en-IN')}
            subtitle="Containers dispatched today"
            icon={<GateIcon />}
            accent="default"
            trend={{ value: 2.7, label: 'vs yesterday' }}
          />
          <KpiCard
            title="Monthly Throughput"
            value={`${(PORT_METRICS.throughputMtd / 1000).toFixed(1)}K`}
            subtitle="TEUs · current month (simulated)"
            icon={<ThroughputIcon />}
            accent="default"
            trend={{ value: 3.2, label: 'vs last month' }}
          />
        </div>
      </div>

      {/* ── Section 2: Simulated Yard Inventory ───────────────────────────── */}
      <div className="space-y-3">
        <SectionHeader label="Simulated Yard Inventory" note={`${stats.totalContainers} records across 6 terminals`} />
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard
            title="Total Containers"
            value={stats.totalContainers.toLocaleString('en-IN')}
            subtitle="Tracked in simulated dataset"
            icon={<ContainersIcon />}
            accent="default"
          />
          <KpiCard
            title="Active Slots"
            value={activeContainers.toLocaleString('en-IN')}
            subtitle={`${stats.byStatus['customs-hold']} on customs hold`}
            icon={<SlotsIcon />}
            accent="default"
          />
          <KpiCard
            title="Available Slots"
            value={availableSlots.toLocaleString('en-IN')}
            subtitle={`of ${stats.totalCapacity.toLocaleString('en-IN')} total capacity`}
            icon={<CheckIcon />}
            accent="success"
          />
          <KpiCard
            title="Yard Utilization"
            value={formatUtilization(stats.utilizationPercent)}
            subtitle="Active containers / total capacity"
            icon={<UtilIcon />}
            accent={
              stats.utilizationPercent >= 90 ? 'danger'
                : stats.utilizationPercent >= 75 ? 'warning' : 'success'
            }
            isUtilization
            utilizationValue={stats.utilizationPercent}
          />
        </div>
      </div>

      {/* ── Section 3: Port Environment ────────────────────────────────────── */}
      <div className="bg-bg-card border border-border-subtle rounded-md p-4 shadow-card">
        <EnvironmentPanel />
      </div>

      {/* ── Section 4: Analytics Charts ────────────────────────────────────── */}
      <div className="space-y-3">
        <SectionHeader label="Analytics" />
        <DashboardCharts stats={stats} />
      </div>
    </div>
  )
}
