import { Card, CardHeader, CardBody } from '@/components/ui'
import { LoginForm } from '@/components/forms'

export default function LoginPage() {
  const handleSubmit = (data: { email: string; password: string }) => {
    // The LoginForm handles the submission now
    console.log('Form submitted with data:', data)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-heading font-bold text-success mb-2">Success</h1>
          <p className="text-gray-600">Continúa tu camino hacia el éxito</p>
        </CardHeader>
        <CardBody>
          <LoginForm onSubmit={handleSubmit} />
        </CardBody>
      </Card>
    </div>
  )
}
