import DigitalTwinViewport from './ContainerYard/DigitalTwinViewport'
import ContainerInfoPanel from '@/components/container/ContainerInfoPanel'
import Panel from '@/components/ui/Panel'
import { useSelectedContainer } from '@/hooks/useContainers'
import { useContainers } from '@/hooks/useContainers'
import { useAppStore } from '@/store/appStore'
import { TERMINALS as TERMINAL_CODES } from '@/constants'
import { STATUS_CONFIG } from '@/constants'
import type { ContainerStatus } from '@/types/container'

const STATUS_FILTERS: Array<{ value: ContainerStatus | 'all'; label: string }> = [
  { value: 'all',          label: 'All'          },
  { value: 'import',       label: 'Import'       },
  { value: 'export',       label: 'Export'       },
  { value: 'transshipment',label: 'Transship.'   },
  { value: 'customs-hold', label: 'Hold'         },
  { value: 'inspection',   label: 'Inspection'   },
  { value: 'empty',        label: 'Empty'        },
]

export default function ContainerYardPage() {
  const { container, setSelectedContainer } = useSelectedContainer()
  const { stats }        = useContainers()
  const statusFilter     = useAppStore(s => s.statusFilter)
  const setStatusFilter  = useAppStore(s => s.setStatusFilter)
  const activeTerminal   = useAppStore(s => s.activeTerminal)
  const setActiveTerminal= useAppStore(s => s.setActiveTerminal)

  const topStatuses: ContainerStatus[] = ['import', 'export', 'transshipment', 'customs-hold', 'empty']

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.topbar))] p-4 gap-4">
      {/* Top controls bar */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        {/* Terminal selector */}
        <div className="flex items-center gap-1 bg-bg-surface border border-border-subtle rounded p-1 shadow-sm">
          {['all', ...TERMINAL_CODES].map(t => (
            <button
              key={t}
              onClick={() => setActiveTerminal(t)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors duration-150 ${
                activeTerminal === t
                  ? 'bg-accent-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              }`}
            >
              {t === 'all' ? 'All Terminals' : t}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-border-subtle" />

        {/* Status filter */}
        <div className="flex items-center gap-1 bg-bg-surface border border-border-subtle rounded p-1 shadow-sm">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors duration-150 ${
                statusFilter === f.value
                  ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Stats strip */}
        {stats && (
          <div className="ml-auto flex items-center gap-4">
            {topStatuses.map(status => (
              <div key={status} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: STATUS_CONFIG[status].hex }}
                />
                <span className="text-xs text-text-muted">
                  {STATUS_CONFIG[status].label.slice(0, 5)}.
                </span>
                <span className="text-xs font-mono text-text-secondary font-semibold">
                  {stats.byStatus[status] ?? 0}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main row: 3D viewport + info panel */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* 3D Viewport */}
        <div className="flex-1 min-w-0">
          <DigitalTwinViewport />
        </div>

        {/* Container info panel */}
        <Panel
          title="Container Details"
          subtitle={container ? container.containerNumber : 'Click a container in the 3D view'}
          className="w-72 shrink-0"
          padding="md"
        >
          <ContainerInfoPanel
            container={container}
            onClose={container ? () => setSelectedContainer(null) : undefined}
          />
        </Panel>
      </div>
    </div>
  )
}
