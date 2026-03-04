/**
 * Statistics Page Component
 */
import { StatCard } from '@/components/features'
import { Card, CardHeader, CardBody, Badge, ProgressBar } from '@/components/ui'
import { formatNumber } from '@/utils/formatters'

export default function StatisticsPage() {
  // Mock data (se reemplazará con Firebase en Fase 3)
  const stats = {
    level: 12,
    totalPoints: 4250,
    streak: 22,
    habitsCompleted: 157,
    weeklyAverage: 5.4,
    bestStreak: 18,
    improvement: 12,
    consistency: 82,
  }

  const weeklyData = [
    { day: 'Lun', completed: 5, percentage: 100 },
    { day: 'Mar', completed: 4, percentage: 80 },
    { day: 'Mié', completed: 5, percentage: 100 },
    { day: 'Jue', completed: 4, percentage: 80 },
    { day: 'Vie', completed: 5, percentage: 100 },
    { day: 'Sab', completed: 3, percentage: 60 },
    { day: 'Dom', completed: 4, percentage: 80 },
  ]

  const categoryStats = [
    { name: 'Salud', percentage: 85, color: 'bg-success' },
    { name: 'Productividad', percentage: 90, color: 'bg-primary' },
    { name: 'Aprendizaje', percentage: 88, color: 'bg-blue-500' },
    { name: 'Fitness', percentage: 92, color: 'bg-green-500' },
    { name: 'Finanzas', percentage: 78, color: 'bg-yellow-500' },
    { name: 'Concentración', percentage: 96, color: 'bg-purple-500' },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Estadísticas y Progreso
        </h1>
        <p className="text-gray-600">Visualiza tu desempeño y mejora continua</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        <StatCard
          label="Nivel Actual"
          value={stats.level}
          icon="🎖️"
          variant="success"
          subText={`${stats.totalPoints} pts`}
        />
        <StatCard
          label="Racha"
          value={`${stats.streak} días`}
          icon="🔥"
          variant="primary"
          subText={`Mejor: ${stats.bestStreak}`}
        />
        <StatCard
          label="Hábitos Completados"
          value={formatNumber(stats.habitsCompleted)}
          icon="✓"
          variant="success"
        />
        <StatCard
          label="Mejora Este Mes"
          value={`+${stats.improvement}%`}
          icon="📈"
          variant="warning"
        />
      </div>

      {/* Weekly Chart */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="font-heading font-bold text-lg">Esta Semana</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-end justify-between h-48 gap-2">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-600 mb-2">{day.percentage}%</div>
                <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden flex-1 mb-2 flex items-end">
                  <div
                    className="w-full bg-success rounded-t-lg transition-all"
                    style={{ height: `${day.percentage}%` }}
                  />
                </div>
                <div className="text-xs font-semibold text-gray-700">{day.day}</div>
                <div className="text-xs text-gray-500">{day.completed}/5</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Category Performance */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="font-heading font-bold text-lg">Desempeño por Categoría</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {categoryStats.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{category.name}</span>
                  <Badge variant={category.name === 'Concentración' ? 'success' : 'primary'}>
                    {category.percentage}%
                  </Badge>
                </div>
                <ProgressBar value={category.percentage} variant="success" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-gray-600 mb-2">Hábitos Completados</p>
            <p className="text-3xl font-bold text-success mb-2">150 / 196</p>
            <ProgressBar value={150} max={196} variant="success" />
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-gray-600 mb-2">Puntos Este Mes</p>
            <p className="text-3xl font-bold text-primary mb-2">3,800</p>
            <p className="text-xs text-gray-600">Promedio: {stats.weeklyAverage}/día</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-gray-600 mb-2">Consistencia</p>
            <p className="text-3xl font-bold text-yellow-500 mb-2">{stats.consistency}%</p>
            <p className="text-xs text-gray-600">Mejor racha: {stats.bestStreak} días</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
