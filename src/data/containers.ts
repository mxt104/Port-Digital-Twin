import type { Container, ContainerStatus, ContainerType, CargoType } from '@/types/container'

/**
 * Simulated container inventory for Smart Port Digital Twin.
 *
 * Data is SIMULATED and is NOT live or official JNPA operational data.
 * Terminal names (NSFT, NSICT, NSIGT, APMT, BMCT, NSDT) are used as
 * realistic reference context only.
 *
 * ~300 records distributed across 6 JNPA-inspired terminals.
 */

// ── Lookup tables ─────────────────────────────────────────────────────────────

const SHIPPING_LINES: Array<{ prefix: string; line: string }> = [
  { prefix: 'MSCU', line: 'MSC' },
  { prefix: 'MAEU', line: 'Maersk' },
  { prefix: 'HLCU', line: 'Hapag-Lloyd' },
  { prefix: 'CMAU', line: 'CMA CGM' },
  { prefix: 'COSU', line: 'COSCO' },
  { prefix: 'EVGU', line: 'Evergreen' },
  { prefix: 'YMLU', line: 'Yang Ming' },
  { prefix: 'OOLU', line: 'OOCL' },
  { prefix: 'ZIMU', line: 'ZIM' },
  { prefix: 'APLU', line: 'APL' },
  { prefix: 'PILU', line: 'PIL' },
  { prefix: 'ONEY', line: 'ONE' },
]

const TYPES: ContainerType[] = ['20ft', '40ft', '40ft-HC', '45ft-HC']
const TYPE_W = [20, 40, 30, 10]        // weight distribution

const STATUSES: ContainerStatus[] = [
  'import', 'export', 'transshipment', 'loaded', 'empty',
  'customs-hold', 'inspection', 'gate-in', 'gate-out',
]
const STATUS_W = [32, 28, 14, 6, 8, 4, 2, 3, 3] // realistic proportions

const CARGO_TYPES: CargoType[] = ['general', 'refrigerated', 'bulk', 'hazardous', 'liquid', 'ro-ro']
const CARGO_W = [45, 15, 15, 12, 8, 5]

const DOMESTIC_LOCATIONS = [
  'Nhava Sheva', 'Mumbai Port', 'Mundra Port', 'Kandla',
  'Chennai Port', 'Cochin Port', 'Kolkata', 'Vizag Port',
  'Tuticorin', 'Pune ICD', 'Delhi ICD', 'Bengaluru ICD',
  'Ahmedabad ICD', 'Hyderabad ICD',
]

const INTERNATIONAL_LOCATIONS = [
  'Rotterdam', 'Hamburg', 'Singapore', 'Dubai (Jebel Ali)',
  'Shanghai', 'Los Angeles', 'Long Beach', 'Felixstowe',
  'Antwerp', 'Genoa', 'Valencia', 'Busan', 'Hong Kong',
  'Colombo', 'Port Klang', 'Kaohsiung', 'Tokyo', 'Osaka',
  'Tanjung Pelepas', 'Piraeus', 'Barcelona', 'Algeciras',
  'Ningbo', 'Guangzhou', 'Tianjin', 'Manila',
]

// ── Terminal layout configs ───────────────────────────────────────────────────
interface TerminalConfig {
  code: string
  count: number
  blockPrefix: string
  blockCount: number
  yardId: string
  rows: number
  cols: number
}

const TERMINAL_CONFIGS: TerminalConfig[] = [
  { code: 'NSICT', count: 58, blockPrefix: 'IC', blockCount: 12, yardId: 'IC-YARD', rows: 8, cols: 16 },
  { code: 'NSIGT', count: 55, blockPrefix: 'IG', blockCount: 10, yardId: 'IG-YARD', rows: 8, cols: 14 },
  { code: 'APMT', count: 52, blockPrefix: 'AP', blockCount: 10, yardId: 'AP-YARD', rows: 6, cols: 14 },
  { code: 'BMCT', count: 50, blockPrefix: 'BM', blockCount: 10, yardId: 'BM-YARD', rows: 8, cols: 12 },
  { code: 'NSFT', count: 48, blockPrefix: 'FT', blockCount: 8, yardId: 'FT-YARD', rows: 6, cols: 12 },
  { code: 'NSDT', count: 40, blockPrefix: 'DT', blockCount: 6, yardId: 'DT-YARD', rows: 6, cols: 10 },
]

// ── Deterministic pseudo-hash (no randomness — consistent on every import) ────
function h(n: number): number {
  let v = n ^ 0xdeadbeef
  v = Math.imul(v ^ (v >>> 16), 0x45d9f3b)
  v = Math.imul(v ^ (v >>> 16), 0x45d9f3b)
  return (v ^ (v >>> 16)) >>> 0
}

