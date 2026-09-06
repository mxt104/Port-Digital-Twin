// ── Air quality condition ───────────────────────────────────────────────────
export type AqiCondition = 'good' | 'moderate' | 'poor' | 'critical'

// ── Individual sensor reading ────────────────────────────────────────────────
export interface SensorReading {
  parameter: string
  value: number
  unit: string
  condition: AqiCondition
  label: string   // display name
}

// ── Full environment snapshot ─────────────────────────────────────────────────
export interface EnvironmentSnapshot {
  timestamp: string     // ISO 8601
  location: string      // "Nhava Sheva, Navi Mumbai"
  aqi: SensorReading
  pm25: SensorReading
  pm10: SensorReading
  so2: SensorReading
  no2: SensorReading
  co: SensorReading
  temperature: SensorReading
  humidity: SensorReading
  windSpeed: SensorReading
  visibility: SensorReading
  noise: SensorReading
}

// ── Historical trend point ────────────────────────────────────────────────────
export interface TrendPoint {
  date: string    // 'YYYY-MM-DD'
  aqi: number
  pm25: number
  pm10: number
}
