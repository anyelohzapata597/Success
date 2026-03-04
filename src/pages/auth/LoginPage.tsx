import { Card, CardHeader, CardBody } from '@/components/ui'
import { LoginForm } from '@/components/forms'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      // Simular llamada a API (se reemplazará con Firebase en Fase 3)
      console.log('Login intent:', data)
      toast.success('¡Sesión iniciada correctamente!')
      // navigate('/dashboard')
    } catch (error) {
      toast.error('Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-heading font-bold text-success mb-2">Success</h1>
          <p className="text-gray-600">Continúa tu camino hacia el éxito</p>
        </CardHeader>
        <CardBody>
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardBody>
      </Card>
    </div>
  )
}
