import type { ReactNode, HTMLAttributes } from 'react'

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title?: string
  subtitle?: string
  actions?: ReactNode
  padding?: 'none' | 'sm' | 'md'
}

export default function Panel({
  children,
  title,
  subtitle,
  actions,
  padding = 'md',
  className = '',
  ...props
}: PanelProps) {
  const paddingClass = padding === 'none' ? '' : padding === 'sm' ? 'p-3' : 'p-4'

  return (
    <div
      className={`bg-bg-surface border border-border-subtle rounded-md shadow-panel flex flex-col ${className}`}
      {...props}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between px-4 py-3 border-b border-border-subtle shrink-0">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 ml-4">{actions}</div>}
        </div>
      )}
      <div className={`flex-1 ${paddingClass}`}>{children}</div>
    </div>
  )
}
