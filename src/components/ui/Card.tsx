import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  header?: ReactNode
  footer?: ReactNode
}

const PADDING_CLASSES: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
}

export default function Card({ children, padding = 'md', header, footer, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-bg-card border border-border-subtle rounded-md shadow-card flex flex-col ${className}`}
      {...props}
    >
      {header && (
        <div className="px-4 py-3 border-b border-border-subtle shrink-0">
          {header}
        </div>
      )}
      <div className={`flex-1 ${PADDING_CLASSES[padding]}`}>
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 border-t border-border-subtle shrink-0">
          {footer}
        </div>
      )}
    </div>
  )
}
