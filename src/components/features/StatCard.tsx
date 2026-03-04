import { ProgressBar, Badge } from '@/components/ui'
import { formatNumber } from '@/utils/formatters'
import clsx from 'clsx'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  variant?: 'success' | 'primary' | 'warning' | 'gray'
  subText?: string
  className?: string
}

export function StatCard({
  label,
  value,
  icon,
  variant = 'success',
  subText,
  className,
}: StatCardProps) {
  const variantColors = {
    success: 'text-success',
    primary: 'text-primary',
    warning: 'text-yellow-500',
    gray: 'text-gray-500',
  }

  const variantBgColors = {
    success: 'bg-green-50',
    primary: 'bg-blue-50',
    warning: 'bg-yellow-50',
    gray: 'bg-gray-50',
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md p-6 text-center',
        variantBgColors[variant],
        className
      )}
    >
      {icon && (
        <div className={clsx('text-3xl mb-2 flex justify-center', variantColors[variant])}>
          {icon}
        </div>
      )}
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p className={clsx('text-3xl font-heading font-bold', variantColors[variant])}>
        {typeof value === 'number' ? formatNumber(value) : value}
      </p>
      {subText && <p className="text-xs text-gray-500 mt-2">{subText}</p>}
    </div>
  )
}
