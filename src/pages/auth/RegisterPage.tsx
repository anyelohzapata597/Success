import { Card, CardHeader, CardBody } from '@/components/ui'
import { RegisterForm } from '@/components/forms'

export default function RegisterPage() {
  const handleSubmit = (data: any) => {
    // The RegisterForm handles the submission now
    console.log('Form submitted with data:', data)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-heading font-bold text-success mb-2">Success</h1>
          <p className="text-gray-600">Comienza tu viaje hacia el éxito</p>
        </CardHeader>
        <CardBody>
          <RegisterForm onSubmit={handleSubmit} />
        </CardBody>
      </Card>
    </div>
  )
}
