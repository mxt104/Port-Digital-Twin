import { useState, useEffect, useCallback } from 'react'
import { getFilteredContainers, getYardStats } from '@/services/containerService'
import type { Container, ContainerFilter, YardStats } from '@/types/container'
import { useAppStore } from '@/store/appStore'

export function useContainers() {
  const [containers, setContainers] = useState<Container[]>([])
  const [stats, setStats] = useState<YardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchQuery    = useAppStore(s => s.searchQuery)
  const activeTerminal = useAppStore(s => s.activeTerminal)
  const statusFilter   = useAppStore(s => s.statusFilter)
  const typeFilter     = useAppStore(s => s.typeFilter)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filter: ContainerFilter = {
        searchQuery,
        terminal: activeTerminal,
        status:   statusFilter,
        type:     typeFilter,
      }
      const [data, yardStats] = await Promise.all([
        getFilteredContainers(filter),
        getYardStats(),
      ])
      setContainers(data)
      setStats(yardStats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [searchQuery, activeTerminal, statusFilter, typeFilter])

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  return { containers, stats, loading, error, refetch: fetchData }
}

export function useSelectedContainer() {
  const selectedId          = useAppStore(s => s.selectedContainerId)
  const setSelectedContainer = useAppStore(s => s.setSelectedContainer)
  const [container, setContainer] = useState<Container | null>(null)

  useEffect(() => {
    if (!selectedId) {
      setContainer(null)
      return
    }
    import('@/services/containerService').then(({ getContainerById }) => {
      getContainerById(selectedId).then(c => setContainer(c ?? null))
    })
  }, [selectedId])

  return { container, selectedId, setSelectedContainer }
}
