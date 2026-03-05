/**
 * Custom hook for authentication operations
 */
import { useCallback } from 'react'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'

interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterCredentials {
  email: string
  password: string
  displayName: string
}

export const useAuth = () => {
  const { user, isAuthenticated, loading, setUser, setIsAuthenticated, setLoading, logout: logoutFromStore } = useAuthStore()

  /**
   * Login user with email/password
   * Simulates API call with 500ms delay
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      // Create mock user
      const mockUser: User = {
        uid: `user_${Date.now()}`,
        email: credentials.email,
        displayName: credentials.email.split('@')[0],
        level: 1,
        totalPoints: 0,
        currentPoints: 0,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        preferences: {
          notificationEnabled: true,
          emailNotifications: false,
          theme: 'light',
        },
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      // Store remember-me preference
      if (credentials.rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('userEmail', credentials.email)
      }

      return { success: true, user: mockUser }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setUser(null)
      setIsAuthenticated(false)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [setUser, setIsAuthenticated, setLoading])

  /**
   * Register new user
   */
  const register = useCallback(async (credentials: RegisterCredentials) => {
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock validation
      if (!credentials.email || !credentials.password || !credentials.displayName) {
        throw new Error('All fields are required')
      }

      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // Create mock user
      const mockUser: User = {
        uid: `user_${Date.now()}`,
        email: credentials.email,
        displayName: credentials.displayName,
        level: 1,
        totalPoints: 0,
        currentPoints: 0,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        preferences: {
          notificationEnabled: true,
          emailNotifications: false,
          theme: 'light',
        },
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      return { success: true, user: mockUser }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      setUser(null)
      setIsAuthenticated(false)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [setUser, setIsAuthenticated, setLoading])

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    logoutFromStore()
    localStorage.removeItem('rememberMe')
    localStorage.removeItem('userEmail')
  }, [logoutFromStore])

  /**
   * Check if user was remembered and attempt auto-login
   */
  const checkRememberedUser = useCallback(() => {
    const wasRemembered = localStorage.getItem('rememberMe') === 'true'
    if (wasRemembered) {
      const email = localStorage.getItem('userEmail')
      if (email) {
        // User was remembered, but they'll still need to log in with password
        return email
      }
    }
    return null
  }, [])

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkRememberedUser,
  }
}
