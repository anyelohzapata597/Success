/**
 * Utility - Formatters
 */
import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Formatea fecha a formato legible (ej: 3 de marzo de 2026)
 */
export function formatDate(date: Date): string {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
}

/**
 * Formatea fecha a tiempo relativo (ej: hace 2 horas)
 */
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: es })
}

/**
 * Formatea hora (ej: 07:30 AM)
 */
export function formatTime(date: Date): string {
  return format(date, 'HH:mm', { locale: es })
}

/**
 * Formatea números con separador de miles
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-MX').format(num)
}

/**
 * Formatea porcentaje
 */
export function formatPercentage(num: number, decimals = 0): string {
  return `${num.toFixed(decimals)}%`
}
