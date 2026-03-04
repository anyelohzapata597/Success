import { useState } from 'react'
import { useHabitStore } from '@/store/habitStore'
import {
  StatCard,
  HabitCard,
  MotivationalQuote,
  LevelProgress,
  DailyChecklist,
} from '@/components/features'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { habits } = useHabitStore()
  const [todayCompleted, setTodayCompleted] = useState(0)

  // Datos mock (se reemplazarán con Firebase en Fase 3)
  const mockUser = {
    name: 'Juan Pérez',
    level: 12,
    totalPoints: 4250,
    currentPoints: 250,
    streakdays: 22,
    habitsCompletedToday: 2,
    habitsTotal: 5,
    friends: 8,
  }

  const mockQuote = {
    text: 'El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje de continuar.',
    author: 'Winston Churchill',
    book: 'Pensamientos Profundos',
  }

  const mockHabits = [
    {
      id: '1',
      name: 'Meditar 30 minutos',
      category: 'concentracion',
      streak: 22,
      maxStreak: 30,
      points: 100,
      isToday: true,
      isCompleted: true,
    },
    {
      id: '2',
      name: 'Ejercicio cardio',
      category: 'fitness',
      streak: 18,
      maxStreak: 22,
      points: 100,
      isToday: true,
      isCompleted: true,
    },
    {
      id: '3',
      name: 'Leer 30 minutos',
      category: 'aprendizaje',
      streak: 15,
      maxStreak: 25,
      points: 100,
      isToday: true,
      isCompleted: false,
    },
    {
      id: '4',
      name: 'Beber 8 vasos de agua',
      category: 'salud',
      streak: 8,
      maxStreak: 20,
      points: 50,
      isToday: true,
      isCompleted: false,
    },
    {
      id: '5',
      name: 'Revisar emails',
      category: 'productividad',
      streak: 5,
      maxStreak: 12,
      points: 75,
      isToday: false,
      isCompleted: false,
    },
  ]

  const progressPercentage = Math.round((todayCompleted / mockHabits.filter(h => h.isToday).length) * 100)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          ¡Bienvenido, {mockUser.name}!
        </h1>
        <p className="text-gray-600">Aquí va tu resumen del día</p>
      </div>

      {/* Motivational Quote */}
      <div className="mb-8">
        <MotivationalQuote
          text={mockQuote.text}
          author={mockQuote.author}
          book={mockQuote.book}
        />
      </div>

      {/* Level Progress */}
      <div className="mb-8">
        <LevelProgress
          currentLevel={mockUser.level}
          currentPoints={mockUser.currentPoints}
          pointsForNextLevel={750}
          totalPointsForLevel={1000}
        />
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        <StatCard
          label="Nivel Actual"
          value={mockUser.level}
          icon="🎖️"
          variant="success"
          subText={`${mockUser.totalPoints} pts`}
        />
        <StatCard
          label="Racha"
          value={`${mockUser.streakdays} días`}
          icon="🔥"
          variant="primary"
          subText="Máxima"
        />
        <StatCard
          label="Hábitos Hoy"
          value={`${mockUser.habitsCompletedToday}/${mockHabits.filter(h => h.isToday).length}`}
          icon="✓"
          variant="primary"
          subText={`${progressPercentage}%`}
        />
        <StatCard
          label="Amigos"
          value={mockUser.friends}
          icon="👥"
          variant="warning"
          subText="Conectados"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <DailyChecklist
            habits={mockHabits.filter(h => h.isToday).map(h => ({
              id: h.id,
              name: h.name,
              category: h.category,
              isCompleted: h.isCompleted,
            }))}
            onToggle={(id, completed) => {
              if (completed) {
                setTodayCompleted(todayCompleted + 1)
              } else {
                setTodayCompleted(Math.max(0, todayCompleted - 1))
              }
            }}
            progressPercentage={progressPercentage}
          />

          {/* All Habits Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold">Mis Hábitos</h2>
              <Link to="/habits">
                <Button variant="ghost" size="sm">
                  Ver todos →
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {mockHabits.slice(0, 3).map((habit) => (
                <HabitCard
                  key={habit.id}
                  id={habit.id}
                  name={habit.name}
                  category={habit.category}
                  streak={habit.streak}
                  maxStreak={habit.maxStreak}
                  points={habit.points}
                  progress={40}
                  isCompleted={habit.isCompleted}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Friends Ranking Preview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Top Amigos</h3>
            <div className="space-y-3">
              {[
                { name: 'María García', points: 4800, level: 13 },
                { name: 'Carlos López', points: 4600, level: 12 },
                { name: 'Ana Martínez', points: 4200, level: 11 },
              ].map((friend, i) => (
                <Link
                  key={i}
                  to="/friends"
                  className="flex items-center justify-between p-3 rounded hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm text-gray-900">#{i + 1}</p>
                    <p className="text-xs text-gray-600">{friend.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{friend.points}</p>
                    <p className="text-xs text-gray-600">Lvl {friend.level}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/friends">
              <Button variant="outline" isFullWidth className="mt-4">
                Ver Ranking Completo
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-success">
            <h3 className="font-heading font-semibold text-gray-900 mb-3">Esta Semana</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Hábitos completados</span>
                <span className="font-bold text-success">28/35</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Puntos ganados</span>
                <span className="font-bold text-success">850</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Consistencia</span>
                <span className="font-bold text-success">80%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
