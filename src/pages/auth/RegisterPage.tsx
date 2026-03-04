import { Card, CardHeader, CardBody } from '@/components/ui'
import { RegisterForm } from '@/components/forms'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // Simular llamada a API (se reemplazará con Firebase en Fase 3)
      console.log('Register intent:', data)
      toast.success('¡Cuenta creada correctamente!')
      // navigate('/login')
    } catch (error) {
      toast.error('Error al crear la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-heading font-bold text-success mb-2">Success</h1>
          <p className="text-gray-600">Comienza tu viaje hacia el éxito</p>
        </CardHeader>
        <CardBody>
          <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardBody>
      </Card>
    </div>
  )
}
