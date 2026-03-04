/**
 * Auth Layout Component
 */
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-success to-primary flex items-center justify-center">
      <Outlet />
    </div>
  )
}
