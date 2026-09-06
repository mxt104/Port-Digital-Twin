import type { EnvironmentSnapshot, TrendPoint } from '@/types/environment'

/**
 * Simulated environmental sensor readings for Nhava Sheva Port area,
 * Navi Mumbai, Maharashtra.
 *
 * Values are SIMULATED for development purposes.
 * Not live CPCB / JNPA sensor data.
 *
 * Reference: typical Navi Mumbai coastal-industrial conditions.
 */
export const ENVIRONMENT_SNAPSHOT: EnvironmentSnapshot = {
  timestamp: '2024-06-28T08:30:00+05:30',
  location:  'Nhava Sheva, Navi Mumbai',

  aqi: {
    parameter: 'AQI',
    value:     142,
    unit:      'index',
    condition: 'poor',
    label:     'Air Quality Index',
  },
  pm25: {
    parameter: 'PM2.5',
    value:     58.4,
    unit:      'µg/m³',
    condition: 'poor',
    label:     'Fine Particulate Matter',
  },
  pm10: {
    parameter: 'PM10',
    value:     112.6,
    unit:      'µg/m³',
    condition: 'poor',
    label:     'Coarse Particulate Matter',
  },
  so2: {
    parameter: 'SO₂',
    value:     18.2,
    unit:      'µg/m³',
    condition: 'moderate',
    label:     'Sulphur Dioxide',
  },
  no2: {
    parameter: 'NO₂',
    value:     42.7,
    unit:      'µg/m³',
    condition: 'moderate',
    label:     'Nitrogen Dioxide',
  },
  co: {
    parameter: 'CO',
    value:     1.2,
    unit:      'mg/m³',
    condition: 'good',
    label:     'Carbon Monoxide',
  },
  temperature: {
    parameter: 'Temp',
    value:     31.4,
    unit:      '°C',
    condition: 'moderate',
    label:     'Temperature',
  },
  humidity: {
    parameter: 'RH',
    value:     78,
    unit:      '%',
    condition: 'moderate',
    label:     'Relative Humidity',
  },
  windSpeed: {
    parameter: 'Wind',
    value:     14,
    unit:      'km/h',
    condition: 'good',
    label:     'Wind Speed (WSW)',
  },
  visibility: {
    parameter: 'Vis',
    value:     5.2,
    unit:      'km',
    condition: 'moderate',
    label:     'Visibility',
  },
  noise: {
    parameter: 'Noise',
    value:     68,
    unit:      'dB',
    condition: 'moderate',
    label:     'Noise Level',
  },
}

/** 7-day AQI / PM2.5 / PM10 historical trend (simulated) */
export const ENV_TREND: TrendPoint[] = [
  { date: '2024-06-22', aqi: 118, pm25: 44.2, pm10:  89.4 },
  { date: '2024-06-23', aqi: 127, pm25: 51.1, pm10:  98.7 },
  { date: '2024-06-24', aqi: 135, pm25: 54.8, pm10: 104.2 },
  { date: '2024-06-25', aqi: 144, pm25: 59.3, pm10: 114.8 },
  { date: '2024-06-26', aqi: 138, pm25: 56.0, pm10: 108.5 },
  { date: '2024-06-27', aqi: 151, pm25: 62.4, pm10: 119.3 },
  { date: '2024-06-28', aqi: 142, pm25: 58.4, pm10: 112.6 },
]
