import { ReactNode } from 'react'
import clsx from 'clsx'

interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={clsx('w-full border-collapse', className)}>
        {children}
      </table>
    </div>
  )
}

interface TableHeadProps {
  children: ReactNode
  className?: string
}

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <thead className={clsx('bg-gray-100 border-b-2 border-gray-300', className)}>
      {children}
    </thead>
  )
}

interface TableBodyProps {
  children: ReactNode
  className?: string
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={clsx('divide-y divide-gray-200', className)}>
      {children}
    </tbody>
  )
}

interface TableRowProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'highlight'
}

export function TableRow({ children, className, variant = 'hover' }: TableRowProps) {
  const variantStyles = {
    default: '',
    hover: 'hover:bg-gray-50 transition-colors',
    highlight: 'bg-green-50',
  }

  return (
    <tr className={clsx('border-b border-gray-100', variantStyles[variant], className)}>
      {children}
    </tr>
  )
}

interface TableCellProps {
  children: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  isHeader?: boolean
}

export function TableCell({
  children,
  className,
  align = 'left',
  isHeader = false,
}: TableCellProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const Component = isHeader ? 'th' : 'td'

  return (
    <Component
      className={clsx(
        'px-4 py-3 text-sm',
        isHeader && 'font-semibold text-gray-700 uppercase tracking-wide',
        alignStyles[align],
        className
      )}
    >
      {children}
    </Component>
  )
}
