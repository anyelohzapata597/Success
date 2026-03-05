/**
 * Custom hook for habit operations
 */
import { useCallback } from 'react'
import { useHabitStore } from '@/store/habitStore'
import type { Habit } from '@/types'

export const useHabits = () => {
  const {
    habits,
    dailyLogs,
    setHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    setDailyLogs,
    addDailyLog,
  } = useHabitStore()

  /**
   * Create a new habit
   */
  const createHabit = useCallback(
    async (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt'>) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        const newHabit: Habit = {
          ...habitData,
          id: `habit_${Date.now()}`,
          userId: 'current_user', // Will be replaced with real user ID
          createdAt: new Date(),
        }

        addHabit(newHabit)
        return { success: true, habit: newHabit }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create habit'
        return { success: false, error: errorMessage }
      }
    },
    [addHabit]
  )

  /**
   * Update existing habit
   */
  const updateHabitData = useCallback(
    async (habitId: string, updates: Partial<Habit>) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        updateHabit(habitId, updates)
        return { success: true }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update habit'
        return { success: false, error: errorMessage }
      }
    },
    [updateHabit]
  )

  /**
   * Delete a habit
   */
  const deleteHabitData = useCallback(
    async (habitId: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        deleteHabit(habitId)
        return { success: true }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete habit'
        return { success: false, error: errorMessage }
      }
    },
    [deleteHabit]
  )

  /**
   * Mark habit as completed for the day
   */
  const markHabitCompleted = useCallback(
    async (habitId: string, date: Date) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Create daily log entry
        const log = {
          id: `log_${Date.now()}`,
          userId: 'current_user',
          habitId,
          date,
          completed: true,
          completedAt: new Date(),
          pointsEarned: 10,
          streakBonus: 0,
        }

        addDailyLog(log)

        // Update habit streak
        const habit = habits.find((h) => h.id === habitId)
        if (habit) {
          const newStreak = habit.streak + 1
          const newMaxStreak = Math.max(habit.maxStreak, newStreak)
          updateHabit(habitId, {
            streak: newStreak,
            maxStreak: newMaxStreak,
            points: habit.points + 10,
          })
        }

        return { success: true, log }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to mark habit as completed'
        return { success: false, error: errorMessage }
      }
    },
    [habits, addDailyLog, updateHabit]
  )

  /**
   * Get habits by category
   */
  const getHabitsByCategory = useCallback(
    (category: string) => {
      return habits.filter((h) => h.category === category)
    },
    [habits]
  )

  /**
   * Get active habits
   */
  const getActiveHabits = useCallback(() => {
    return habits.filter((h) => h.active)
  }, [habits])

  /**
   * Search habits by name
   */
  const searchHabits = useCallback(
    (query: string) => {
      const lowercaseQuery = query.toLowerCase()
      return habits.filter((h) => h.name.toLowerCase().includes(lowercaseQuery))
    },
    [habits]
  )

  return {
    habits,
    dailyLogs,
    createHabit,
    updateHabitData,
    deleteHabitData,
    markHabitCompleted,
    getHabitsByCategory,
    getActiveHabits,
    searchHabits,
    setHabits,
    setDailyLogs,
  }
}
