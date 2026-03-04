/**
 * Utility - Calculations
 */
import { POINTS_PER_COMPLETION, LEVELS } from './constants'

/**
 * Calcula puntos base + bonus por racha
 * Fórmula: base(100) + (racha * 10)
 */
export function calculatePoints(streak: number): number {
  return POINTS_PER_COMPLETION.base + POINTS_PER_COMPLETION.streakBonus(streak)
}

/**
 * Calcula el nivel basado en puntos totales
 * Fórmula: 1000 + (200 * nivel)
 */
export function calculateLevel(totalPoints: number): number {
  if (totalPoints === 0) return 1

  let level = 1
  let pointsNeeded = LEVELS.basePtsPerLevel

  while (totalPoints >= pointsNeeded) {
    totalPoints -= pointsNeeded
    level += 1
    pointsNeeded = LEVELS.basePtsPerLevel + LEVELS.multiplier * (level - 1)
  }

  return level
}

/**
 * Calcula puntos necesarios para el siguiente nivel
 */
export function calculatePointsForNextLevel(
  totalPoints: number,
  currentLevel: number
): number {
  const pointsNeededForCurrentLevel =
    LEVELS.basePtsPerLevel + LEVELS.multiplier * (currentLevel - 1)
  const pointsFromPrevious = currentLevel > 1
    ? Array.from({ length: currentLevel - 1 })
        .reduce((acc, _, i) => {
          return acc + (LEVELS.basePtsPerLevel + LEVELS.multiplier * i)
        }, 0)
    : 0

  return pointsNeededForCurrentLevel - (totalPoints - pointsFromPrevious)
}

/**
 * Calcula el porcentaje de progreso al siguiente nivel
 */
export function calculateLevelProgress(totalPoints: number): number {
  const currentLevel = calculateLevel(totalPoints)
  const pointsForNextLevel = calculatePointsForNextLevel(totalPoints, currentLevel)
  const totalPointsForLevel =
    LEVELS.basePtsPerLevel + LEVELS.multiplier * (currentLevel - 1)

  const progress = ((totalPointsForLevel - pointsForNextLevel) / totalPointsForLevel) * 100
  return Math.min(progress, 100)
}
