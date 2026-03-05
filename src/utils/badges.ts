/**
 * Badge Definitions
 * Defines all available badges in the system
 */
import type { Badge } from '@/types'

export const BADGES: Badge[] = [
  // Points-based badges
  {
    id: 'first_points',
    name: 'Primeros Pasos',
    description: 'Gana tu primer punto completando un hábito',
    icon: '🌱',
    requirement: 1,
    type: 'points',
    rarity: 'common',
  },
  {
    id: 'hundred_points',
    name: 'Crecimiento',
    description: 'Acumula 100 puntos',
    icon: '📈',
    requirement: 100,
    type: 'points',
    rarity: 'common',
  },
  {
    id: 'five_hundred_points',
    name: 'Impulso',
    description: 'Acumula 500 puntos',
    icon: '⚡',
    requirement: 500,
    type: 'points',
    rarity: 'rare',
  },
  {
    id: 'thousand_points',
    name: 'Maestría',
    description: 'Acumula 1000 puntos',
    icon: '🏆',
    requirement: 1000,
    type: 'points',
    rarity: 'epic',
  },
  {
    id: 'five_thousand_points',
    name: 'Legendario',
    description: 'Acumula 5000 puntos',
    icon: '👑',
    requirement: 5000,
    type: 'points',
    rarity: 'legendary',
  },

  // Streak-based badges
  {
    id: 'streak_3',
    name: 'En Camino',
    description: 'Mantén 3 días de racha en un hábito',
    icon: '🔥',
    requirement: 3,
    type: 'streak',
    rarity: 'common',
  },
  {
    id: 'streak_7',
    name: 'Una Semana',
    description: 'Mantén 7 días de racha en un hábito',
    icon: '📆',
    requirement: 7,
    type: 'streak',
    rarity: 'common',
  },
  {
    id: 'streak_30',
    name: 'Un Mes',
    description: 'Mantén 30 días de racha en un hábito',
    icon: '📅',
    requirement: 30,
    type: 'streak',
    rarity: 'rare',
  },
  {
    id: 'streak_100',
    name: 'Centenario',
    description: 'Mantén 100 días de racha en un hábito',
    icon: '💯',
    requirement: 100,
    type: 'streak',
    rarity: 'epic',
  },

  // Habits created
  {
    id: 'habit_creator',
    name: 'Constructor',
    description: 'Crea 5 hábitos',
    icon: '🛠️',
    requirement: 5,
    type: 'habits_created',
    rarity: 'common',
  },
  {
    id: 'habit_collector',
    name: 'Coleccionista',
    description: 'Crea 10 hábitos',
    icon: '📚',
    requirement: 10,
    type: 'habits_created',
    rarity: 'rare',
  },

  // Habits completed
  {
    id: 'completionist_10',
    name: 'Empezador',
    description: 'Completa 10 hábitos',
    icon: '✅',
    requirement: 10,
    type: 'habits_completed',
    rarity: 'common',
  },
  {
    id: 'completionist_50',
    name: 'Perseverante',
    description: 'Completa 50 hábitos',
    icon: '💪',
    requirement: 50,
    type: 'habits_completed',
    rarity: 'rare',
  },
]
