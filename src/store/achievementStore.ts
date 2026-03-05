/**
 * Zustand Store - Achievements & Badges
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Achievement, Badge } from '@/types'

interface AchievementStore {
  achievements: Achievement[]
  unlockedBadges: Badge[]
  addAchievement: (achievement: Achievement) => void
  unlockBadge: (badge: Badge) => void
  getAchievements: (userId: string) => Achievement[]
  getUnlockedBadges: (userId: string) => Badge[]
  clearAchievements: () => void
}

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: [],
      unlockedBadges: [],

      addAchievement: (achievement: Achievement) =>
        set((state) => {
          const exists = state.achievements.some((a) => a.id === achievement.id)
          if (!exists) {
            return { achievements: [...state.achievements, achievement] }
          }
          return state
        }),

      unlockBadge: (badge: Badge) =>
        set((state) => {
          const exists = state.unlockedBadges.some((b) => b.id === badge.id)
          if (!exists) {
            return { unlockedBadges: [...state.unlockedBadges, badge] }
          }
          return state
        }),

      getAchievements: (userId: string) => {
        const state = get()
        return state.achievements.filter((a) => a.userId === userId)
      },

      getUnlockedBadges: (userId: string) => {
        const state = get()
        return state.unlockedBadges
      },

      clearAchievements: () => set({ achievements: [], unlockedBadges: [] }),
    }),
    {
      name: 'achievement-storage',
    }
  )
)
