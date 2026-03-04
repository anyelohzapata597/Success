import clsx from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  variant?: 'success' | 'primary' | 'warning'
  showLabel?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'success',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const variantStyles = {
    success: 'bg-success',
    primary: 'bg-primary',
    warning: 'bg-yellow-500',
  }

  return (
    <div className={clsx('w-full', className)}>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-300', variantStyles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 mt-1">
          {value} / {max} ({percentage.toFixed(0)}%)
        </p>
      )}
    </div>
  )
}
