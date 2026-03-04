import { useState } from 'react'
import { Button } from '@/components/ui'
import { FormInput, FormCheckbox } from '@/components/ui'
import { Link } from 'react-router-dom'

interface RegisterFormProps {
  onSubmit?: (data: {
    name: string
    email: string
    password: string
    confirmPassword: string
    agreedToTerms: boolean
  }) => void
  isLoading?: boolean
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setFormData((prev) => ({ ...prev, [name]: fieldValue }))

    if (name === 'password') {
      calculatePasswordStrength(value)
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.email) newErrors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido'
    if (!formData.password) newErrors.password = 'La contraseña es requerida'
    else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'Debes aceptar los términos'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData)
    } else {
      setErrors(newErrors)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500'
    if (passwordStrength <= 2) return 'bg-yellow-500'
    if (passwordStrength <= 3) return 'bg-blue-500'
    return 'bg-success'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Nombre Completo"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Tu nombre"
        required
      />

      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="usuario@ejemplo.com"
        required
      />

      <div>
        <FormInput
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Mínimo 8 caracteres"
          required
        />
        {formData.password && (
          <div className="mt-2">
            <div className="flex gap-1 h-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded ${i <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'}`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {passwordStrength <= 1 && 'Contraseña muy débil'}
              {passwordStrength === 2 && 'Contraseña débil'}
              {passwordStrength === 3 && 'Contraseña media'}
              {passwordStrength === 4 && 'Contraseña fuerte'}
              {passwordStrength >= 5 && 'Contraseña muy fuerte'}
            </p>
          </div>
        )}
      </div>

      <FormInput
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Repite tu contraseña"
        required
      />

      <FormCheckbox
        id="agreedToTerms"
        name="agreedToTerms"
        label="Acepto los términos y condiciones"
        checked={formData.agreedToTerms}
        onChange={handleChange}
        error={errors.agreedToTerms}
        required
      />

      <Button type="submit" isFullWidth isLoading={isLoading}>
        Crear Cuenta
      </Button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-success font-semibold hover:text-green-600">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
