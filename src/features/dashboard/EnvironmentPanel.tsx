import { useEffect, useState } from 'react'
import { getEnvironmentSnapshot } from '@/services/environmentService'
import type { EnvironmentSnapshot, SensorReading, AqiCondition } from '@/types/environment'

// ── Condition config ──────────────────────────────────────────────────────────
const CONDITION_CONFIG: Record<AqiCondition, { label: string; color: string; bg: string; border: string }> = {
  good: { label: 'Good', color: 'text-status-available', bg: 'bg-status-available/8', border: 'border-status-available/20' },
  moderate: { label: 'Moderate', color: 'text-status-reserved', bg: 'bg-status-reserved/8', border: 'border-status-reserved/20' },
  poor: { label: 'Poor', color: 'text-status-maintenance', bg: 'bg-status-maintenance/8', border: 'border-status-maintenance/20' },
  critical: { label: 'Critical', color: 'text-red-900', bg: 'bg-red-50', border: 'border-red-200' },
}

// ── Sensor card ────────────────────────────────────────────────────────────────
function SensorCard({ reading }: { reading: SensorReading }) {
  const cond = CONDITION_CONFIG[reading.condition]
  return (
    <div className={`rounded-md border p-3 ${cond.bg} ${cond.border}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-2xs font-medium text-text-muted uppercase tracking-wider">
          {reading.parameter}
        </span>
        <span className={`text-2xs font-medium px-1.5 py-0.5 rounded ${cond.color} bg-white/60`}>
          {cond.label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold font-mono ${cond.color}`}>
          {reading.value}
        </span>
        <span className="text-xs text-text-muted">{reading.unit}</span>
      </div>
      <p className="text-2xs text-text-muted mt-1 truncate">{reading.label}</p>
    </div>
  )
}

// ── Panel ──────────────────────────────────────────────────────────────────────
export default function EnvironmentPanel() {
  const [snapshot, setSnapshot] = useState<EnvironmentSnapshot | null>(null)

  useEffect(() => {
    getEnvironmentSnapshot().then(setSnapshot)
  }, [])

  if (!snapshot) {
    return (
      <div className="h-32 flex items-center justify-center text-text-muted text-xs animate-pulse">
        Loading sensor data…
      </div>
    )
  }

  const sensors: SensorReading[] = [
    snapshot.aqi,
    snapshot.pm25,
    snapshot.pm10,
    snapshot.temperature,
    snapshot.humidity,
    snapshot.windSpeed,
    snapshot.visibility,
    snapshot.noise,
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Port Environment
          </h2>
          <p className="text-2xs text-text-disabled mt-0.5">
            Simulated · {snapshot.location}
          </p>
        </div>
        <span className="text-2xs text-text-disabled font-mono bg-bg-elevated border border-border-subtle rounded px-2 py-0.5">
          {snapshot.timestamp.slice(11, 16)} IST
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
        {sensors.map(s => (
          <SensorCard key={s.parameter} reading={s} />
        ))}
      </div>
    </div>
  )
}
