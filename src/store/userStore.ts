/**
 * Zustand Store - User
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferences {
  theme: 'light' | 'dark'
  notificationsEnabled: boolean
  emailNotificationsEnabled: boolean
}

interface UserStore {
  preferences: UserPreferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      preferences: {
        theme: 'light',
        notificationsEnabled: true,
        emailNotificationsEnabled: true,
      },
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
    }),
    {
      name: 'user-preferences',
    }
  )
)
