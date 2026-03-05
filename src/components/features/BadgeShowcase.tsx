/**
 * Badge Showcase Component
 * Displays user's unlocked badges
 */
import { Card, CardBody, CardHeader, Badge } from '@/components/ui'
import type { Badge as BadgeType } from '@/types'

interface BadgeShowcaseProps {
  badges: BadgeType[]
  maxDisplay?: number
}

export function BadgeShowcase({ badges, maxDisplay = 6 }: BadgeShowcaseProps) {
  const displayBadges = badges.slice(0, maxDisplay)

  if (badges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="font-heading font-bold">Mis Logros</h3>
        </CardHeader>
        <CardBody>
          <p className="text-center text-gray-500 py-4">
            Completa hábitos para desbloquear logros
          </p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-heading font-bold">Mis Logros</h3>
          <Badge variant="primary">{badges.length}</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-4">
          {displayBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              title={badge.description}
            >
              <span className="text-4xl">{badge.icon}</span>
              <p className="text-xs font-semibold text-center text-gray-900 line-clamp-2">
                {badge.name}
              </p>
              <Badge
                variant={
                  badge.rarity === 'legendary'
                    ? 'warning'
                    : badge.rarity === 'epic'
                      ? 'primary'
                      : badge.rarity === 'rare'
                        ? 'secondary'
                        : 'gray'
                }
                size="sm"
              >
                {badge.rarity}
              </Badge>
            </div>
          ))}
        </div>

        {badges.length > maxDisplay && (
          <p className="text-xs text-gray-500 text-center mt-4">
            +{badges.length - maxDisplay} más logros desbloqueados
          </p>
        )}
      </CardBody>
    </Card>
  )
}
