/**
 * Custom hook for gamification operations
 * Handles points, levels, achievements, and badges
 */
import { useCallback } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useHabitStore } from '@/store/habitStore'
import { useAchievementStore } from '@/store/achievementStore'
import { BADGES } from '@/utils/badges'
import { calculateLevel, calculatePointsForNextLevel } from '@/utils/calculations'
import type { User } from '@/types'

export const useGamification = () => {
  const { user, setUser } = useAuthStore()
  const { completeHabit } = useHabitStore()
  const { getUnlockedBadges, unlockBadge, addAchievement } = useAchievementStore()

  /**
   * Complete a habit and award points
   */
  const completeHabitWithRewards = useCallback(
    (habitId: string, date: Date = new Date()) => {
      if (!user) return { success: false, pointsEarned: 0 }

      // Complete the habit in the store
      const { pointsEarned, streakBonus } = completeHabit(habitId, date)

      // Update user points
      const newTotalPoints = user.totalPoints + pointsEarned + streakBonus
      const newLevel = calculateLevel(newTotalPoints)
      const nextLevelPoints = calculatePointsForNextLevel(newTotalPoints, newLevel)
      const newCurrentPoints = Math.max(0, newTotalPoints - (newLevel * 1000))

      const updatedUser: User = {
        ...user,
        totalPoints: newTotalPoints,
        currentPoints: newCurrentPoints,
        level: newLevel,
        lastLoginAt: new Date(),
      }

      setUser(updatedUser)

      // Check for badge unlocks
      checkAndUnlockBadges(updatedUser)

      return {
        success: true,
        pointsEarned,
        streakBonus,
        totalPoints: newTotalPoints,
        level: newLevel,
      }
    },
    [user, setUser, completeHabit]
  )

  /**
   * Check if any badges should be unlocked
   */
  const checkAndUnlockBadges = useCallback(
    (updatedUser: User) => {
      if (!user) return

      const unlockedBadges = getUnlockedBadges(user.uid)
      const unlockedIds = new Set(unlockedBadges.map((b) => b.id))

      BADGES.forEach((badge) => {
        if (!unlockedIds.has(badge.id)) {
          let shouldUnlock = false

          switch (badge.type) {
            case 'points':
              shouldUnlock = updatedUser.totalPoints >= badge.requirement
              break
            case 'streak':
              // This would need actual habit data
              shouldUnlock = false
              break
            case 'habits_created':
              // This would need actual habit data
              shouldUnlock = false
              break
            case 'habits_completed':
              // This would need actual habit data
              shouldUnlock = false
              break
          }

          if (shouldUnlock) {
            unlockBadge(badge)
            addAchievement({
              id: `achievement_${user.uid}_${badge.id}_${Date.now()}`,
              userId: user.uid,
              badgeId: badge.id,
              unlockedAt: new Date(),
              progress: 100,
            })
          }
        }
      })
    },
    [user, getUnlockedBadges, unlockBadge, addAchievement]
  )

  /**
   * Get user's unlocked badges
   */
  const getUserBadges = useCallback(() => {
    if (!user) return []
    return getUnlockedBadges(user.uid)
  }, [user, getUnlockedBadges])

  return {
    completeHabitWithRewards,
    getUserBadges,
    checkAndUnlockBadges,
  }
}
