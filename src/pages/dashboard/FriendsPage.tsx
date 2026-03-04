/**
 * Friends Page Component
 */
import { FriendCard } from '@/components/features'
import { Table, TableHead, TableBody, TableRow, TableCell, Badge } from '@/components/ui'
import { formatNumber } from '@/utils/formatters'

export default function FriendsPage() {
  // Mock data (se reemplazará con Firebase en Fase 3)
  const friends = [
    {
      id: '1',
      name: 'Juan Pérez',
      initials: 'JP',
      level: 12,
      points: 4250,
      streak: 22,
      habitsCompletedThisWeek: 28,
      position: 1,
      isCurrentUser: true,
    },
    {
      id: '2',
      name: 'María García',
      initials: 'MG',
      level: 13,
      points: 4800,
      streak: 25,
      habitsCompletedThisWeek: 32,
      position: 2,
    },
    {
      id: '3',
      name: 'Carlos López',
      initials: 'CL',
      level: 12,
      points: 4600,
      streak: 20,
      habitsCompletedThisWeek: 30,
      position: 3,
    },
    {
      id: '4',
      name: 'Ana Martínez',
      initials: 'AM',
      level: 11,
      points: 4200,
      streak: 18,
      habitsCompletedThisWeek: 28,
      position: 4,
    },
    {
      id: '5',
      name: 'Luis Rodríguez',
      initials: 'LR',
      level: 10,
      points: 3800,
      streak: 15,
      habitsCompletedThisWeek: 25,
      position: 5,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Amigos y Competencia
        </h1>
        <p className="text-gray-600">
          Mira cómo van tus amigos y compite amistosamente por mantener las mejores rachas
        </p>
      </div>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {friends.map((friend) => (
          <FriendCard
            key={friend.id}
            id={friend.id}
            name={friend.name}
            initials={friend.initials}
            level={friend.level}
            points={friend.points}
            streak={friend.streak}
            habitsCompletedThisWeek={friend.habitsCompletedThisWeek}
            position={friend.position}
            isCurrentUser={friend.isCurrentUser}
            onViewProfile={(id) => console.log('View profile:', id)}
            onAddFriend={(id) => console.log('Add friend:', id)}
          />
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-heading font-bold mb-4">Ranking Global</h2>
        <Table>
          <TableHead>
            <TableRow variant="default">
              <TableCell isHeader align="center">
                Pos
              </TableCell>
              <TableCell isHeader>Usuario</TableCell>
              <TableCell isHeader align="center">Nivel</TableCell>
              <TableCell isHeader align="center">Puntos</TableCell>
              <TableCell isHeader align="center">Racha</TableCell>
              <TableCell isHeader align="center">Esta Semana</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {friends.map((friend) => (
              <TableRow
                key={friend.id}
                variant={friend.isCurrentUser ? 'highlight' : 'hover'}
              >
                <TableCell align="center">
                  <span className="font-bold text-lg">
                    {friend.position === 1 && '🥇'}
                    {friend.position === 2 && '🥈'}
                    {friend.position === 3 && '🥉'}
                    {friend.position > 3 && `#${friend.position}`}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-gray-900">
                    {friend.name}
                    {friend.isCurrentUser && (
                      <Badge variant="success" size="sm" className="ml-2">
                        Tú
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Badge variant="primary">{friend.level}</Badge>
                </TableCell>
                <TableCell align="center" className="font-bold text-success">
                  {formatNumber(friend.points)}
                </TableCell>
                <TableCell align="center" className="font-bold text-success">
                  🔥 {friend.streak}
                </TableCell>
                <TableCell align="center">
                  <Badge variant="success">{friend.habitsCompletedThisWeek}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-blue-50 border border-primary rounded-lg p-6">
        <h3 className="font-heading font-bold text-gray-900 mb-2">💡 Consejos</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Completa hábitos diariamente para mantener tu racha al máximo</li>
          <li>• El ranking se actualiza en tiempo real según los puntos ganados</li>
          <li>• Los mejores jugadores reciben insignias especiales</li>
          <li>• Invite a tus amigos para competir juntos</li>
        </ul>
      </div>
    </div>
  )
}
