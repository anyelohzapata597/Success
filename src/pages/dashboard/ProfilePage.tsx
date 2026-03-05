/**
 * Profile Page Component
 */
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Badge, Button } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { FormInput, FormTextarea, FormCheckbox } from '@/components/ui'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui'
import { useAuth } from '@/hooks'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
  })

  // Initialize profile data from authenticated user
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.displayName,
        email: user.email,
        bio: '',
      })
    }
  }, [user])

  // Mock stats based on user level and points
  const userStats = {
    level: user?.level || 1,
    points: user?.totalPoints || 0,
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Hoy',
    habitsCreated: 0,
    habitsCompleted: 0,
  }

  const notifications = [
    {
      id: 1,
      habitName: 'Meditar 30 minutos',
      time: '08:00 AM',
      medium: 'push',
      enabled: true,
    },
    {
      id: 2,
      habitName: 'Ejercicio cardio',
      time: '06:30 AM',
      medium: 'email',
      enabled: true,
    },
    {
      id: 3,
      habitName: 'Leer 30 minutos',
      time: '10:00 PM',
      medium: 'push',
      enabled: false,
    },
  ]

  const preferences = [
    { label: 'Notificaciones push', enabled: true },
    { label: 'Emails semanales', enabled: true },
    { label: 'Tema oscuro', enabled: false },
    { label: 'Perfil público', enabled: true },
  ]

  const handleSaveProfile = () => {
    toast.success('Perfil actualizado correctamente')
    setIsEditing(false)
  }

  if (!user) {
    return <div className="text-center py-8">Cargando perfil...</div>
  }

  // Generate initials from name
  const initials = profileData.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Mi Perfil</h1>

      {/* Profile Card */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-start gap-6">
            <Avatar initials={initials} size="lg" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900">
                    {profileData.name}
                  </h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
                <Button
                  variant={isEditing ? 'secondary' : 'primary'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? '✓ Listo' : 'Editar Perfil'}
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
                <div>
                  <p className="text-xs text-gray-600">Nivel</p>
                  <p className="text-2xl font-bold text-success">{userStats.level}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Puntos</p>
                  <p className="text-2xl font-bold text-primary">{userStats.points}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Hábitos</p>
                  <p className="text-2xl font-bold text-success">{userStats.habitsCreated}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Completados</p>
                  <p className="text-2xl font-bold text-primary">{userStats.habitsCompleted}</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Edit Profile Section */}
      {isEditing && (
        <Card className="mb-8">
          <CardHeader>
            <h3 className="font-heading font-bold">Editar Información</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <FormInput
              label="Nombre"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
            <FormInput
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
            <FormTextarea
              label="Acerca de ti"
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              rows={4}
              placeholder="Cuéntanos sobre ti..."
            />
          </CardBody>
          <CardFooter className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveProfile}>
              Guardar Cambios
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Notifications */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="font-heading font-bold">Notificaciones de Hábitos</h3>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHead>
              <TableRow variant="default">
                <TableCell isHeader>Hábito</TableCell>
                <TableCell isHeader align="center">Hora</TableCell>
                <TableCell isHeader align="center">Tipo</TableCell>
                <TableCell isHeader align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map((notif) => (
                <TableRow key={notif.id}>
                  <TableCell>{notif.habitName}</TableCell>
                  <TableCell align="center">{notif.time}</TableCell>
                  <TableCell align="center">
                    <Badge variant={notif.medium === 'push' ? 'primary' : 'success'} size="sm">
                      {notif.medium === 'push' ? 'Push' : 'Email'}
                    </Badge>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={notif.enabled}
                      readOnly
                      className="w-5 h-5 text-success rounded"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Preferences */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="font-heading font-bold">Preferencias</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          {preferences.map((pref, idx) => (
            <FormCheckbox
              key={idx}
              id={`pref-${idx}`}
              label={pref.label}
              checked={pref.enabled}
              readOnly
            />
          ))}
        </CardBody>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <h3 className="font-heading font-bold">Seguridad</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Cambiar Contraseña</h4>
            <p className="text-sm text-gray-600 mb-4">
              Actualiza tu contraseña para mantener tu cuenta segura
            </p>
            <Button variant="outline">Cambiar Contraseña</Button>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-700 mb-2">Eliminar Cuenta</h4>
            <p className="text-sm text-gray-600 mb-4">
              Esta acción es permanente y no se puede deshacer
            </p>
            <Button variant="danger">Eliminar Mi Cuenta</Button>
          </div>
        </CardBody>
      </Card>

      {/* Info Footer */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
        <p>📅 Se unió: {userStats.joinDate}</p>
        <p>🔐 Última sesión activa hace 2 minutos</p>
      </div>
    </div>
  )
}
