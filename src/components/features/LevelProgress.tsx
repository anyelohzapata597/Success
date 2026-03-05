import { Card, CardBody, Badge, ProgressBar } from '@/components/ui'


interface LevelProgressProps {
  currentLevel: number
  currentPoints: number
  pointsForNextLevel: number
  totalPointsForLevel: number
}

export function LevelProgress({
  currentLevel,
  currentPoints,
  pointsForNextLevel,
  totalPointsForLevel,
}: LevelProgressProps) {
  const progressPercentage = (
    ((totalPointsForLevel - pointsForNextLevel) / totalPointsForLevel) *
    100
  ).toFixed(0)

  return (
    <Card className="bg-gradient-to-r from-primary to-blue-400">
      <CardBody className="text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-80 mb-1">Nivel Actual</p>
            <h2 className="text-4xl font-heading font-bold">Level {currentLevel}</h2>
          </div>
          <Badge variant="success" size="md" className="bg-white text-success">
            ⭐ {currentPoints} pts
          </Badge>
        </div>

        <div className="bg-white/20 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Progreso al siguiente nivel</span>
            <span className="text-sm">{progressPercentage}%</span>
          </div>
          <ProgressBar
            value={totalPointsForLevel - pointsForNextLevel}
            max={totalPointsForLevel}
            variant="success"
          />
          <p className="text-xs mt-1 opacity-80">
            {pointsForNextLevel} puntos faltantes
          </p>
        </div>
      </CardBody>
    </Card>
  )
}