function pick<T>(arr: T[], weights: number[], seed: number): T {
  const total = weights.reduce((s, w) => s + w, 0)
  const target = h(seed) % total
  let running = 0
  for (let i = 0; i < arr.length; i++) {
    running += weights[i]
    if (target < running) return arr[i]
  }
  return arr[arr.length - 1]
}

function pickUniform<T>(arr: T[], seed: number): T {
  return arr[h(seed) % arr.length]
}

function weightForStatus(status: ContainerStatus, cargoType: CargoType): number {
  // empty containers weigh 0; loaded ones have realistic cargo weight
  if (status === 'empty' || status === 'gate-out') return 0
  const bases: Record<CargoType, [number, number]> = {
    general: [12000, 28000],
    refrigerated: [8000, 22000],
    bulk: [15000, 32000],
    hazardous: [6000, 18000],
    liquid: [14000, 30000],
    'ro-ro': [10000, 24000],
  }
  const [lo, hi] = bases[cargoType]
  return lo + (h(lo + hi) % (hi - lo))
}

function containerNumber(prefix: string, seed: number): string {
  const n = 1000000 + (h(seed) % 9000000)
  return `${prefix}${n}`
}

function padBlock(prefix: string, n: number): string {
  return `${prefix}-${String(n).padStart(2, '0')}`
}

function originDestination(
  status: ContainerStatus,
  seed: number,
): { origin: string; destination: string } {
  const isImportSide = status === 'import' || status === 'gate-in' || status === 'customs-hold' || status === 'inspection'
  const isExportSide = status === 'export' || status === 'gate-out'

  if (isImportSide) {
    return {
      origin: pickUniform(INTERNATIONAL_LOCATIONS, seed),
      destination: pickUniform(DOMESTIC_LOCATIONS, seed + 1),
    }
  }
  if (isExportSide) {
    return {
      origin: pickUniform(DOMESTIC_LOCATIONS, seed + 2),
      destination: pickUniform(INTERNATIONAL_LOCATIONS, seed + 3),
    }
  }
  // transshipment, loaded, empty
  return {
    origin: pickUniform(INTERNATIONAL_LOCATIONS, seed + 4),
    destination: pickUniform(INTERNATIONAL_LOCATIONS, seed + 5),
  }
}

// ── Generator ─────────────────────────────────────────────────────────────────
function generateContainers(): Container[] {
  const containers: Container[] = []
  let globalId = 0
  let seed = 100

  const ARRIVAL_DATES = [
    '2024-05-01', '2024-05-05', '2024-05-10', '2024-05-15', '2024-05-20',
    '2024-05-25', '2024-06-01', '2024-06-05', '2024-06-08', '2024-06-10',
    '2024-06-12', '2024-06-14', '2024-06-15', '2024-06-16', '2024-06-17',
    '2024-06-18', '2024-06-19', '2024-06-20', '2024-06-21', '2024-06-22',
    '2024-06-23', '2024-06-24', '2024-06-25', '2024-06-26', '2024-06-27',
    '2024-06-28', '2024-06-29', '2024-06-30', '2024-07-01', '2024-07-02',
  ]

  for (const tc of TERMINAL_CONFIGS) {
    for (let i = 0; i < tc.count; i++) {
      seed++
      globalId++

      const sl = pickUniform(SHIPPING_LINES, seed)
      const status = pick(STATUSES, STATUS_W, seed + 1)
      const type = pick(TYPES, TYPE_W, seed + 2)
      const cargoType = pick(CARGO_TYPES, CARGO_W, seed + 3)
      const weight = weightForStatus(status, cargoType)
      const arrivalDate = pickUniform(ARRIVAL_DATES, seed + 4)
      const { origin, destination } = originDestination(status, seed + 5)

      // Spatial position within terminal
      const blockNum = (i % tc.blockCount) + 1
      const block = padBlock(tc.blockPrefix, blockNum)
      const row = (h(seed + 6) % tc.rows) + 1
      const column = (h(seed + 7) % tc.cols) + 1
      const level = (h(seed + 8) % 4) + 1

      containers.push({
        id: `c${String(globalId).padStart(4, '0')}`,
        containerNumber: containerNumber(sl.prefix, seed + 10),
        status,
        type,
        shippingLine: sl.line,
        weight,
        cargoType,
        origin,
        destination,
        arrivalDate,
        terminal: tc.code,
        yard: tc.yardId,
        block,
        row,
        column,
        level,
      })
    }
  }

  return containers
}

export const SAMPLE_CONTAINERS: Container[] = generateContainers()
