import type { Container } from '@/types/container'
import { STATUS_CONFIG, TYPE_LABELS } from '@/constants'
import { formatDate, formatWeight, formatPosition } from '@/utils/formatters'
import Badge from '@/components/ui/Badge'

interface ContainerInfoPanelProps {
  container: Container | null
  onClose?: () => void
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-border-subtle last:border-0">
      <span className="text-xs text-text-muted w-28 shrink-0">{label}</span>
      <span className="text-xs text-text-secondary text-right font-mono">{value}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
      <div className="w-10 h-10 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center">
        <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </div>
      <p className="text-xs text-text-muted text-center">
        Select a container in the<br />3D view to inspect it
      </p>
    </div>
  )
}

const STATUS_TO_BADGE_VARIANT: Record<string, 'info' | 'success' | 'warning' | 'danger' | 'muted'> = {
  import:         'info',
  export:         'success',
  transshipment:  'info',
  'gate-in':      'info',
  'gate-out':     'success',
  'customs-hold': 'danger',
  inspection:     'warning',
  empty:          'muted',
  loaded:         'info',
}

const CARGO_LABELS: Record<string, string> = {
  general:      'General Cargo',
  refrigerated: 'Refrigerated',
  hazardous:    'Hazardous (IMO)',
  bulk:         'Dry Bulk',
  liquid:       'Liquid Bulk',
  'ro-ro':      'Roll-on / Roll-off',
}

export default function ContainerInfoPanel({ container, onClose }: ContainerInfoPanelProps) {
  if (!container) return <EmptyState />

  const statusConf = STATUS_CONFIG[container.status]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-2xs text-text-muted uppercase tracking-widest mb-1">Container No.</p>
          <h4 className="text-base font-mono font-semibold text-text-primary tracking-wide">
            {container.containerNumber}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={STATUS_TO_BADGE_VARIANT[container.status] ?? 'info'} dot>
            {statusConf.label}
          </Badge>
          {onClose && (
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Container info */}
        <div>
          <p className="text-2xs text-text-muted uppercase tracking-widest mb-2">Container Info</p>
          <InfoRow label="Type"          value={TYPE_LABELS[container.type]} />
          <InfoRow label="Shipping Line" value={container.shippingLine} />
          <InfoRow label="Cargo"         value={CARGO_LABELS[container.cargoType] ?? container.cargoType} />
          <InfoRow label="Weight"        value={container.weight > 0 ? formatWeight(container.weight) : '— (empty)'} />
          <InfoRow label="Arrival"       value={formatDate(container.arrivalDate)} />
        </div>

        {/* Movement */}
        <div>
          <p className="text-2xs text-text-muted uppercase tracking-widest mb-2">Movement</p>
          <InfoRow label="Origin"      value={container.origin} />
          <InfoRow label="Destination" value={container.destination} />
        </div>

        {/* Spatial location — critical for Digital Twin */}
        <div>
          <p className="text-2xs text-text-muted uppercase tracking-widest mb-2">Yard Location</p>
          <InfoRow label="Terminal" value={container.terminal} />
          <InfoRow label="Yard"     value={container.yard} />
          <InfoRow label="Block"    value={container.block} />
          <InfoRow label="Row"      value={String(container.row)} />
          <InfoRow label="Column"   value={String(container.column)} />
          <InfoRow label="Level"    value={String(container.level)} />

          <div className="mt-2 px-3 py-2 bg-bg-elevated rounded border border-border-subtle">
            <p className="text-2xs text-text-muted mb-0.5">Full Position Reference</p>
            <p className="text-xs font-mono text-text-secondary">
              {container.terminal} · {formatPosition(container.block, container.row, container.column, container.level)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
