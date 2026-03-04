/**
 * Navbar Component
 */
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black bg-opacity-90 text-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-success">Success</h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <Link
                to="/dashboard"
                className="hover:text-success transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/habits"
                className="hover:text-success transition-colors"
              >
                Hábitos
              </Link>
            </li>
            <li>
              <Link
                to="/friends"
                className="hover:text-success transition-colors"
              >
                Amigos
              </Link>
            </li>
            <li>
              <Link
                to="/statistics"
                className="hover:text-success transition-colors"
              >
                Estadísticas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-success transition-colors"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="px-4 py-2 bg-success text-white rounded hover:bg-green-700 transition"
              >
                Salir
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="block hover:text-success">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/habits" className="block hover:text-success">
                  Hábitos
                </Link>
              </li>
              <li>
                <Link to="/friends" className="block hover:text-success">
                  Amigos
                </Link>
              </li>
              <li>
                <Link to="/statistics" className="block hover:text-success">
                  Estadísticas
                </Link>
              </li>
              <li>
                <Link to="/profile" className="block hover:text-success">
                  Perfil
                </Link>
              </li>
              <li>
                <Link to="/login" className="block hover:text-success">
                  Salir
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
