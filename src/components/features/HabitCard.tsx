import { Card, CardBody, Badge, Button } from '@/components/ui'
import { CATEGORY_LABELS } from '@/utils/constants'
import { ProgressBar } from '@/components/ui'
import clsx from 'clsx'

interface HabitCardProps {
  id: string
  name: string
  category: string
  streak: number
  maxStreak: number
  points: number
  progress?: number
  isCompleted?: boolean
  onComplete?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  variant?: 'default' | 'compact'
}

export function HabitCard({
  id,
  name,
  category,
  streak,
  maxStreak,
  points,
  progress = 0,
  isCompleted = false,
  onComplete,
  onEdit,
  onDelete,
  variant = 'default',
}: HabitCardProps) {
  const categoryLabel = CATEGORY_LABELS[category] || category

  if (variant === 'compact') {
    return (
      <Card variant="habit">
        <CardBody className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="primary" size="sm">
                {categoryLabel}
              </Badge>
              <Badge variant="success" size="sm">
                🔥 {streak}
              </Badge>
            </div>
          </div>
          <button
            onClick={() => onComplete?.(id)}
            className={clsx(
              'w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all',
              isCompleted
                ? 'bg-success text-white'
                : 'border-2 border-gray-300 text-gray-300 hover:border-success hover:text-success'
            )}
          >
            ✓
          </button>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card variant="habit" hoverable>
      <CardBody>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-gray-900">{name}</h3>
            <Badge variant="primary" size="sm">
              {categoryLabel}
            </Badge>
          </div>
          <span className="text-2xl font-bold text-success">{points} pts</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50 rounded p-2">
            <p className="text-xs text-gray-600">Racha Actual</p>
            <p className="text-lg font-bold text-success">🔥 {streak}</p>
          </div>
          <div className="bg-blue-50 rounded p-2">
            <p className="text-xs text-gray-600">Mejor Racha</p>
            <p className="text-lg font-bold text-primary">{maxStreak}</p>
          </div>
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Semana</span>
              <span className="text-xs font-semibold text-gray-700">{progress}%</span>
            </div>
            <ProgressBar value={progress} variant="success" />
          </div>
        )}

        {/* Status */}
        <div className="mb-4">
          <button
            onClick={() => onComplete?.(id)}
            className={clsx(
              'w-full py-2 rounded-lg font-semibold transition-colors',
              isCompleted
                ? 'bg-success text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            )}
          >
            {isCompleted ? '✓ Completado hoy' : 'Marcar completado'}
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(id)}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-red-500 hover:text-red-600"
            onClick={() => onDelete?.(id)}
          >
            Eliminar
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
