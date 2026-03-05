import { Card, CardBody, Avatar, Badge } from '@/components/ui'
import { formatNumber } from '@/utils/formatters'

interface FriendCardProps {
  name: string
  initials: string
  level: number
  points: number
  streak: number
  habitsCompletedThisWeek: number
  position?: number
  isCurrentUser?: boolean
}

export function FriendCard({
  name,
  initials,
  level,
  points,
  streak,
  habitsCompletedThisWeek,
  position,
  isCurrentUser = false,
}: FriendCardProps) {
  return (
    <Card
      hoverable
      className={isCurrentUser ? 'border-2 border-success bg-green-50' : ''}
    >
      <CardBody>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar initials={initials} size="lg" />
            {position && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                #{position}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-heading font-bold text-lg text-gray-900">{name}</h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="success" size="sm">
                Lvl {level}
              </Badge>
              {isCurrentUser && (
                <Badge variant="primary" size="sm">
                  Tú
                </Badge>
              )}
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-success">{formatNumber(points)}</p>
            <p className="text-xs text-gray-600">puntos</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-xs text-gray-600">Racha</p>
            <p className="text-lg font-bold text-success">🔥 {streak}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Esta Semana</p>
            <p className="text-lg font-bold text-primary">{habitsCompletedThisWeek}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
