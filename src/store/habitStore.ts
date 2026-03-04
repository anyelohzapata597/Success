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
}

export const useHabitStore = create<HabitStore>((set) => ({
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
}))
