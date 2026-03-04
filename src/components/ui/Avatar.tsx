import clsx from 'clsx'

interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ initials, size = 'md', className }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }

  // Generar color consistente basado en las iniciales
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ]
  const colorIndex = initials.charCodeAt(0) % colors.length
  const backgroundColor = colors[colorIndex]

  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full text-white font-heading font-bold',
        sizeStyles[size],
        backgroundColor,
        className
      )}
    >
      {initials.toUpperCase()}
    </div>
  )
}
