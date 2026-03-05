import { Card, CardBody, ProgressBar, Button } from '@/components/ui'
import clsx from 'clsx'

interface StreakBadgeProps {
  days: number
  maxDays: number
  isMissedToday?: boolean
  onViewHistory?: () => void
}

export function StreakBadge({
  days,
  maxDays,
  isMissedToday = false,
  onViewHistory,
}: StreakBadgeProps) {
  const isOnFire = days > 0

  return (
    <Card
      className={clsx(
        'text-center',
        isMissedToday ? 'bg-red-50 border-red-200' : 'bg-green-50'
      )}
    >
      <CardBody>
        <div className="flex flex-col items-center">
          {isOnFire ? (
            <span className="text-5xl mb-2 animate-bounce">🔥</span>
          ) : (
            <span className="text-5xl mb-2 opacity-30">❄️</span>
          )}

          <h3 className="font-heading font-bold text-2xl text-gray-900 mb-1">
            {days} días
          </h3>

          <p className="text-sm text-gray-600 mb-4">Racha actual</p>

          <ProgressBar
            value={days}
            max={maxDays}
            variant={isMissedToday ? 'warning' : 'success'}
            showLabel={false}
            className="w-full mb-3"
          />

          <div className="flex gap-2 justify-center text-xs text-gray-600">
            <span>Personal best: {maxDays} días</span>
          </div>

          {isMissedToday && (
            <p className="text-sm text-red-600 font-semibold mt-3">
              ⚠️ Completa un hábito para mantener tu racha
            </p>
          )}

          {onViewHistory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewHistory}
              className="mt-3 w-full"
            >
              Ver Historial
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
