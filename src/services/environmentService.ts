import { ENVIRONMENT_SNAPSHOT, ENV_TREND } from '@/data/environment'
import type { EnvironmentSnapshot, TrendPoint } from '@/types/environment'

export async function getEnvironmentSnapshot(): Promise<EnvironmentSnapshot> {
  // TODO: return fetch('/api/v1/environment/current').then(r => r.json())
  return Promise.resolve(ENVIRONMENT_SNAPSHOT)
}

export async function getAqiTrend(): Promise<TrendPoint[]> {
  // TODO: return fetch('/api/v1/environment/trend?days=7').then(r => r.json())
  return Promise.resolve(ENV_TREND)
}
