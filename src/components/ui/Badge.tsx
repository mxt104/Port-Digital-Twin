import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
  size?: 'sm' | 'md'
  dot?: boolean
}

const VARIANT_CLASSES: Record<string, string> = {
  default: 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20',
  success: 'bg-status-available/10 text-status-available border border-status-available/20',
  warning: 'bg-status-reserved/10 text-status-reserved border border-status-reserved/20',
  danger: 'bg-status-maintenance/10 text-status-maintenance border border-status-maintenance/20',
  info: 'bg-status-occupied/10 text-status-occupied border border-status-occupied/20',
  muted: 'bg-bg-elevated text-text-muted border border-border-subtle',
}

const DOT_CLASSES: Record<string, string> = {
  default: 'bg-accent-primary',
  success: 'bg-status-available',
  warning: 'bg-status-reserved',
  danger: 'bg-status-maintenance',
  info: 'bg-status-occupied',
  muted: 'bg-text-muted',
}

export default function Badge({ children, variant = 'default', size = 'sm', dot = false }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded font-medium ${sizeClass} ${VARIANT_CLASSES[variant]}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_CLASSES[variant]}`} />
      )}
      {children}
    </span>
  )
}
