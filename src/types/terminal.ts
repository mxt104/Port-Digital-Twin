// ── JNPA Terminal definition ─────────────────────────────────────────────────
export interface Terminal {
  /** Short code: NSFT, NSICT, NSIGT, APMT, BMCT, NSDT */
  code: string
  /** Full name */
  name: string
  /** Operating company */
  operator: string
  /** Total slot capacity (simulated) */
  yardCapacity: number
  /** Berths available */
  berths: number
  /** Quay length in metres */
  quayLength: number
}

// ── Terminal-level statistics derived from container data ─────────────────────
export interface TerminalStats {
  code: string
  containerCount: number
  utilizationPercent: number
  importCount: number
  exportCount: number
  transshipmentCount: number
}
