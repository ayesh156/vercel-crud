import { useState } from 'react'
import { UserForm, UserList, Toast } from '../components'
import { useUsers, useToast } from '../hooks'
import type { User, CreateUserDto, UpdateUserDto } from '../types'

export function UsersPage() {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers()
  const { toasts, success, error, dismiss } = useToast()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data: CreateUserDto | UpdateUserDto) => {
    setSubmitting(true)
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data as UpdateUserDto)
        success('User updated successfully!')
        setEditingUser(null)
      } else {
        await createUser(data as CreateUserDto)
        success('User created successfully!')
      }
    } catch (err) {
      error(err instanceof Error ? err.message : 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      success('User deleted successfully!')
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to delete user')
    }
  }

  const handleCancel = () => {
    setEditingUser(null)
  }

  return (
    <div className="space-y-6">
      <Toast toasts={toasts} onDismiss={dismiss} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <UserForm
          editingUser={editingUser}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={submitting}
        />
        <UserList
          users={users}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
