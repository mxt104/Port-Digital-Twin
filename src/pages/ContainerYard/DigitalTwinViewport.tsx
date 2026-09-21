import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, PerspectiveCamera, Text, Edges } from '@react-three/drei'
import type { Group } from 'three' 
import { SAMPLE_CONTAINERS } from '@/data/containers'
import type { Container, ContainerStatus } from '@/types/container'
import { useAppStore } from '@/store/appStore'
import { RTG_EQUIPMENT } from '@/data/equipment'
import RTGCrane from './components/RTGCrane'
import { JNPA_TERMINALS } from '@/data/jnpaLayout'
import Terminal3D from './components/Terminal3D'
import YardBlock3D from './components/YardBlock3D'

// ── Status colour map — new 9-value operational vocabulary ───────────────────
const STATUS_COLORS: Record<ContainerStatus, string> = {
  import: '#1d4ed8',   // blue
  export: '#16a34a',   // green
  transshipment: '#7c3aed',   // violet
  'gate-in': '#0891b2',   // cyan
  'gate-out': '#0f766e',   // teal
  'customs-hold': '#dc2626',   // red
  inspection: '#ea580c',   // orange
  empty: '#94a3b8',   // slate (light grey — unloaded)
  loaded: '#4f46e5',   // indigo
}

// ── Realistic container model ─────────────────────────────────────────────────
interface ContainerBoxProps {
  container: Container
  isSelected: boolean
  onClick: () => void
}

