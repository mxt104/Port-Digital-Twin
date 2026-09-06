// ── Container operational status ────────────────────────────────────────────
export type ContainerStatus =
  | 'import'
  | 'export'
  | 'transshipment'
  | 'gate-in'
  | 'gate-out'
  | 'customs-hold'
  | 'inspection'
  | 'empty'
  | 'loaded'

// ── Container physical type ──────────────────────────────────────────────────
export type ContainerType = '20ft' | '40ft' | '40ft-HC' | '45ft-HC'

// ── Cargo category ───────────────────────────────────────────────────────────
export type CargoType = 'general' | 'refrigerated' | 'hazardous' | 'bulk' | 'liquid' | 'ro-ro'

// ── Full container record ────────────────────────────────────────────────────
export interface Container {
  id: string
  containerNumber: string
  status: ContainerStatus
  type: ContainerType
  /** Shipping line / carrier */
  shippingLine: string
  /** Weight in kilograms (0 if empty) */
  weight: number
  cargoType: CargoType
  /** Origin port or city */
  origin: string
  /** Destination port or city */
  destination: string
  /** ISO 8601 arrival date */
  arrivalDate: string
  /** JNPA terminal code e.g. "NSICT" */
  terminal: string
  yard: string
  block: string
  row: number
  column: number
  level: number
}

// ── Yard / port statistics ───────────────────────────────────────────────────
export interface YardStats {
  totalContainers: number
  /** Total physical slot capacity across tracked terminals */
  totalCapacity: number
  utilizationPercent: number
  byStatus: Record<ContainerStatus, number>
}

// ── Container filter for search / yard page ──────────────────────────────────
export interface ContainerFilter {
  status: ContainerStatus | 'all'
  type: ContainerType | 'all'
  terminal: string
  searchQuery: string
}
