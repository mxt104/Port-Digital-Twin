import { create } from 'zustand'
import type { ContainerStatus, ContainerType } from '@/types/container'

interface AppState {
  // Selection
  selectedContainerId: string | null

  // Search
  searchQuery: string

  // Filters
  activeTerminal: string
  statusFilter: ContainerStatus | 'all'
  typeFilter: ContainerType | 'all'

  // UI
  isSidebarCollapsed: boolean

  // Actions
  setSelectedContainer: (id: string | null) => void
  setSearchQuery: (query: string) => void
  setActiveTerminal: (terminal: string) => void
  setStatusFilter: (status: ContainerStatus | 'all') => void
  setTypeFilter: (type: ContainerType | 'all') => void
  toggleSidebar: () => void
  resetFilters: () => void
}

export const useAppStore = create<AppState>(set => ({
  // Initial state
  selectedContainerId: null,
  searchQuery:         '',
  activeTerminal:      'all',
  statusFilter:        'all',
  typeFilter:          'all',
  isSidebarCollapsed:  false,

  // Actions
  setSelectedContainer: id       => set({ selectedContainerId: id }),
  setSearchQuery:       query    => set({ searchQuery: query }),
  setActiveTerminal:    terminal => set({ activeTerminal: terminal }),
  setStatusFilter:      status   => set({ statusFilter: status }),
  setTypeFilter:        type     => set({ typeFilter: type }),
  toggleSidebar: () => set(state => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  resetFilters: () =>
    set({
      activeTerminal: 'all',
      statusFilter:   'all',
      typeFilter:     'all',
      searchQuery:    '',
    }),
}))
