import clsx from 'clsx'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export function Loader({ size = 'md', fullScreen = false }: LoaderProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  const spinner = (
    <div className={clsx('border-current border-t-transparent rounded-full animate-spin', sizeStyles[size])} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className="text-success">{spinner}</div>
      </div>
    )
  }

  return <div className="text-success inline-block">{spinner}</div>
}