function ContainerBox({ container, isSelected, onClick }: ContainerBoxProps) {
  const groupRef = useRef<Group>(null)

  // Physical dimensions by ISO type
  const typeWidth: Record<Container['type'], number> = {
    '20ft': 1.0,
    '40ft': 2.0,
    '40ft-HC': 2.0,
    '45ft-HC': 2.25,
  }

  const w = typeWidth[container.type]
  const h = container.type.includes('HC') ? 0.58 : 0.5
  const d = 0.45

 // Yard position
// Containers are arranged into realistic rows and columns
// with spacing for RTG/truck operating lanes.

const containerGapX = 2.2
const containerGapZ = 1.4

const colX = (container.column - 1) * containerGapX
const rowZ = (container.row - 1) * containerGapZ
const levelY =
  (container.level - 1) * (h + 0.05) + h / 2

  const baseColor = STATUS_COLORS[container.status]

  // Animate selected container
  useFrame(({ clock }) => {
    if (!groupRef.current) return

    groupRef.current.position.y = isSelected
      ? Math.sin(clock.getElapsedTime() * 2.5) * 0.05
      : 0
  })

  return (
    <group
      ref={groupRef}
      position={[colX, levelY, rowZ]}
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
    >

      {/* Main container body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.55}
          metalness={0.45}
          emissive={isSelected ? baseColor : '#000000'}
          emissiveIntensity={isSelected ? 0.45 : 0}
        />
        <Edges
          threshold={15}
          color={isSelected ? '#ffffff' : '#334155'}
        />
      </mesh>

      {/* ───────── Corner posts ───────── */}

      {[
        [-w / 2 + 0.045, 0, -d / 2 + 0.035],
        [ w / 2 - 0.045, 0, -d / 2 + 0.035],
        [-w / 2 + 0.045, 0,  d / 2 - 0.035],
        [ w / 2 - 0.045, 0,  d / 2 - 0.035],
      ].map(([x, y, z], i) => (
        <mesh
          key={`corner-${i}`}
          position={[x, y, z]}
          castShadow
        >
          <boxGeometry args={[0.055, h + 0.025, 0.055]} />
          <meshStandardMaterial
            color="#e2e8f0"
            roughness={0.7}
            metalness={0.55}
          />
        </mesh>
      ))}

      {/* ───────── Front door frame ───────── */}

      <mesh position={[0, 0, d / 2 + 0.012]}>
        <boxGeometry args={[w - 0.12, h - 0.08, 0.025]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.65}
          metalness={0.4}
        />
      </mesh>

      {/* Door centre line */}
      <mesh position={[0, 0, d / 2 + 0.028]}>
        <boxGeometry args={[0.018, h - 0.09, 0.012]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.8}
        />
      </mesh>

      {/* ───────── Side corrugation ───────── */}

      {Array.from({
        length: Math.max(4, Math.floor(w * 5)),
      }).map((_, i, arr) => {
        const x = -w / 2 + 0.12 + (i * (w - 0.24)) / (arr.length - 1)

        return (
          <mesh
            key={`rib-${i}`}
            position={[x, 0, -d / 2 - 0.012]}
          >
            <boxGeometry args={[0.018, h - 0.08, 0.018]} />
            <meshStandardMaterial
              color="#1e293b"
              roughness={0.8}
              metalness={0.25}
            />
          </mesh>
        )
      })}

      {/* ───────── IR sensor ───────── */}

      <mesh position={[0, h / 2 + 0.06, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial
          color={container.status === 'empty' ? '#ef4444' : '#22c55e'}
          emissive={container.status === 'empty' ? '#ef4444' : '#22c55e'}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Sensor housing */}
      <mesh position={[0, h / 2 + 0.045, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.025, 12]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* ───────── Container number ───────── */}

      {isSelected && (
        <Text
          position={[0, h / 2 + 0.13, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.11}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-"
        >
          {container.containerNumber}
        </Text>
      )}

    </group>
  )
}

// ── Block group ───────────────────────────────────────────────────────────────
interface BlockGroupProps {
  block: string
  containers: Container[]
  selectedId: string | null
  onSelect: (id: string) => void
  offsetX: number
  offsetZ: number
}

function BlockGroup({ containers, selectedId, onSelect, offsetX, offsetZ }: BlockGroupProps) {
  return (
    <group position={[offsetX, 0, offsetZ]}>
      {containers.map(c => (
        <ContainerBox
          key={c.id}
          container={c}
          isSelected={selectedId === c.id}
          onClick={() => onSelect(c.id)}
        />
      ))}
    </group>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({
  selectedId,
  onSelect,
  activeTerminal,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
  activeTerminal: string
}) {
  // Default to NSICT (largest) when 'all' is selected
  const terminalCode = activeTerminal === 'all' ? 'NSICT' : activeTerminal

const terminalContainers = SAMPLE_CONTAINERS.filter(
  c => c.terminal === terminalCode
)

  // Group by block, extract block number for X offset
  const blockMap = new Map<string, Container[]>()
  for (const c of terminalContainers) {
    const list = blockMap.get(c.block) ?? []
    list.push(c)
    blockMap.set(c.block, list)
  }

  const blockEntries = [...blockMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))


const yardWidth = 220
const yardDepth = 110

const gridCenterX = yardWidth / 2
const gridCenterZ = yardDepth / 2

  return (
    <>
      {/* JNPA terminal footprints */}
      {JNPA_TERMINALS
  .filter(terminal => terminal.type === 'container')
  .map(terminal => (
    <Terminal3D
      key={terminal.id}
      terminal={terminal}
    />
  ))}
      {/* Lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[15, 20, 12]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, 10, -8]} intensity={0.25} color="#7bafd4" />
      <hemisphereLight args={['#dbeafe', '#f0fdf4', 0.3]} />

      {/* Shared port ground */}
<mesh
  rotation={[-Math.PI / 2, 0, 0]}
  position={[110, -0.08, 55]}
  receiveShadow
>
  <planeGeometry args={[340, 220]} />
  <meshStandardMaterial
    color="#64748b"
    roughness={0.95}
    metalness={0.05}
  />
</mesh>

      {/* Ground grid */}
      <Grid
        args={[yardWidth + 20, yardDepth + 20]}
        position={[gridCenterX, -0.01, gridCenterZ]}
        cellSize={1}
        cellThickness={0.3}
        cellColor="#cbd5e1"
        sectionSize={5}
        sectionThickness={0.7}
        sectionColor="#94a3b8"
        fadeDistance={60}
        fadeStrength={1}
      />
      {/* Main yard roads */}
<group>
  {/* Horizontal road */}
  <mesh
    position={[yardWidth / 2, 0.03, 42]}
    receiveShadow
  >
    <boxGeometry args={[yardWidth, 0.06, 6]} />
    <meshStandardMaterial
      color="#263238"
      roughness={0.95}
    />
  </mesh>

  {/* Horizontal dashed lane markings */}
{Array.from({ length: 18 }).map((_, index) => (
  <mesh
    key={`horizontal-dash-${index}`}
    position={[-100 + index * 12, 0.08, 42]}
  >
    <boxGeometry args={[6, 0.025, 0.12]} />
    <meshStandardMaterial color="#f8fafc" />
  </mesh>
))}

  {/* Horizontal road marking */}
  <mesh position={[yardWidth / 2, 0.07, 42]}>
    <boxGeometry args={[yardWidth, 0.02, 0.12]} />
    <meshStandardMaterial color="#facc15" />
  </mesh>

  {/* Vertical road */}
  <mesh
    position={[92, 0.04, yardDepth / 2]}
    receiveShadow
  >
    <boxGeometry args={[6, 0.07, yardDepth]} />
    <meshStandardMaterial
      color="#263238"
      roughness={0.95}
    />
  </mesh>

  {/* Vertical road marking */}
  <mesh position={[92, 0.08, yardDepth / 2]}>
    <boxGeometry args={[0.12, 0.02, yardDepth]} />
    <meshStandardMaterial color="#facc15" />
  </mesh>

  {/* Vertical dashed lane markings */}
{Array.from({ length: 9 }).map((_, index) => (
  <mesh
    key={`vertical-dash-${index}`}
    position={[92, 0.09, 5 + index * 12]}
  >
    <boxGeometry args={[0.12, 0.025, 6]} />
    <meshStandardMaterial color="#f8fafc" />
  </mesh>
))}

</group>

            {/* Container blocks inside the selected terminal */}
      {blockEntries.map(([block, containers], i) => {
        const terminal = JNPA_TERMINALS.find(
          t => t.id === terminalCode
        )

        if (!terminal) return null

        // Leave space near the quay and terminal boundary
        const marginX = 4
        const marginZ = 7

        // Space occupied by one container block
        const blockSpacingX = 15
        const blockSpacingZ = 10

        // Number of blocks that can fit across this terminal
        const blocksPerRow = Math.max(
          1,
          Math.floor(
            (terminal.width - marginX * 2) / blockSpacingX
          )
        )

        const blockRow = Math.floor(i / blocksPerRow)
        const blockColumn = i % blocksPerRow

        const offsetX =
          terminal.x +
          marginX +
          blockColumn * blockSpacingX

        const offsetZ =
          terminal.z +
          marginZ +
          blockRow * blockSpacingZ
          
          const maxColumn = Math.max(
  ...containers.map(c => c.column)
)

const maxRow = Math.max(
  ...containers.map(c => c.row)
)

const containerSpacingX = 2.2
const containerSpacingZ = 1.4

const blockWidth =
  maxColumn * containerSpacingX + 2

const blockDepth =
  maxRow * containerSpacingZ + 2
        return (
          <>
  <YardBlock3D
  block={block}
  width={blockWidth}
  depth={blockDepth}
  x={offsetX + blockWidth / 2}
  z={offsetZ + blockDepth / 2}
/>

    <BlockGroup
      key={block}
      block={block}
      containers={containers}
      selectedId={selectedId}
      onSelect={onSelect}
      offsetX={offsetX}
      offsetZ={offsetZ}
    />
  </>
)
      })}
{RTG_EQUIPMENT.map((rtg) => {
  const blockIndex = blockEntries.findIndex(
    ([block]) => block === rtg.block
  )

  if (blockIndex === -1) return null

  const terminal = JNPA_TERMINALS.find(
    t => t.id === terminalCode
  )

  if (!terminal) return null

  const marginX = 4
  const marginZ = 7
  const blockSpacingX = 15
  const blockSpacingZ = 10

  const blocksPerRow = Math.max(
    1,
    Math.floor(
      (terminal.width - marginX * 2) / blockSpacingX
    )
  )

  const blockRow = Math.floor(blockIndex / blocksPerRow)
  const blockColumn = blockIndex % blocksPerRow

  const maxColumn = Math.max(
    ...SAMPLE_CONTAINERS
      .filter(c => c.block === rtg.block)
      .map(c => c.column)
  )

  const maxRow = Math.max(
    ...SAMPLE_CONTAINERS
      .filter(c => c.block === rtg.block)
      .map(c => c.row)
  )

  const containerSpacingX = 2.2
  const containerSpacingZ = 1.4

  const blockWidth =
    maxColumn * containerSpacingX + 2

  const blockDepth =
    maxRow * containerSpacingZ + 2

  const offsetX =
    terminal.x +
    marginX +
    blockColumn * blockSpacingX

  const offsetZ =
    terminal.z +
    marginZ +
    blockRow * blockSpacingZ
    const rtgX = offsetX + blockWidth / 2
    const rtgZ = offsetZ + blockDepth + 2

  return (
    <RTGCrane
      key={rtg.id}
      equipment={{
  ...rtg,
  x: rtgX,
  z: rtgZ,
}}
    />
  )
})}


      {/* Orbit / pan / zoom */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        maxPolarAngle={Math.PI / 2.05}
        minDistance={5}
        maxDistance={220}
        target={[110, 0, 55]}
      />
    </>
  )
}

// ── Viewport overlays ─────────────────────────────────────────────────────────
const LEGEND_ITEMS: Array<{ label: string; status: ContainerStatus }> = [
  { label: 'Import', status: 'import' },
  { label: 'Export', status: 'export' },
  { label: 'Transshipment', status: 'transshipment' },
  { label: 'Customs Hold', status: 'customs-hold' },
  { label: 'Inspection', status: 'inspection' },
  { label: 'Empty', status: 'empty' },
  { label: 'Loaded', status: 'loaded' },
]

function ViewportLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 border border-border-subtle rounded-md px-3 py-2.5 flex flex-col gap-1.5 backdrop-blur-sm shadow-sm">
      <p className="text-2xs text-text-muted uppercase tracking-widest mb-0.5">Status</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {LEGEND_ITEMS.map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: STATUS_COLORS[item.status] }}
            />
            <span className="text-xs text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ControlsHint() {
  return (
    <div className="absolute top-4 right-4 bg-white/85 border border-border-subtle rounded-md px-3 py-2 backdrop-blur-sm shadow-sm">
      <p className="text-2xs text-text-muted">
        <span className="text-text-secondary">Orbit</span> · Drag &nbsp;|&nbsp;
        <span className="text-text-secondary">Pan</span> · Right-drag &nbsp;|&nbsp;
        <span className="text-text-secondary">Zoom</span> · Scroll
      </p>
    </div>
  )
}

function TerminalBadge({ terminal }: { terminal: string }) {
  const displayName = terminal === 'all' ? 'NSICT' : terminal
  return (
    <div className="absolute top-4 left-4 bg-white/90 border border-accent-primary/20 rounded-md px-3 py-1.5 backdrop-blur-sm flex items-center gap-2 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
      <span className="text-xs text-accent-primary font-mono font-semibold tracking-wide">
        {displayName} TERMINAL
      </span>
      <span className="text-2xs text-text-muted font-mono">· SIMULATED VIEW</span>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function DigitalTwinViewport() {
  const selectedId = useAppStore(s => s.selectedContainerId)
  const setSelected = useAppStore(s => s.setSelectedContainer)
  const activeTerminal = useAppStore(s => s.activeTerminal)

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden border border-border-subtle bg-slate-100">
      <TerminalBadge terminal={activeTerminal} />
      <ControlsHint />

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
        onPointerMissed={() => setSelected(null)}
      >
        <color attach="background" args={['#dbe4ee']} />
        <PerspectiveCamera
  makeDefault
  position={[115, 95, 135]}
  fov={50}
/>
        <Scene selectedId={selectedId} onSelect={setSelected} activeTerminal={activeTerminal} />
      </Canvas>

      <ViewportLegend />
    </div>
  )
}
