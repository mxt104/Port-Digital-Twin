import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    'bg-accent-primary text-white hover:bg-accent-hover border border-accent-primary/50 shadow-glow/50',
  secondary:
    'bg-bg-elevated text-text-primary hover:bg-border-subtle border border-border-default',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent',
  danger:
    'bg-status-maintenance/10 text-status-maintenance hover:bg-status-maintenance/20 border border-status-maintenance/30',
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'h-7 px-3 text-xs',
  md: 'h-8 px-4 text-sm',
  lg: 'h-10 px-5 text-sm',
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded font-medium
        transition-colors duration-150 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  )
}
