import { Card, CardHeader, Button, Loading } from '../ui'
import type { User } from '../../types'

interface UserListProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
  onDelete: (id: number) => void
}

export function UserList({ users, loading, onEdit, onDelete }: UserListProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader title="Users" />
        <Loading className="py-8" />
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title="Users"
        subtitle={`${users.length} user${users.length !== 1 ? 's' : ''}`}
      />
      {users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No users yet. Create your first user!
        </p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {user.posts?.length || 0} post
                  {(user.posts?.length || 0) !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="secondary" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (confirm('Delete this user? All posts will be deleted too.')) {
                      onDelete(user.id)
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
