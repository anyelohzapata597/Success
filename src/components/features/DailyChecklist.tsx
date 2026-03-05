import { Card, CardBody, CardHeader, Badge } from '@/components/ui'

interface DailyChecklistItemProps {
  habit: {
    id: string
    name: string
    category: string
  }
  isCompleted: boolean
  onToggle: (habitId: string, completed: boolean) => void
}

export function DailyChecklistItem({ habit, isCompleted, onToggle }: DailyChecklistItemProps) {
  const handleToggle = () => {
    onToggle(habit.id, !isCompleted)
  }

  return (
    <div
      onClick={handleToggle}
      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
    >
      <button
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold transition-all ${
          isCompleted
            ? 'bg-success text-white border-success'
            : 'border-gray-300 text-gray-300 hover:border-success'
        }`}
        onClick={(e) => {
          e.stopPropagation()
          handleToggle()
        }}
      >
        ✓
      </button>

      <div className="flex-1">
        <h4 className={`font-semibold ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
          {habit.name}
        </h4>
      </div>

      <Badge
        variant={isCompleted ? 'success' : 'gray'}
        size="sm"
      >
        {isCompleted ? 'Hecho' : 'Pendiente'}
      </Badge>
    </div>
  )
}

interface DailyChecklistProps {
  habits: Array<{
    id: string
    name: string
    category: string
    isCompleted?: boolean
  }>
  onToggle: (habitId: string, completed: boolean) => void
  progressPercentage?: number
}

export function DailyChecklist({ habits, onToggle, progressPercentage = 0 }: DailyChecklistProps) {
  const completedCount = habits.filter((h) => h.isCompleted).length

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-heading font-bold text-lg">Tareas de Hoy</h3>
          <Badge variant="primary">
            {completedCount}/{habits.length}
          </Badge>
        </div>
      </CardHeader>

      <CardBody className="space-y-1">
        {habits.map((habit) => (
          <DailyChecklistItem
            key={habit.id}
            habit={habit}
            isCompleted={habit.isCompleted || false}
            onToggle={onToggle}
          />
        ))}

        {progressPercentage !== undefined && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Progreso del día</span>
              <span className="font-bold text-success">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
