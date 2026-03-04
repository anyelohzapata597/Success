/**
 * Type definitions for Success app
 */

export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  level: number
  totalPoints: number
  currentPoints: number
  createdAt: Date
  lastLoginAt: Date
  preferences: {
    notificationEnabled: boolean
    emailNotifications: boolean
    theme: 'light' | 'dark'
  }
}

export interface Habit {
  id: string
  userId: string
  name: string
  description: string
  category: 'salud' | 'productividad' | 'aprendizaje' | 'fitness' | 'finanzas' | 'concentracion' | 'otras'
  frequency: 'daily'
  createdAt: Date
  active: boolean
  streak: number
  maxStreak: number
  points: number
  notificationTime?: string
  notificationMedium?: 'push' | 'email'
}

export interface DailyLog {
  id: string
  userId: string
  habitId: string
  date: Date
  completed: boolean
  completedAt?: Date
  pointsEarned: number
  streakBonus: number
  notes?: string
}

export interface Friend {
  id: string
  userId: string
  friendId: string
  status: 'pending' | 'accepted' | 'blocked'
  createdAt: Date
  respondedAt?: Date
}

export interface Notification {
  id: string
  userId: string
  habitId: string
  time: string
  medium: 'push' | 'email'
  enabled: boolean
  tz: string
  createdAt: Date
  lastSentAt?: Date
}

export interface BookFragment {
  id: string
  text: string
  author: string
  book?: string
  category?: string
  type: 'motivational' | 'inspirational' | 'mindset'
  createdAt: Date
  featured: boolean
  views?: number
}
