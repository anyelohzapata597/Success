import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui'
import { FormInput, FormCheckbox } from '@/components/ui'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks'
import toast from 'react-hot-toast'

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const navigate = useNavigate()
  const { login, loading, isAuthenticated, checkRememberedUser } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [rememberMe, setRememberMe] = useState(false)
  const [localLoading, setLocalLoading] = useState(false)

  // Check if user was remembered on component mount
  useEffect(() => {
    const rememberedEmail = checkRememberedUser()
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, loading, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido'
    if (!formData.password) newErrors.password = 'La contraseña es requerida'
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length === 0) {
      setLocalLoading(true)
      try {
        const result = await login({
          email: formData.email,
          password: formData.password,
          rememberMe,
        })

        if (result.success) {
          toast.success('¡Inicio de sesión exitoso!')
          onSubmit?.(formData)
          // Navigation happens via useEffect when isAuthenticated changes
        } else {
          toast.error(result.error || 'Error al iniciar sesión')
          setErrors({ submit: result.error || 'Error al iniciar sesión' })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión'
        toast.error(errorMessage)
        setErrors({ submit: errorMessage })
      } finally {
        setLocalLoading(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  const isLoading = loading || localLoading

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {errors.submit}
        </div>
      )}

      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="usuario@ejemplo.com"
        disabled={isLoading}
        required
      />

      <FormInput
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Tu contraseña"
        disabled={isLoading}
        required
      />

      <div className="flex items-center justify-between">
        <FormCheckbox
          id="rememberMe"
          label="Recuérdame"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading}
        />
        <Link to="/forgot-password" className="text-sm text-primary hover:text-success">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button type="submit" isFullWidth isLoading={isLoading}>
        Iniciar Sesión
      </Button>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-success font-semibold hover:text-green-600">
          Regístrate aquí
        </Link>
      </p>
    </form>
  )
}
