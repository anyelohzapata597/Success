import { useState } from 'react'
import { Button } from '@/components/ui'
import { FormInput, FormSelect, FormCheckbox } from '@/components/ui'
import { HABIT_CATEGORIES } from '@/utils/constants'

interface HabitFormProps {
  onSubmit?: (data: HabitFormData) => void
  isLoading?: boolean
  initialData?: HabitFormData
}

export interface HabitFormData {
  name: string
  description: string
  category: string
  frequency: string
  notificationTime?: string
  enableNotification: boolean
}

export function HabitForm({ onSubmit, isLoading = false, initialData }: HabitFormProps) {
  const [formData, setFormData] = useState<HabitFormData>(
    initialData || {
      name: '',
      description: '',
      category: 'salud',
      frequency: 'daily',
      notificationTime: '08:00',
      enableNotification: true,
    }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: fieldValue }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (formData.name.length < 3) newErrors.name = 'Mínimo 3 caracteres'
    if (formData.description.length > 500)
      newErrors.description = 'Máximo 500 caracteres'
    if (!formData.category) newErrors.category = 'Selecciona una categoría'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData)
    } else {
      setErrors(newErrors)
    }
  }

  const categoryOptions = HABIT_CATEGORIES.map((cat) => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
  }))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Nombre del Hábito"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Ej: Meditar 30 minutos"
        required
      />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="¿Por qué es importante este hábito?"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      <FormSelect
        label="Categoría"
        name="category"
        value={formData.category}
        onChange={handleChange}
        error={errors.category}
        options={categoryOptions}
        required
      />

      <FormSelect
        label="Frecuencia"
        name="frequency"
        value={formData.frequency}
        onChange={handleChange}
        options={[{ value: 'daily', label: 'Diariamente' }]}
      />

      <FormCheckbox
        id="enableNotification"
        name="enableNotification"
        label="Recibir notificaciones"
        checked={formData.enableNotification}
        onChange={handleChange}
      />

      {formData.enableNotification && (
        <FormInput
          label="Hora de Notificación"
          type="time"
          name="notificationTime"
          value={formData.notificationTime}
          onChange={handleChange}
        />
      )}

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Actualizar Hábito' : 'Crear Hábito'}
        </Button>
      </div>
    </form>
  )
}
