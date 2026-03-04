/**
 * Utility - Constants
 */

export const HABIT_CATEGORIES = [
  'salud',
  'productividad',
  'aprendizaje',
  'fitness',
  'finanzas',
  'concentracion',
  'otras',
] as const

export const CATEGORY_LABELS: Record<string, string> = {
  salud: '🏥 Salud',
  productividad: '📊 Productividad',
  aprendizaje: '📚 Aprendizaje',
  fitness: '🏃 Fitness',
  finanzas: '💰 Finanzas',
  concentracion: '🧠 Concentración',
  otras: '🎯 Otras',
}

export const POINTS_PER_COMPLETION = {
  base: 100,
  streakBonus: (streak: number) => streak * 10,
}

export const LEVELS = {
  basePtsPerLevel: 1000,
  multiplier: 200,
}

export const STREAK_RESET_DAYS = 7
