import { useMemo, useState } from 'react'
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const PORT_CENTER: [number, number] = [18.9498, 72.9520]

type TrafficLevel = 'LOW' | 'MEDIUM' | 'HIGH'

type Zone = {
  id: string
  name: string
  position: [number, number]
  trucks: number
  traffic: TrafficLevel
  type: 'Gate' | 'Yard' | 'Berth' | 'Road'
}

const ZONES: Zone[] = [
  { id: 'gate-a', name: 'Gate A', position: [18.9510, 72.9488], trucks: 34, traffic: 'HIGH', type: 'Gate' },
  { id: 'yard-a', name: 'Yard A', position: [18.9479, 72.9514], trucks: 18, traffic: 'MEDIUM', type: 'Yard' },
  { id: 'yard-b', name: 'Yard B', position: [18.9459, 72.9544], trucks: 11, traffic: 'LOW', type: 'Yard' },
  { id: 'berth-1', name: 'Berth 1', position: [18.9514, 72.9571], trucks: 8, traffic: 'LOW', type: 'Berth' },
  { id: 'road-north', name: 'North Access Road', position: [18.9530, 72.9522], trucks: 26, traffic: 'HIGH', type: 'Road' },
]

const AQI_SENSORS = [
  { id: 'AQ-01', name: 'Gate A AQI', position: [18.9514, 72.9495] as [number, number], aqi: 82 },
  { id: 'AQ-02', name: 'Yard A AQI', position: [18.9472, 72.9510] as [number, number], aqi: 64 },
]

const trafficStyles: Record<TrafficLevel, { color: string; label: string }> = {
  LOW: { color: '#16a34a', label: 'Low' },
  MEDIUM: { color: '#d97706', label: 'Moderate' },
  HIGH: { color: '#dc2626', label: 'High' },
}

function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap()
  map.setView(center, map.getZoom(), { animate: false })
  return null
}

