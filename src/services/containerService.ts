import { SAMPLE_CONTAINERS } from '@/data/containers'
import { TERMINALS as TERMINAL_DATA } from '@/data/terminals'
import type { Container, ContainerFilter, ContainerStatus, YardStats } from '@/types/container'

/**
 * Container service — async data access layer.
 * Replace Promise.resolve() with fetch() calls when the Spring Boot backend is ready.
 */

export async function getAllContainers(): Promise<Container[]> {
  // TODO: return fetch('/api/v1/containers').then(r => r.json())
  return Promise.resolve([...SAMPLE_CONTAINERS])
}

export async function getContainerById(id: string): Promise<Container | undefined> {
  return Promise.resolve(SAMPLE_CONTAINERS.find(c => c.id === id))
}

export async function getContainerByNumber(query: string): Promise<Container | undefined> {
  const q = query.toLowerCase()
  return Promise.resolve(
    SAMPLE_CONTAINERS.find(c => c.containerNumber.toLowerCase().includes(q))
  )
}

export async function getContainersByStatus(status: ContainerStatus): Promise<Container[]> {
  return Promise.resolve(SAMPLE_CONTAINERS.filter(c => c.status === status))
}

export async function getContainersByTerminal(terminal: string): Promise<Container[]> {
  return Promise.resolve(SAMPLE_CONTAINERS.filter(c => c.terminal === terminal))
}

export async function getFilteredContainers(filter: ContainerFilter): Promise<Container[]> {
  let results = [...SAMPLE_CONTAINERS]

  if (filter.status !== 'all') {
    results = results.filter(c => c.status === filter.status)
  }
  if (filter.type !== 'all') {
    results = results.filter(c => c.type === filter.type)
  }
  if (filter.terminal !== 'all') {
    results = results.filter(c => c.terminal === filter.terminal)
  }
  if (filter.searchQuery.trim()) {
    const q = filter.searchQuery.toLowerCase()
    results = results.filter(
      c =>
        c.containerNumber.toLowerCase().includes(q) ||
        c.shippingLine.toLowerCase().includes(q) ||
        c.destination.toLowerCase().includes(q) ||
        c.origin.toLowerCase().includes(q) ||
        c.terminal.toLowerCase().includes(q)
    )
  }

  return Promise.resolve(results)
}

export async function getYardStats(): Promise<YardStats> {
  const containers = SAMPLE_CONTAINERS
  const total      = containers.length

  // Total capacity across all terminals
  const totalCapacity = TERMINAL_DATA.reduce((s, t) => s + t.yardCapacity, 0)

  // Count by every status
  const allStatuses: ContainerStatus[] = [
    'import', 'export', 'transshipment', 'gate-in', 'gate-out',
    'customs-hold', 'inspection', 'empty', 'loaded',
  ]
  const byStatus = Object.fromEntries(
    allStatuses.map(s => [s, containers.filter(c => c.status === s).length])
  ) as Record<ContainerStatus, number>

  const activeContainers = total - byStatus['gate-out'] - byStatus['empty']

  return Promise.resolve({
    totalContainers:   total,
    totalCapacity,
    utilizationPercent: Math.round((activeContainers / totalCapacity) * 100 * 10) / 10,
    byStatus,
  })
}
