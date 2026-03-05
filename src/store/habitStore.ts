/**
 * Zustand Store - Habits
 */
import { create } from 'zustand'
import type { Habit, DailyLog } from '@/types'

interface HabitStore {
  habits: Habit[]
  dailyLogs: DailyLog[]
  setHabits: (habits: Habit[]) => void
  addHabit: (habit: Habit) => void
  updateHabit: (habitId: string, habit: Partial<Habit>) => void
  deleteHabit: (habitId: string) => void
  setDailyLogs: (logs: DailyLog[]) => void
  addDailyLog: (log: DailyLog) => void
  completeHabit: (habitId: string, date: Date) => { pointsEarned: number; streakBonus: number }
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  dailyLogs: [],
  setHabits: (habits) => set({ habits }),
  addHabit: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),
  updateHabit: (habitId, updates) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === habitId ? { ...h, ...updates } : h
      ),
    })),
  deleteHabit: (habitId) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== habitId),
    })),
  setDailyLogs: (logs) => set({ dailyLogs: logs }),
  addDailyLog: (log) =>
    set((state) => ({
      dailyLogs: [...state.dailyLogs, log],
    })),

  completeHabit: (habitId: string, date: Date) => {
    const state = get()
    const habit = state.habits.find((h) => h.id === habitId)

    if (!habit) {
      return { pointsEarned: 0, streakBonus: 0 }
    }

    // Check if already completed today
    const today = new Date(date)
    today.setHours(0, 0, 0, 0)

    const alreadyCompleted = state.dailyLogs.some(
      (log) =>
        log.habitId === habitId &&
        log.completed &&
        new Date(log.date).toDateString() === today.toDateString()
    )

    if (alreadyCompleted) {
      return { pointsEarned: 0, streakBonus: 0 }
    }

    // Calculate points
    const basePoints = habit.points || 100
    const streakBonus = Math.min(habit.streak + 1, 50) // Max 50 bonus points

    // Update habit streak
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === habitId
          ? {
              ...h,
              streak: h.streak + 1,
              maxStreak: Math.max(h.maxStreak, h.streak + 1),
            }
          : h
      ),
    }))

    // Add daily log
    const dailyLog: DailyLog = {
      id: `log_${habitId}_${date.getTime()}`,
      habitId,
      userId: '',
      date,
      completed: true,
      completedAt: new Date(),
      pointsEarned: basePoints,
      streakBonus,
    }

    set((state) => ({
      dailyLogs: [...state.dailyLogs, dailyLog],
    }))

    return { pointsEarned: basePoints, streakBonus }
  },
}))
