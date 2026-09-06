/**
 * Port-level operational metrics.
 *
 * Gate In / Gate Out counts and throughput figures are SIMULATED.
 * "JNPA Published Traffic" reference figures are from JNPA public reports
 * and are clearly distinguished from simulated inventory data.
 */

export interface PortMetrics {
  /** Vessels currently at berth (simulated) */
  vesselsAtBerth: number
  /** Gate In movements in last 24 hours (simulated) */
  gateIn24h: number
  /** Gate Out movements in last 24 hours (simulated) */
  gateOut24h: number
  /** Simulated throughput this month (TEUs) */
  throughputMtd: number
  /** Import share of current simulated inventory */
  importPercent: number
  /** Export share of current simulated inventory */
  exportPercent: number
  /** Transshipment share of current simulated inventory */
  transshipmentPercent: number
}

export const PORT_METRICS: PortMetrics = {
  vesselsAtBerth:       11,
  gateIn24h:            284,
  gateOut24h:           261,
  throughputMtd:        87_420,
  importPercent:        38,
  exportPercent:        34,
  transshipmentPercent: 18,
}

/**
 * JNPA published terminal-wise traffic (TEUs) — FY 2023-24.
 * Source: JNPA Annual Report / Traffic Statistics.
 * These are THROUGHPUT figures, not current yard inventory.
 */
export interface PublishedTrafficRecord {
  terminal: string
  teusFY2324: number
}

export const JNPA_PUBLISHED_TRAFFIC: PublishedTrafficRecord[] = [
  { terminal: 'NSICT', teusFY2324: 1_840_000 },
  { terminal: 'NSIGT', teusFY2324: 1_520_000 },
  { terminal: 'APMT',  teusFY2324: 1_180_000 },
  { terminal: 'BMCT',  teusFY2324:   980_000 },
  { terminal: 'NSFT',  teusFY2324:   620_000 },
  { terminal: 'NSDT',  teusFY2324:   380_000 },
]

/** Monthly throughput trend — last 12 months (simulated) */
export const THROUGHPUT_TREND: Array<{ month: string; teus: number }> = [
  { month: 'Jul-23', teus: 76_200 },
  { month: 'Aug-23', teus: 78_400 },
  { month: 'Sep-23', teus: 74_800 },
  { month: 'Oct-23', teus: 80_100 },
  { month: 'Nov-23', teus: 82_300 },
  { month: 'Dec-23', teus: 85_600 },
  { month: 'Jan-24', teus: 83_200 },
  { month: 'Feb-24', teus: 79_500 },
  { month: 'Mar-24', teus: 86_700 },
  { month: 'Apr-24', teus: 88_200 },
  { month: 'May-24', teus: 84_900 },
  { month: 'Jun-24', teus: 87_420 },
]