export default function PortMapPage() {
  const [selectedTraffic, setSelectedTraffic] = useState<TrafficLevel | 'ALL'>('ALL')
  const [showTraffic, setShowTraffic] = useState(true)
  const [showAqi, setShowAqi] = useState(true)

  const filteredZones = useMemo(
    () => selectedTraffic === 'ALL' ? ZONES : ZONES.filter(zone => zone.traffic === selectedTraffic),
    [selectedTraffic],
  )

  const totalTrucks = ZONES.reduce((sum, zone) => sum + zone.trucks, 0)
  const highTrafficZones = ZONES.filter(zone => zone.traffic === 'HIGH').length

  return (
    <div className="p-5 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Geospatial Operations</p>
          <h1 className="text-xl font-semibold text-text-primary mt-1">Port Map</h1>
          <p className="text-xs text-text-muted mt-1">OpenStreetMap · JNPA reference context · simulated operational overlays</p>
        </div>
        <div className="flex items-center gap-2 text-2xs text-text-muted">
          <span className="w-2 h-2 rounded-full bg-status-available animate-pulse" /> LIVE VIEW · SIMULATED DATA
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Tracked Trucks" value={totalTrucks.toString()} detail="Across monitored zones" />
        <MetricCard label="High Traffic Zones" value={highTrafficZones.toString()} detail="Requires attention" danger />
        <MetricCard label="AQI Sensors" value={AQI_SENSORS.length.toString()} detail="Online · simulated" />
        <MetricCard label="Monitored Zones" value={ZONES.length.toString()} detail="Gate · yard · berth · road" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4">
        <section className="bg-bg-card border border-border-subtle rounded-md overflow-hidden shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border-subtle">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Operational Map</h2>
              <p className="text-2xs text-text-muted mt-0.5">Select markers to inspect operational status</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['ALL', 'LOW', 'MEDIUM', 'HIGH'] as const).map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedTraffic(level)}
                  className={`px-2.5 py-1.5 rounded text-2xs font-medium border transition-colors ${
                    selectedTraffic === level
                      ? 'bg-accent-primary text-white border-accent-primary'
                      : 'bg-bg-surface text-text-secondary border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  {level === 'ALL' ? 'All traffic' : trafficStyles[level].label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[520px] w-full">
            <MapContainer center={PORT_CENTER} zoom={15} scrollWheelZoom className="h-full w-full">
              <MapRecenter center={PORT_CENTER} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {showTraffic && filteredZones.map(zone => {
                const style = trafficStyles[zone.traffic]
                return (
                  <CircleMarker
                    key={zone.id}
                    center={zone.position}
                    radius={9}
                    pathOptions={{ color: style.color, fillColor: style.color, fillOpacity: 0.82, weight: 2 }}
                  >
                    <Tooltip direction="top" offset={[0, -8]}>{zone.name} · {style.label} traffic</Tooltip>
                    <Popup>
                      <div className="min-w-[150px]">
                        <strong>{zone.name}</strong>
                        <div className="text-xs mt-1">Type: {zone.type}</div>
                        <div className="text-xs">Trucks: {zone.trucks}</div>
                        <div className="text-xs">Traffic: {style.label}</div>
                      </div>
                    </Popup>
                  </CircleMarker>
                )
              })}

              {showAqi && AQI_SENSORS.map(sensor => (
                <Circle
                  key={sensor.id}
                  center={sensor.position}
                  radius={75}
                  pathOptions={{ color: '#7c3aed', fillColor: '#7c3aed', fillOpacity: 0.10, weight: 1.5, dashArray: '5 5' }}
                >
                  <Popup>
                    <strong>{sensor.id}</strong>
                    <div className="text-xs mt-1">{sensor.name}</div>
                    <div className="text-xs">AQI: {sensor.aqi}</div>
                    <div className="text-xs">Status: Online</div>
                  </Popup>
                </Circle>
              ))}

              {showAqi && AQI_SENSORS.map(sensor => (
                <CircleMarker
                  key={`${sensor.id}-marker`}
                  center={sensor.position}
                  radius={6}
                  pathOptions={{ color: '#7c3aed', fillColor: '#7c3aed', fillOpacity: 1, weight: 2 }}
                >
                  <Tooltip direction="top" offset={[0, -5]}>{sensor.id} · AQI {sensor.aqi}</Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="bg-bg-card border border-border-subtle rounded-md p-4 shadow-card">
            <h2 className="text-sm font-semibold text-text-primary">Map Layers</h2>
            <div className="mt-3 space-y-2.5">
              <LayerToggle label="Traffic zones" checked={showTraffic} onChange={setShowTraffic} />
              <LayerToggle label="AQI sensors" checked={showAqi} onChange={setShowAqi} />
            </div>
          </section>

          <section className="bg-bg-card border border-border-subtle rounded-md p-4 shadow-card">
            <h2 className="text-sm font-semibold text-text-primary">Traffic Legend</h2>
            <div className="mt-3 space-y-2.5">
              {(Object.entries(trafficStyles) as [TrafficLevel, { color: string; label: string }][]).map(([level, style]) => (
                <div key={level} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: style.color }} />
                    {style.label}
                  </span>
                  <span className="font-mono text-text-muted">{ZONES.filter(zone => zone.traffic === level).length} zones</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-bg-card border border-border-subtle rounded-md p-4 shadow-card">
            <h2 className="text-sm font-semibold text-text-primary">Integration Plan</h2>
            <div className="mt-3 space-y-2 text-2xs text-text-muted leading-relaxed">
              <p><span className="text-text-primary font-medium">Current:</span> simulated map overlays</p>
              <p><span className="text-text-primary font-medium">Next:</span> Spring Boot traffic API</p>
              <p><span className="text-text-primary font-medium">Later:</span> live truck/GPS and sensor updates</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function MetricCard({ label, value, detail, danger = false }: { label: string; value: string; detail: string; danger?: boolean }) {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-md p-4 shadow-card">
      <p className="text-2xs text-text-muted uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${danger ? 'text-status-maintenance' : 'text-text-primary'}`}>{value}</p>
      <p className="text-2xs text-text-muted mt-1">{detail}</p>
    </div>
  )
}

function LayerToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 text-xs text-text-secondary cursor-pointer">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} className="h-4 w-4 accent-accent-primary" />
    </label>
  )
}
