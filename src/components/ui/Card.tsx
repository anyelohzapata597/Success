import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'habit' | 'stat' | 'friend'
  onClick?: () => void
  hoverable?: boolean
}

export function Card({
  children,
  className,
  variant = 'default',
  onClick,
  hoverable = false,
}: CardProps) {
  const baseStyles = 'bg-white rounded-lg shadow-md overflow-hidden'

  const variantStyles = {
    default: '',
    habit: 'border-l-4 border-success',
    stat: 'text-center',
    friend: 'flex items-center gap-4',
  }

  return (
    <div
      className={clsx(
        baseStyles,
        variantStyles[variant],
        hoverable && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={clsx('px-6 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  )
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={clsx('px-6 py-4', className)}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={clsx('px-6 py-4 border-t border-gray-100 bg-gray-50', className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'h4'
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={clsx('text-lg font-heading font-bold text-gray-900', className)}>
      {children}
    </Component>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={clsx('text-sm text-gray-600 mt-1', className)}>
      {children}
    </p>
  )
}
