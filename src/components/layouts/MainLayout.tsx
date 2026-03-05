/**
 * Main Layout Component
 */
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative z-10">
        <Navbar />
        <main className="pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
