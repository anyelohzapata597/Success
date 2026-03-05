/**
 * Authentication Service - Mock API
 */
import type { User } from '@/types'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
  displayName: string
}

interface AuthResponse {
  success: boolean
  user?: User
  error?: string
  token?: string
}

/**
 * Mock API service for authentication
 * Simulates real API with 500ms delay
 */
class AuthService {
  /**
   * Login user with email/password
   * Simulates: POST /api/auth/login
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Simulate network delay
    await this.delay(500)

    // Validate input
    if (!credentials.email || !credentials.password) {
      return {
        success: false,
        error: 'Email and password are required',
      }
    }

    // Simple email validation
    if (!this.isValidEmail(credentials.email)) {
      return {
        success: false,
        error: 'Invalid email format',
      }
    }

    // Mock: Simulate successful login
    const user: User = {
      uid: `user_${Date.now()}`,
      email: credentials.email,
      displayName: credentials.email.split('@')[0],
      photoURL: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}`,
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

    return {
      success: true,
      user,
      token: this.generateMockToken(),
    }
  }

  /**
   * Register new user
   * Simulates: POST /api/auth/register
   */
  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    // Simulate network delay
    await this.delay(500)

    // Validate input
    if (!credentials.email || !credentials.password || !credentials.displayName) {
      return {
        success: false,
        error: 'All fields are required',
      }
    }

    // Email validation
    if (!this.isValidEmail(credentials.email)) {
      return {
        success: false,
        error: 'Invalid email format',
      }
    }

    // Password validation
    if (credentials.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters',
      }
    }

    // Mock: Check if user already exists (simulated)
    if (this.mockUserExists(credentials.email)) {
      return {
        success: false,
        error: 'Email already registered',
      }
    }

    // Create new user
    const user: User = {
      uid: `user_${Date.now()}`,
      email: credentials.email,
      displayName: credentials.displayName,
      photoURL: `https://ui-avatars.com/api/?name=${credentials.displayName}`,
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

    return {
      success: true,
      user,
      token: this.generateMockToken(),
    }
  }

  /**
   * Logout user
   * Simulates: POST /api/auth/logout
   */
  async logout(): Promise<AuthResponse> {
    await this.delay(300)
    return {
      success: true,
    }
  }

  /**
   * Refresh authentication token
   * Simulates: POST /api/auth/refresh
   */
  async refreshToken(token: string): Promise<AuthResponse> {
    await this.delay(300)

    if (!token) {
      return {
        success: false,
        error: 'Token required',
      }
    }

    return {
      success: true,
      token: this.generateMockToken(),
    }
  }

  /**
   * Reset password
   * Simulates: POST /api/auth/reset-password
   */
  async resetPassword(email: string): Promise<AuthResponse> {
    await this.delay(500)

    if (!email || !this.isValidEmail(email)) {
      return {
        success: false,
        error: 'Invalid email',
      }
    }

    // Mock: Email sent for password reset
    return {
      success: true,
    }
  }

  // ============= Helper Methods =============

  /**
   * Simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Mock: Check if user exists in system
   * In real app, this would be a backend check
   */
  private mockUserExists(email: string): boolean {
    // List of mock existing users
    const existingUsers = [
      'admin@example.com',
      'test@example.com',
      'demo@success.com',
    ]
    return existingUsers.includes(email.toLowerCase())
  }

  /**
   * Generate mock JWT token
   */
  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({
        sub: `user_${Date.now()}`,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
      })
    )
    const signature = btoa('mock-signature')
    return `${header}.${payload}.${signature}`
  }
}

// Export singleton instance
export const authService = new AuthService()
