import { useState } from 'react'
import { HabitCard } from '@/components/features'
import { Button, EmptyState } from '@/components/ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from '@/components/ui'
import { HabitForm } from '@/components/forms'
import { CATEGORY_LABELS } from '@/utils/constants'

export default function HabitsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data (se reemplazará con Firebase en Fase 3)
  const mockHabits = [
    {
      id: '1',
      name: 'Meditar 30 minutos',
      category: 'concentracion',
      streak: 22,
      maxStreak: 30,
      points: 125,
      progress: 85,
      isCompleted: true,
    },
    {
      id: '2',
      name: 'Ejercicio cardio',
      category: 'fitness',
      streak: 18,
      maxStreak: 22,
      points: 150,
      progress: 60,
      isCompleted: true,
    },
    {
      id: '3',
      name: 'Leer 30 minutos',
      category: 'aprendizaje',
      streak: 15,
      maxStreak: 25,
      points: 100,
      progress: 40,
      isCompleted: false,
    },
    {
      id: '4',
      name: 'Beber 8 vasos de agua',
      category: 'salud',
      streak: 8,
      maxStreak: 20,
      points: 75,
      progress: 50,
      isCompleted: false,
    },
    {
      id: '5',
      name: 'Revisar emails',
      category: 'productividad',
      streak: 5,
      maxStreak: 12,
      points: 100,
      progress: 30,
      isCompleted: false,
    },
    {
      id: '6',
      name: 'Sacar presupuesto',
      category: 'finanzas',
      streak: 3,
      maxStreak: 8,
      points: 120,
      progress: 20,
      isCompleted: false,
    },
  ]

  const filteredHabits = mockHabits.filter((habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || habit.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateHabit = (data: any) => {
    console.log('Nuevo hábito:', data)
    setIsCreateModalOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Mis Hábitos</h1>
          <p className="text-gray-600 mt-1">Total: {filteredHabits.length} hábitos</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          + Nuevo Hábito
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Buscar hábitos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success"
          >
            <option value="all">Todas las categorías</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Habits Grid */}
      {filteredHabits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              name={habit.name}
              category={habit.category}
              streak={habit.streak}
              maxStreak={habit.maxStreak}
              points={habit.points}
              progress={habit.progress}
              isCompleted={habit.isCompleted}
              onComplete={(id) => console.log('Completar:', id)}
              onEdit={(id) => console.log('Editar:', id)}
              onDelete={(id) => console.log('Eliminar:', id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📝"
          title="No hay hábitos"
          description={
            searchTerm || selectedCategory !== 'all'
              ? 'Intenta con otros filtros'
              : 'Crea tu primer hábito para comenzar'
          }
          action={
            <Button onClick={() => setIsCreateModalOpen(true)}>
              Crear Primer Hábito
            </Button>
          }
        />
      )}

      {/* Create Habit Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Crear Nuevo Hábito</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <HabitForm onSubmit={handleCreateHabit} isLoading={false} />
        </ModalBody>
      </Modal>
    </div>
  )
}
