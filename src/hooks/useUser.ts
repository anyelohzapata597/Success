/**
 * Custom hook for user profile operations
 */
import { useCallback } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import type { User } from '@/types'

export const useUser = () => {
  const { user: authUser, setUser: setAuthUser } = useAuthStore()
  const { preferences, updatePreferences: updateUserPreferences } = useUserStore()

  /**
   * Update user profile
   */
  const updateProfile = useCallback(
    async (updates: Partial<User>) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        if (!authUser) {
          throw new Error('User not authenticated')
        }

        const updatedUser = { ...authUser, ...updates }
        setAuthUser(updatedUser)

        return { success: true, user: updatedUser }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
        return { success: false, error: errorMessage }
      }
    },
    [authUser, setAuthUser]
  )

  /**
   * Update user preferences
   */
  const updatePreferences = useCallback(
    async (prefs: Partial<User['preferences']>) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        if (!authUser) {
          throw new Error('User not authenticated')
        }

        const updatedUser: User = {
          ...authUser,
          preferences: {
            ...authUser.preferences,
            ...prefs,
          },
        }

        setAuthUser(updatedUser)
        updateUserPreferences(prefs as any)

        return { success: true, user: updatedUser }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update preferences'
        return { success: false, error: errorMessage }
      }
    },
    [authUser, setAuthUser, updateUserPreferences]
  )

  /**
   * Add points to user
   */
  const addPoints = useCallback(
    (points: number) => {
      if (!authUser) return

      const newCurrentPoints = authUser.currentPoints + points
      const newTotalPoints = authUser.totalPoints + points

      // Calculate new level (every 100 points = 1 level)
      const newLevel = Math.floor(newTotalPoints / 100) + 1

      const updatedUser: User = {
        ...authUser,
        currentPoints: newCurrentPoints,
        totalPoints: newTotalPoints,
        level: newLevel,
      }

      setAuthUser(updatedUser)
    },
    [authUser, setAuthUser]
  )

  /**
   * Get user level progress percentage
   */
  const getLevelProgress = useCallback(() => {
    if (!authUser) return 0

    const pointsInCurrentLevel = authUser.currentPoints
    const pointsNeededForNextLevel = 100

    return (pointsInCurrentLevel / pointsNeededForNextLevel) * 100
  }, [authUser])

  return {
    user: authUser,
    preferences,
    updateProfile,
    updatePreferences,
    addPoints,
    getLevelProgress,
  }
}
