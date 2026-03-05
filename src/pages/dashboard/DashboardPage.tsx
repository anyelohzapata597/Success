import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { useHabitStore } from '@/store/habitStore'
import { useGamification } from '@/hooks'
import toast from 'react-hot-toast'
import {
  StatCard,
  HabitCard,
  MotivationalQuote,
  LevelProgress,
  DailyChecklist,
  BadgeShowcase,
} from '@/components/features'
import { Button, Loader } from '@/components/ui'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const { habits: storeHabits } = useHabitStore()
  const { completeHabitWithRewards, getUserBadges } = useGamification()
  const [todayCompleted, setTodayCompleted] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userBadges, setUserBadges] = useState([])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, authLoading, navigate])

  // Initialize loading state
  useEffect(() => {
    if (!authLoading) {
      setLoading(false)
    }
  }, [authLoading])

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="lg" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    )
  }

  // Mock quote (will be replaced with real data from Firebase)
  const mockQuote = {
    text: 'El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje de continuar.',
    author: 'Winston Churchill',
    book: 'Pensamientos Profundos',
  }

  // Use real habits from store, or mock data if empty
  const displayHabits = storeHabits.length > 0 ? storeHabits : [
    {
      id: '1',
      name: 'Meditar 30 minutos',
      description: 'Meditación diaria',
      category: 'concentracion' as const,
      frequency: 'daily' as const,
      createdAt: new Date(),
      active: true,
      streak: 22,
      maxStreak: 30,
      points: 100,
      userId: user.uid,
    },
    {
      id: '2',
      name: 'Ejercicio cardio',
      description: 'Ejercicio cardiovascular',
      category: 'fitness' as const,
      frequency: 'daily' as const,
      createdAt: new Date(),
      active: true,
      streak: 18,
      maxStreak: 22,
      points: 100,
      userId: user.uid,
    },
    {
      id: '3',
      name: 'Leer 30 minutos',
      description: 'Lectura diaria',
      category: 'aprendizaje' as const,
      frequency: 'daily' as const,
      createdAt: new Date(),
      active: true,
      streak: 15,
      maxStreak: 25,
      points: 100,
      userId: user.uid,
    },
    {
      id: '4',
      name: 'Beber 8 vasos de agua',
      description: 'Hidratación',
      category: 'salud' as const,
      frequency: 'daily' as const,
      createdAt: new Date(),
      active: true,
      streak: 8,
      maxStreak: 20,
      points: 50,
      userId: user.uid,
    },
    {
      id: '5',
      name: 'Revisar emails',
      description: 'Productividad',
      category: 'productividad' as const,
      frequency: 'daily' as const,
      createdAt: new Date(),
      active: true,
      streak: 5,
      maxStreak: 12,
      points: 75,
      userId: user.uid,
    },
  ]

  const todayHabits = displayHabits.slice(0, 4)
  const progressPercentage = todayHabits.length > 0 ? Math.round((todayCompleted / todayHabits.length) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          ¡Bienvenido, {user.displayName}!
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
          currentLevel={user.level}
          currentPoints={user.currentPoints}
          pointsForNextLevel={100}
          totalPointsForLevel={100}
        />
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        <StatCard
          label="Nivel Actual"
          value={user.level}
          icon="🎖️"
          variant="success"
          subText={`${user.totalPoints} pts`}
        />
        <StatCard
          label="Racha"
          value={`${displayHabits.reduce((max, h) => Math.max(max, h.streak), 0)} días`}
          icon="🔥"
          variant="primary"
          subText="Máxima"
        />
        <StatCard
          label="Hábitos Hoy"
          value={`${todayCompleted}/${todayHabits.length}`}
          icon="✓"
          variant="primary"
          subText={`${progressPercentage}%`}
        />
        <StatCard
          label="Hábitos Totales"
          value={displayHabits.length}
          icon="📋"
          variant="warning"
          subText="Activos"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <DailyChecklist
            habits={todayHabits.map(h => ({
              id: h.id,
              name: h.name,
              category: h.category,
              isCompleted: false,
            }))}
            onToggle={(_id, completed) => {
              if (completed) {
                const result = completeHabitWithRewards(_id)
                if (result.success) {
                  setTodayCompleted(todayCompleted + 1)
                  toast.success(`¡+${result.pointsEarned + result.streakBonus} puntos! 🎉`)
                }
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
              {displayHabits.slice(0, 3).map((habit) => (
                <HabitCard
                  key={habit.id}
                  id={habit.id}
                  name={habit.name}
                  category={habit.category}
                  streak={habit.streak}
                  maxStreak={habit.maxStreak}
                  points={habit.points}
                  progress={Math.round((habit.streak / habit.maxStreak) * 100)}
                  isCompleted={false}
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
